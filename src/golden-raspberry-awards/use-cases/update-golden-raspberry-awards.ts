import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { GoldenRaspberryAward } from '../entities/golden-raspberry-award.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UpdateGoldenRaspberryAwardsUseCase {
  constructor(
    @InjectRepository(GoldenRaspberryAward)
    private readonly goldenRaspberryAwardRepository: Repository<GoldenRaspberryAward>,
  ) {}

  execute(id: string, input: GoldenRaspberryAward) {
    const updateGoldenRaspberryAwardDto = new GoldenRaspberryAward(
      id,
      input.year,
      input.title,
      input.studios,
      input.producers,
      input.winner,
    );

    return this.goldenRaspberryAwardRepository.update(
      id,
      updateGoldenRaspberryAwardDto,
    );
  }
}
