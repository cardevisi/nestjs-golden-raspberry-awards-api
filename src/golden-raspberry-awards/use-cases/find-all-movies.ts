import { Inject, Injectable } from '@nestjs/common';
import { IMoviesRepository } from './golden-raspberry-awards.typeorm.repository';

@Injectable()
export class FindAllMoviesUseCase {
  constructor(
    @Inject('IMoviesRepository')
    private goldenRaspberryAwardRepository: IMoviesRepository,
  ) {}
  execute() {
    return this.goldenRaspberryAwardRepository.findAll();
  }
}
