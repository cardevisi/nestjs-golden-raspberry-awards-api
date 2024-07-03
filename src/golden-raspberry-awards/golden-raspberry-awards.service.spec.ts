import { Test, TestingModule } from '@nestjs/testing';
import { GoldenRaspberryAwardsService } from './golden-raspberry-awards.service';

describe('GoldenRaspberryAwardsService', () => {
  let service: GoldenRaspberryAwardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoldenRaspberryAwardsService],
    }).compile();

    service = module.get<GoldenRaspberryAwardsService>(
      GoldenRaspberryAwardsService,
    );
  });

  it.skip('should be defined', () => {
    expect(service).toBeDefined();
  });
});
