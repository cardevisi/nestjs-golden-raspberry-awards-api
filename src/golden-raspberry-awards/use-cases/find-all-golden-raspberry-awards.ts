import { Inject, Injectable } from '@nestjs/common';
import { IGoldenRaspberryAwardsRepository } from './golden-raspberry-awards.typeorm.repository';

@Injectable()
export class FindAllGoldenRaspberryAwardsUseCase {
  constructor(
    @Inject('IGoldenRaspberryAwardsRepository')
    private goldenRaspberryAwardRepository: IGoldenRaspberryAwardsRepository,
  ) {}
  execute() {
    return this.goldenRaspberryAwardRepository.findAll();
  }
}
