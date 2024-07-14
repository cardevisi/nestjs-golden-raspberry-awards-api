import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RemoveMovieUseCase } from './remove-movie';
import { Movies } from '../entities/movies.entity';
import {
  MoviesTypeOrmRepository,
  IMoviesRepository,
} from './golden-raspberry-awards.typeorm.repository';

describe('RemoveMoviesUseCase', () => {
  let useCase: RemoveMovieUseCase;
  let repository: IMoviesRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RemoveMovieUseCase,
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

    useCase = module.get<RemoveMovieUseCase>(RemoveMovieUseCase);

    repository = module.get<IMoviesRepository>('IMoviesRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should remove an award', async () => {
    jest.spyOn(repository, 'remove');
    await useCase.execute('9a5f6d5d-9a9a-11ed-afa1-0242ac120002');
    expect(repository.remove).toHaveBeenCalled();
  });
});
