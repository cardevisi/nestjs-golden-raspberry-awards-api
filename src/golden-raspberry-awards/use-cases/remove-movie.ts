import { Inject, Injectable } from '@nestjs/common';
import { IMoviesRepository } from './movies.typeorm.repository';

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
