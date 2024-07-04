import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RemoveGoldenRaspberryAwardsUseCase } from './remove-golden-raspberry-awards';
import { GoldenRaspberryAward } from '../entities/golden-raspberry-award.entity';
import {
  GoldenRaspberryAwardsTypeOrmRepository,
  IGoldenRaspberryAwardsRepository,
} from './golden-raspberry-awards.typeorm.repository';

describe('RemoveGoldenRaspberryAwardsUseCase', () => {
  let useCase: RemoveGoldenRaspberryAwardsUseCase;
  let repository: IGoldenRaspberryAwardsRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RemoveGoldenRaspberryAwardsUseCase,
        {
          provide: getRepositoryToken(GoldenRaspberryAward),
          useClass: Repository,
        },
        {
          provide: 'IGoldenRaspberryAwardsRepository',
          useClass: GoldenRaspberryAwardsTypeOrmRepository,
        },
      ],
    }).compile();

    useCase = module.get<RemoveGoldenRaspberryAwardsUseCase>(
      RemoveGoldenRaspberryAwardsUseCase,
    );

    repository = module.get<IGoldenRaspberryAwardsRepository>(
      'IGoldenRaspberryAwardsRepository',
    );
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
