import { Inject, Injectable } from '@nestjs/common';
import { IGoldenRaspberryAwardsRepository } from './golden-raspberry-awards.typeorm.repository';

@Injectable()
export class RemoveGoldenRaspberryAwardsUseCase {
  constructor(
    @Inject('IGoldenRaspberryAwardsRepository')
    private readonly removeGoldenRaspberryAwardsRepository: IGoldenRaspberryAwardsRepository,
  ) {}
  execute(id: string) {
    return this.removeGoldenRaspberryAwardsRepository.remove(id);
  }
}
