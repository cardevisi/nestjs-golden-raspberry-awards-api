import { Inject, Injectable } from '@nestjs/common';
import { IMoviesRepository } from './golden-raspberry-awards.typeorm.repository';

@Injectable()
export class FindAllMoviesUseCase {
  constructor(
    @Inject('IMoviesRepository')
    private moviesRepository: IMoviesRepository,
  ) {}
  async execute() {
    return await this.moviesRepository.findAll();
  }
}
