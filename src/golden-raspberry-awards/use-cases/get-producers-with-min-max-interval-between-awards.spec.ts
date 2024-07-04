import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { describe } from 'node:test';
import { GoldenRaspberryAward } from '../entities/golden-raspberry-award.entity';
import { GetProducersWithMinMaxIntervalAwatdsUseCase } from './get-producers-with-min-max-interval-between-awards';
import { CreateGoldenRaspberryAwardsUseCase } from './create-golden-raspberry-awards';
import crypto from 'crypto';
import { FindAllGoldenRaspberryAwardsUseCase } from './find-all-golden-raspberry-awards';
import {
  GoldenRaspberryAwardsTypeOrmRepository,
  IGoldenRaspberryAwardsRepository,
} from './golden-raspberry-awards.typeorm.repository';

describe('GetProducerLongerIntervalBetweenAwards', () => {
  let useCase: GetProducersWithMinMaxIntervalAwatdsUseCase;
  let repository: IGoldenRaspberryAwardsRepository;
  let createGolden: CreateGoldenRaspberryAwardsUseCase;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [GoldenRaspberryAward],
          logging: false,
          synchronize: true,
        }),
        TypeOrmModule.forFeature([GoldenRaspberryAward]),
      ],
      providers: [
        CreateGoldenRaspberryAwardsUseCase,
        GetProducersWithMinMaxIntervalAwatdsUseCase,
        FindAllGoldenRaspberryAwardsUseCase,
        GoldenRaspberryAwardsTypeOrmRepository,
        {
          provide: 'IGoldenRaspberryAwardsRepository',
          useExisting: GoldenRaspberryAwardsTypeOrmRepository,
        },
      ],
    }).compile();

    useCase = module.get<GetProducersWithMinMaxIntervalAwatdsUseCase>(
      GetProducersWithMinMaxIntervalAwatdsUseCase,
    );

    createGolden = module.get<CreateGoldenRaspberryAwardsUseCase>(
      CreateGoldenRaspberryAwardsUseCase,
    );

    repository = module.get<IGoldenRaspberryAwardsRepository>(
      'IGoldenRaspberryAwardsRepository',
    );
  });

  afterEach(async () => {
    await repository.query('DELETE FROM golden_raspberry_awards');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should get max and min interval', async () => {
    const result = {
      min: [
        {
          producer: 'Producer 1',
          interval: 1,
          previousWin: 2008,
          followingWin: 2009,
        },
        {
          producer: 'Producer 2',
          interval: 1,
          previousWin: 2018,
          followingWin: 2019,
        },
      ],
      max: [
        {
          producer: 'Producer 1',
          interval: 99,
          previousWin: 1900,
          followingWin: 1999,
        },
        {
          producer: 'Producer 2',
          interval: 80,
          previousWin: 2019,
          followingWin: 2099,
        },
      ],
    };

    await createGolden.execute(
      new GoldenRaspberryAward(
        crypto.randomUUID(),
        2008,
        'Title teste',
        'Studios teste',
        'Producer 1',
        false,
      ),
    );

    await createGolden.execute(
      new GoldenRaspberryAward(
        crypto.randomUUID(),
        2009,
        'Title teste',
        'Studios teste',
        'Producer 1',
        false,
      ),
    );

    await createGolden.execute(
      new GoldenRaspberryAward(
        crypto.randomUUID(),
        1900,
        'Title teste',
        'Studios teste',
        'Producer 1',
        false,
      ),
    );

    await createGolden.execute(
      new GoldenRaspberryAward(
        crypto.randomUUID(),
        1999,
        'Title teste',
        'Studios teste',
        'Producer 1',
        false,
      ),
    );

    await createGolden.execute(
      new GoldenRaspberryAward(
        crypto.randomUUID(),
        2099,
        'Title teste',
        'Studios teste',
        'Producer 2',
        false,
      ),
    );

    await createGolden.execute(
      new GoldenRaspberryAward(
        crypto.randomUUID(),
        2018,
        'Title teste',
        'Studios teste',
        'Producer 2',
        false,
      ),
    );

    await createGolden.execute(
      new GoldenRaspberryAward(
        crypto.randomUUID(),
        2019,
        'Title teste',
        'Studios teste',
        'Producer 2',
        false,
      ),
    );

    await createGolden.execute(
      new GoldenRaspberryAward(
        crypto.randomUUID(),
        2000,
        'Title teste',
        'Studios teste',
        'Producer 2',
        false,
      ),
    );

    const queryResult = await useCase.execute();

    expect(queryResult).toEqual(result);
  });
});
