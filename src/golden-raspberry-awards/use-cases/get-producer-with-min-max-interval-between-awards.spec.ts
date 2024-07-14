import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { describe } from 'node:test';
import { Movies } from '../entities/movies.entity';
import { GetProducersWithMinMaxIntervalAwatdsUseCase } from './get-producer-with-min-max-interval-between-awards';
import { CreateMovieUseCase } from './create-movie';
import crypto from 'crypto';
import { FindAllMoviesUseCase } from './find-all-movies';
import {
  MoviesTypeOrmRepository,
  IMoviesRepository,
} from './golden-raspberry-awards.typeorm.repository';

describe('GetProducerLongerIntervalBetweenAwards', () => {
  let useCase: GetProducersWithMinMaxIntervalAwatdsUseCase;
  let repository: IMoviesRepository;
  let createGolden: CreateMovieUseCase;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Movies],
          logging: false,
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Movies]),
      ],
      providers: [
        CreateMovieUseCase,
        GetProducersWithMinMaxIntervalAwatdsUseCase,
        FindAllMoviesUseCase,
        MoviesTypeOrmRepository,
        {
          provide: 'IMoviesRepository',
          useExisting: MoviesTypeOrmRepository,
        },
      ],
    }).compile();

    useCase = module.get<GetProducersWithMinMaxIntervalAwatdsUseCase>(
      GetProducersWithMinMaxIntervalAwatdsUseCase,
    );

    createGolden = module.get<CreateMovieUseCase>(CreateMovieUseCase);

    repository = module.get<IMoviesRepository>('IMoviesRepository');
  });

  afterEach(async () => {
    await repository.query('DELETE FROM movies');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should get max and min interval', async () => {
    const result = {
      min: [
        {
          producer: 'Producer 2',
          interval: 99,
          previousWin: 2000,
          followingWin: 2099,
        },
      ],
      max: [
        {
          producer: 'Producer 1',
          interval: 109,
          previousWin: 1900,
          followingWin: 2009,
        },
      ],
    };

    await createGolden.execute(
      new Movies(
        crypto.randomUUID(),
        2008,
        'Title teste',
        'Studios teste',
        'Producer 1',
        true,
      ),
    );

    await createGolden.execute(
      new Movies(
        crypto.randomUUID(),
        2009,
        'Title teste',
        'Studios teste',
        'Producer 1',
        true,
      ),
    );

    await createGolden.execute(
      new Movies(
        crypto.randomUUID(),
        1900,
        'Title teste',
        'Studios teste',
        'Producer 1',
        true,
      ),
    );

    await createGolden.execute(
      new Movies(
        crypto.randomUUID(),
        1999,
        'Title teste',
        'Studios teste',
        'Producer 1',
        true,
      ),
    );

    await createGolden.execute(
      new Movies(
        crypto.randomUUID(),
        2099,
        'Title teste',
        'Studios teste',
        'Producer 2',
        true,
      ),
    );

    await createGolden.execute(
      new Movies(
        crypto.randomUUID(),
        2018,
        'Title teste',
        'Studios teste',
        'Producer 2',
        true,
      ),
    );

    await createGolden.execute(
      new Movies(
        crypto.randomUUID(),
        2019,
        'Title teste',
        'Studios teste',
        'Producer 2',
        true,
      ),
    );

    await createGolden.execute(
      new Movies(
        crypto.randomUUID(),
        2000,
        'Title teste',
        'Studios teste',
        'Producer 2',
        true,
      ),
    );

    const queryResult = await useCase.execute();

    expect(queryResult).toEqual(result);
  });
});
