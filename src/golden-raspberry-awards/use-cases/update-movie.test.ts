import { Test } from '@nestjs/testing';
import { UpdateMovieUseCase } from './update-movie';
import { Repository } from 'typeorm';
import { Movies } from '../entities/movies.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  MoviesTypeOrmRepository,
  IMoviesRepository,
} from './golden-raspberry-awards.typeorm.repository';

describe('UpdateMoviesUseCase', () => {
  let useCase: UpdateMovieUseCase;
  let repository: IMoviesRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UpdateMovieUseCase,
        {
          provide: getRepositoryToken(Movies),
          useValue: Repository,
        },
        {
          provide: 'IMoviesRepository',
          useClass: MoviesTypeOrmRepository,
        },
      ],
    }).compile();

    useCase = module.get<UpdateMovieUseCase>(UpdateMovieUseCase);
    repository = module.get<IMoviesRepository>('IMoviesRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should update an award', async () => {
    const updateGoldenRaspberryAwardDto = {
      id: '9a5f6d5d-9a9a-11ed-afa1-0242ac120002',
      year: 2020,
      title: 'Golden Raspberry Awards 2020',
      studios: 'Columbia Pictures',
      producer: 'Columbia Pictures',
      winner: true,
    };

    jest.spyOn(repository, 'update');

    const updateResult = await useCase.execute(
      '9a5f6d5d-9a9a-11ed-afa1-0242ac120002',
      updateGoldenRaspberryAwardDto,
    );
    expect(repository.update).toHaveBeenCalled();
    expect(updateResult).toEqual(updateGoldenRaspberryAwardDto);
  });
});
