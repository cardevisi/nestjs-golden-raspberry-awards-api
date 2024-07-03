import { Test } from '@nestjs/testing';
import { UpdateGoldenRaspberryAwardsUseCase } from './update-golden-raspberry-awards';
import { Repository } from 'typeorm';
import { GoldenRaspberryAward } from '../entities/golden-raspberry-award.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UpdateGoldenRaspberryAwardsUseCase', () => {
  let useCase: UpdateGoldenRaspberryAwardsUseCase;
  let repository: Repository<GoldenRaspberryAward>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UpdateGoldenRaspberryAwardsUseCase],
    }).compile();

    useCase = module.get<UpdateGoldenRaspberryAwardsUseCase>(
      UpdateGoldenRaspberryAwardsUseCase,
    );
    repository = module.get<Repository<GoldenRaspberryAward>>(
      getRepositoryToken(GoldenRaspberryAward),
    );
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should update an award', async () => {
    const updateGoldenRaspberryAwardDto = {
      id: '9a5f6d5d-9a9a-11ed-afa1-0242ac120002',
      year: '2020',
      title: 'Golden Raspberry Awards 2020',
      studios: 'Columbia Pictures',
      producers: 'Columbia Pictures',
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
