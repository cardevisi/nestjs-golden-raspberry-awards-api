import { Test, TestingModule } from '@nestjs/testing';
import { FindAllMoviesUseCase } from './find-all-movies';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movies } from '../entities/movies.entity';
import {
  MoviesTypeOrmRepository,
  IMoviesRepository,
} from './golden-raspberry-awards.typeorm.repository';

describe('FindAllMoviesUseCase', () => {
  describe('execute', () => {
    let useCase: FindAllMoviesUseCase;
    let repository: IMoviesRepository;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          FindAllMoviesUseCase,
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

      useCase = module.get<FindAllMoviesUseCase>(FindAllMoviesUseCase);
      repository = module.get<IMoviesRepository>('IMoviesRepository');
    });

    it('should be defined', () => {
      expect(useCase).toBeDefined();
    });

    it('should find all awards', async () => {
      const finalAllResult = [
        {
          id: '9a5f6d5d-9a9a-11ed-afa1-0242ac120002',
          year: 2022,
          title: 'Title Teste',
          studios: 'Studios Teste',
          producer: 'ProducersTeste',
          winner: true,
        },
        {
          id: '9a5f6d5d-9a9a-11ed-afa1-0242ac120002',
          year: 2025,
          title: 'Title teste',
          studios: 'Studios teste',
          producer: 'Producers teste',
          winner: false,
        },
      ];

      jest.spyOn(repository, 'findAll').mockResolvedValue(finalAllResult);
      const findAllResult = await useCase.execute();
      expect(repository.findAll).toHaveBeenCalled();
      expect(findAllResult).toHaveLength(2);
      expect(findAllResult).toEqual(finalAllResult);
    });
  });
});
