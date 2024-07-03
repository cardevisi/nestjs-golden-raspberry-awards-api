import { Test, TestingModule } from '@nestjs/testing';
import { CreateGoldenRaspberryAwardsUseCase } from './create-golden-raspberry-awards';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GoldenRaspberryAward } from '../entities/golden-raspberry-award.entity';

describe('GoldenRaspberryAwardsuseCase', () => {
  let useCase: CreateGoldenRaspberryAwardsUseCase;
  let repository: Repository<GoldenRaspberryAward>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateGoldenRaspberryAwardsUseCase,
        {
          provide: getRepositoryToken(GoldenRaspberryAward),
          useClass: Repository,
        },
      ],
    }).compile();

    useCase = module.get<CreateGoldenRaspberryAwardsUseCase>(
      CreateGoldenRaspberryAwardsUseCase,
    );
    repository = module.get<Repository<GoldenRaspberryAward>>(
      getRepositoryToken(GoldenRaspberryAward),
    );
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create an award', async () => {
    const createGoldenRaspberryAwardDto = {
      id: '9a5f6d5d-9a9a-11ed-afa1-0242ac120002',
      year: '2022',
      title: 'Title Teste',
      studios: 'Studios Teste',
      producers: 'ProducersTeste',
      winner: true,
    };

    jest
      .spyOn(repository, 'save')
      .mockResolvedValue(createGoldenRaspberryAwardDto);

    const result = await useCase.execute(createGoldenRaspberryAwardDto);
    expect(result).toBeDefined();
  });
});
