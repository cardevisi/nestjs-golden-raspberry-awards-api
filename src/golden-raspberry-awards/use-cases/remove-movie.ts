import { Inject, Injectable } from '@nestjs/common';
import { IMoviesRepository } from './golden-raspberry-awards.typeorm.repository';

@Injectable()
export class RemoveMovieUseCase {
  constructor(
    @Inject('IMoviesRepository')
    private readonly removeMovieRepository: IMoviesRepository,
  ) {}
  execute(id: string) {
    return this.removeMovieRepository.remove(id);
  }
}
