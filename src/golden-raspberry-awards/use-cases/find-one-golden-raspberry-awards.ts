import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { GoldenRaspberryAward } from '../entities/golden-raspberry-award.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindOneGoldenRaspBarrelAwardUseCase {
  constructor(
    @InjectRepository(GoldenRaspberryAward)
    private readonly findOneGoldenRaspberryAwardsRepository: Repository<GoldenRaspberryAward>,
  ) {}

  execute(id: string) {
    return this.findOneGoldenRaspberryAwardsRepository.findOne({
      where: { id },
    });
  }
}
