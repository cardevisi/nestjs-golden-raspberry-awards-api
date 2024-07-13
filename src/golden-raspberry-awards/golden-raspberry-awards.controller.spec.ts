import { Test, TestingModule } from '@nestjs/testing';
import { GoldenRaspberryAwardsController } from './golden-raspberry-awards.controller';
import { CreateGoldenRaspberryAwardsUseCase } from './use-cases/create-golden-raspberry-awards';
import { FindAllGoldenRaspberryAwardsUseCase } from './use-cases/find-all-golden-raspberry-awards';
import { FindOneGoldenRaspBarrelAwardUseCase } from './use-cases/find-one-golden-raspberry-awards';
import { UpdateGoldenRaspberryAwardsUseCase } from './use-cases/update-golden-raspberry-awards';
import { RemoveGoldenRaspberryAwardsUseCase } from './use-cases/remove-golden-raspberry-awards';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movies } from './entities/movies.entity';
import { GetProducersWithMinMaxIntervalAwatdsUseCase } from './use-cases/get-producers-with-min-max-interval-between-awards';
import { GoldenRaspberryAwardsTypeOrmRepository } from './use-cases/golden-raspberry-awards.typeorm.repository';

describe('GoldenRaspberryAwardsController', () => {
  let controller: GoldenRaspberryAwardsController;
  let useCase: CreateGoldenRaspberryAwardsUseCase;
  let repository: Repository<Movies>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [GoldenRaspberryAwardsController],
      providers: [
        FindAllGoldenRaspberryAwardsUseCase,
        FindOneGoldenRaspBarrelAwardUseCase,
        CreateGoldenRaspberryAwardsUseCase,
        UpdateGoldenRaspberryAwardsUseCase,
        RemoveGoldenRaspberryAwardsUseCase,
        GetProducersWithMinMaxIntervalAwatdsUseCase,
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
    controller = module.get<GoldenRaspberryAwardsController>(
      GoldenRaspberryAwardsController,
    );
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
