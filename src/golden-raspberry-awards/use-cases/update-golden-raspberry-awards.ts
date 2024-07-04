import { Inject, Injectable } from '@nestjs/common';
import { GoldenRaspberryAward } from '../entities/golden-raspberry-award.entity';
import { IGoldenRaspberryAwardsRepository } from './golden-raspberry-awards.typeorm.repository';

@Injectable()
export class UpdateGoldenRaspberryAwardsUseCase {
  constructor(
    @Inject('IGoldenRaspberryAwardsRepository')
    private readonly goldenRaspberryAwardRepository: IGoldenRaspberryAwardsRepository,
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
