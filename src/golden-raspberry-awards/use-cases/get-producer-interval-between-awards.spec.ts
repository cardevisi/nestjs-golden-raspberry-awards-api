import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { describe } from 'node:test';
import { Movies } from '../entities/movies.entity';
import { GetProducerIntervalBetweenAwardsUseCase } from './get-producer-interval-between-awards';
import { CreateMovieUseCase } from './create-movie';
import { FindAllMoviesUseCase } from './find-all-movies';
import {
  MoviesTypeOrmRepository,
  IMoviesRepository,
} from './golden-raspberry-awards.typeorm.repository';

describe('GetProducerLongerIntervalBetweenAwards', () => {
  let getIntervalBetweenAwards: GetProducerIntervalBetweenAwardsUseCase;
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
        GetProducerIntervalBetweenAwardsUseCase,
        FindAllMoviesUseCase,
        MoviesTypeOrmRepository,
        {
          provide: 'IMoviesRepository',
          useExisting: MoviesTypeOrmRepository,
        },
      ],
    }).compile();

    const moduleRef = module.createNestApplication();
    await moduleRef.init();

    getIntervalBetweenAwards =
      module.get<GetProducerIntervalBetweenAwardsUseCase>(
        GetProducerIntervalBetweenAwardsUseCase,
      );
    createGolden = module.get<CreateMovieUseCase>(CreateMovieUseCase);
    repository = module.get<IMoviesRepository>('IMoviesRepository');
  });

  afterEach(async () => {
    await repository.query('DELETE FROM movies');
  });

  it('should be defined', () => {
    expect(getIntervalBetweenAwards).toBeDefined();
  });

  it('should get max and min interval', async () => {
    await createGolden.execute({
      id: '9a5f6d5d-9a9a-11ed-afa1-0242ac120002',
      year: 2001,
      title: 'Title Teste',
      studios: 'Studios Teste',
      producer: 'ProducersTeste',
      winner: true,
    });

    await createGolden.execute({
      id: '9a5f6d5d-9a9a-11ed-afa1-0242ac120003',
      year: 2022,
      title: 'Title Teste',
      studios: 'Studios Teste',
      producer: 'ProducersTeste',
      winner: true,
    });

    await createGolden.execute({
      id: '9a5f6d5d-9a9a-11ed-afa1-0242ac120004',
      year: 2000,
      title: 'Title Teste 1',
      studios: 'Studios Teste 1',
      producer: 'ProducersTeste 1',
      winner: true,
    });

    await createGolden.execute({
      id: '9a5f6d5d-9a9a-11ed-afa1-0242ac120004',
      year: 2010,
      title: 'Title Teste 2',
      studios: 'Studios Teste 2',
      producer: 'ProducersTeste 2',
      winner: true,
    });

    const queryResult = await getIntervalBetweenAwards.execute();

    const awardsResult = {
      max: [
        {
          followingWin: 2022,
          interval: 21,
          previousWin: 2001,
          producer: 'ProducersTeste',
        },
      ],
      min: [
        {
          followingWin: 2022,
          interval: 21,
          previousWin: 2001,
          producer: 'ProducersTeste',
        },
      ],
    };
    expect(queryResult).toEqual(awardsResult);
  });
});
