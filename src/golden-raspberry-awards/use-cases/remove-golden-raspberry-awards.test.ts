import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RemoveGoldenRaspberryAwardsUseCase } from './remove-golden-raspberry-awards';
import { GoldenRaspberryAward } from '../entities/golden-raspberry-award.entity';

describe('RemoveGoldenRaspberryAwardsUseCase', () => {
  let useCase: RemoveGoldenRaspberryAwardsUseCase;
  let repository: Repository<GoldenRaspberryAward>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RemoveGoldenRaspberryAwardsUseCase,
        {
          provide: getRepositoryToken(GoldenRaspberryAward),
          useClass: Repository,
        },
      ],
    }).compile();

    useCase = module.get<RemoveGoldenRaspberryAwardsUseCase>(
      RemoveGoldenRaspberryAwardsUseCase,
    );

    repository = module.get<Repository<GoldenRaspberryAward>>(
      getRepositoryToken(GoldenRaspberryAward),
    );
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should remove an award', async () => {
    jest.spyOn(repository, 'delete');
    const result = await useCase.execute(
      '9a5f6d5d-9a9a-11ed-afa1-0242ac120002',
    );
    expect(repository.delete).toHaveBeenCalled();
  });
});
