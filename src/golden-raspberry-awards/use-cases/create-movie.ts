import { Inject, Injectable } from '@nestjs/common';
import { Movies } from '../entities/movies.entity';
import { IMoviesRepository } from './golden-raspberry-awards.typeorm.repository';

@Injectable()
export class CreateMovieUseCase {
  constructor(
    @Inject('IMoviesRepository')
    private readonly moviesRepository: IMoviesRepository,
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

    return this.moviesRepository.create(createGoldenRaspberryAwardDto);
  }
}
