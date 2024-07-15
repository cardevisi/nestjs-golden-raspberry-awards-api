import { Test, TestingModule } from '@nestjs/testing';
import { CreateMovieUseCase } from './create-movie';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movies } from '../entities/movies.entity';
import {
  MoviesTypeOrmRepository,
  IMoviesRepository,
} from './movies.typeorm.repository';

describe('MoviesuseCase', () => {
  let useCase: CreateMovieUseCase;
  let repository: IMoviesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateMovieUseCase,
        MoviesTypeOrmRepository,
        {
          provide: getRepositoryToken(Movies),
          useClass: Repository,
        },
        {
          provide: 'IMoviesRepository',
          useClass: MoviesTypeOrmRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateMovieUseCase>(CreateMovieUseCase);

    repository = module.get<IMoviesRepository>('IMoviesRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create an award', async () => {
    const createMovieDto = {
      id: '9a5f6d5d-9a9a-11ed-afa1-0242ac120002',
      year: 2022,
      title: 'Title Teste',
      studios: 'Studios Teste',
      producer: 'ProducersTeste',
      winner: true,
    };

    jest.spyOn(repository, 'create').mockResolvedValue(createMovieDto);

    const result = await useCase.execute(createMovieDto);
    expect(result).toBeDefined();
  });
});
