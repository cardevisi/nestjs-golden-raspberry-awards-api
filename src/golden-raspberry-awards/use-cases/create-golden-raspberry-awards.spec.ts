import { Test, TestingModule } from '@nestjs/testing';
import { CreateGoldenRaspberryAwardsUseCase } from './create-golden-raspberry-awards';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movies } from '../entities/movies.entity';
import {
  GoldenRaspberryAwardsTypeOrmRepository,
  IGoldenRaspberryAwardsRepository,
} from './golden-raspberry-awards.typeorm.repository';

describe('GoldenRaspberryAwardsuseCase', () => {
  let useCase: CreateGoldenRaspberryAwardsUseCase;
  let repository: IGoldenRaspberryAwardsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateGoldenRaspberryAwardsUseCase,
        GoldenRaspberryAwardsTypeOrmRepository,
        {
          provide: getRepositoryToken(Movies),
          useClass: Repository,
        },
        {
          provide: 'IGoldenRaspberryAwardsRepository',
          useClass: GoldenRaspberryAwardsTypeOrmRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateGoldenRaspberryAwardsUseCase>(
      CreateGoldenRaspberryAwardsUseCase,
    );

    repository = module.get<IGoldenRaspberryAwardsRepository>(
      'IGoldenRaspberryAwardsRepository',
    );
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create an award', async () => {
    const createGoldenRaspberryAwardDto = {
      id: '9a5f6d5d-9a9a-11ed-afa1-0242ac120002',
      year: 2022,
      title: 'Title Teste',
      studios: 'Studios Teste',
      producer: 'ProducersTeste',
      winner: true,
    };

    jest
      .spyOn(repository, 'create')
      .mockResolvedValue(createGoldenRaspberryAwardDto);

    const result = await useCase.execute(createGoldenRaspberryAwardDto);
    expect(result).toBeDefined();
  });
});
