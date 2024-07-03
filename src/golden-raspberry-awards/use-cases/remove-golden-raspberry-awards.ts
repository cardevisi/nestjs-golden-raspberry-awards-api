import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GoldenRaspberryAward } from '../entities/golden-raspberry-award.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RemoveGoldenRaspberryAwardsUseCase {
  constructor(
    @InjectRepository(GoldenRaspberryAward)
    private readonly removeGoldenRaspberryAwardsRepository: Repository<GoldenRaspberryAward>,
  ) {}
  execute(id: string) {
    return this.removeGoldenRaspberryAwardsRepository.delete({ id });
  }
}
