import { Inject, Injectable } from '@nestjs/common';
import { Movies } from '../entities/movies.entity';
import { IGoldenRaspberryAwardsRepository } from './golden-raspberry-awards.typeorm.repository';

@Injectable()
export class UpdateGoldenRaspberryAwardsUseCase {
  constructor(
    @Inject('IGoldenRaspberryAwardsRepository')
    private readonly goldenRaspberryAwardRepository: IGoldenRaspberryAwardsRepository,
  ) {}

  execute(id: string, input: Movies) {
    const updateGoldenRaspberryAwardDto = new Movies(
      id,
      input.year,
      input.title,
      input.studios,
      input.producer,
      input.winner,
    );

    return this.goldenRaspberryAwardRepository.update(
      id,
      updateGoldenRaspberryAwardDto,
    );
  }
}
