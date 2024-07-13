import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Movies } from '../entities/movies.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IGoldenRaspberryAwardsRepository } from './golden-raspberry-awards.typeorm.repository';

@Injectable()
export class FindOneGoldenRaspBarrelAwardUseCase {
  constructor(
    @Inject('IGoldenRaspberryAwardsRepository')
    private readonly findOneGoldenRaspberryAwardsRepository: IGoldenRaspberryAwardsRepository,
  ) {}

  execute(id: string) {
    return this.findOneGoldenRaspberryAwardsRepository.findOne(id);
  }
}
