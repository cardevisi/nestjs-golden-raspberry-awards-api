import { Inject, Injectable } from '@nestjs/common';
import { Movies } from '../entities/movies.entity';
import { IMoviesRepository } from './golden-raspberry-awards.typeorm.repository';

@Injectable()
export class UpdateMovieUseCase {
  constructor(
    @Inject('IMoviesRepository')
    private readonly moviesRepository: IMoviesRepository,
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

    return this.moviesRepository.update(id, updateGoldenRaspberryAwardDto);
  }
}
