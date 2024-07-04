import { Inject, Injectable } from '@nestjs/common';
import { GoldenRaspberryAward } from '../entities/golden-raspberry-award.entity';
import { IGoldenRaspberryAwardsRepository } from './golden-raspberry-awards.typeorm.repository';

@Injectable()
export class CreateGoldenRaspberryAwardsUseCase {
  constructor(
    @Inject('IGoldenRaspberryAwardsRepository')
    private readonly goldenRaspberryAwardRepository: IGoldenRaspberryAwardsRepository,
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

    return this.goldenRaspberryAwardRepository.create(
      createGoldenRaspberryAwardDto,
    );
  }
}
