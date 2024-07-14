import { Test } from '@nestjs/testing';
import { describe } from 'node:test';
import { FindOneGoldenRaspBarrelAwardUseCase } from './find-one-movies';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movies } from '../entities/movies.entity';
import {
  MoviesTypeOrmRepository,
  IMoviesRepository,
} from './golden-raspberry-awards.typeorm.repository';

describe('FindOneMoviesUseCase', () => {
  let useCase: FindOneGoldenRaspBarrelAwardUseCase;
  let repository: IMoviesRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        FindOneGoldenRaspBarrelAwardUseCase,
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

    useCase = module.get<FindOneGoldenRaspBarrelAwardUseCase>(
      FindOneGoldenRaspBarrelAwardUseCase,
    );
    repository = module.get<IMoviesRepository>('IMoviesRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should find one an award', async () => {
    const findOneResult = {
      id: '9a5f6d5d-9a9a-11ed-afa1-0242ac120002',
      year: 2022,
      title: 'Title Teste',
      studios: 'Studios Teste',
      producer: 'ProducersTeste',
      winner: true,
    };

    jest.spyOn(repository, 'findOne').mockResolvedValue(findOneResult);

    const result = await useCase.execute(
      '9a5f6d5d-9a9a-11ed-afa1-0242ac120002',
    );
    expect(result).toBeDefined();
    expect(result).toEqual(findOneResult);
  });
});
