import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GoldenRaspberryAward } from '../entities/golden-raspberry-award.entity';

@Injectable()
export class CreateGoldenRaspberryAwardsUseCase {
  constructor(
    @InjectRepository(GoldenRaspberryAward)
    private goldenRaspberryAwardRepository: Repository<GoldenRaspberryAward>,
  ) {}
  execute(input: GoldenRaspberryAward) {
    const createGoldenRaspberryAwardDto = new GoldenRaspberryAward(
      input.id,
      input.year,
      input.title,
      input.studios,
      input.producers,
      input.winner,
    );

    return this.goldenRaspberryAwardRepository.save(
      createGoldenRaspberryAwardDto,
    );
  }
}
