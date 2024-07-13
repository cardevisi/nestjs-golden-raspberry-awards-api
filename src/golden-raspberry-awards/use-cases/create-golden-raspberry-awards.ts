import { Inject, Injectable } from '@nestjs/common';
import { Movies } from '../entities/movies.entity';
import { IGoldenRaspberryAwardsRepository } from './golden-raspberry-awards.typeorm.repository';

@Injectable()
export class CreateGoldenRaspberryAwardsUseCase {
  constructor(
    @Inject('IGoldenRaspberryAwardsRepository')
    private readonly goldenRaspberryAwardRepository: IGoldenRaspberryAwardsRepository,
  ) {}
  execute(input: Movies) {
    const createGoldenRaspberryAwardDto = new Movies(
      input.id,
      input.year,
      input.title,
      input.studios,
      input.producer,
      input.winner,
    );

    return this.goldenRaspberryAwardRepository.create(
      createGoldenRaspberryAwardDto,
    );
  }
}
