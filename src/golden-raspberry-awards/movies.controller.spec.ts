import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { CreateMovieUseCase } from './use-cases/create-movie';
import { FindAllMoviesUseCase } from './use-cases/find-all-movies';
import { FindOneGoldenRaspBarrelAwardUseCase } from './use-cases/find-one-movies';
import { UpdateMovieUseCase } from './use-cases/update-movie';
import { RemoveMovieUseCase } from './use-cases/remove-movie';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movies } from './entities/movies.entity';
import { GetProducerIntervalBetweenAwardsUseCase } from './use-cases/get-producer-interval-between-awards';
import { MoviesTypeOrmRepository } from './use-cases/golden-raspberry-awards.typeorm.repository';

describe('MoviesController', () => {
  let useCase: CreateMovieUseCase;
  let repository: Repository<Movies>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [MoviesController],
      providers: [
        FindAllMoviesUseCase,
        FindOneGoldenRaspBarrelAwardUseCase,
        CreateMovieUseCase,
        UpdateMovieUseCase,
        RemoveMovieUseCase,
        GetProducerIntervalBetweenAwardsUseCase,
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
    repository = module.get<Repository<Movies>>(getRepositoryToken(Movies));
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create an award', async () => {
    const createGoldenRaspberryAwardDto = {
      id: 'Teste',
      year: 2022,
      title: 'Teste',
      studios: 'Teste',
      producer: 'Teste',
      winner: true,
    };

    repository.save = jest
      .fn()
      .mockResolvedValue(createGoldenRaspberryAwardDto);

    const result = await useCase.execute(createGoldenRaspberryAwardDto);
    expect(result).toEqual(createGoldenRaspberryAwardDto);
    expect(repository.save).toHaveBeenCalled();
  });
});
