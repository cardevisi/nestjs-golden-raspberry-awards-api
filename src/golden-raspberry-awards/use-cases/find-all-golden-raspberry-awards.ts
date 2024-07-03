import { InjectRepository } from '@nestjs/typeorm';
import { GoldenRaspberryAward } from '../entities/golden-raspberry-award.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAllGoldenRaspberryAwardsUseCase {
  constructor(
    @InjectRepository(GoldenRaspberryAward)
    private goldenRaspberryAwardRepository: Repository<GoldenRaspberryAward>,
  ) {}
  execute() {
    return this.goldenRaspberryAwardRepository.find();
  }
}
