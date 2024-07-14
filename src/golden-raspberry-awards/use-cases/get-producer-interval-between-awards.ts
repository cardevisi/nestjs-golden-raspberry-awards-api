import { Inject, Injectable } from '@nestjs/common';
import { IMoviesRepository } from './golden-raspberry-awards.typeorm.repository';

type Movie = {
  interval_type: string;
  interval: number;
  previousWin: number;
  followingWin: number;
  producer: string;
};

@Injectable()
export class GetProducerIntervalBetweenAwardsUseCase {
  MIN_QUANTITY_OF_AWARDS = 2;
  constructor(
    @Inject('IMoviesRepository')
    private readonly moviesRepository: IMoviesRepository,
  ) {}

  async execute() {
    const queryResultIntervals = await this.moviesRepository.query(`
      WITH WinnersMovies AS (
        SELECT
          producer,
          title,
          year,
          winner
        FROM
          movies
        WHERE
          winner = '1'
       ),
       MoreThanOneWinners AS (
        SELECT
          producer,
          MIN(year) AS previousWin,
          MAX(year) AS followingWin,
          MAX(year) - MIN(year) AS interval
        FROM
          WinnersMovies
        GROUP BY producer
        HAVING COUNT(*) >= 2
        ORDER BY interval DESC
       )
        SELECT
          'Min Interval' AS interval_type,
          producer,
          interval,
          previousWin,
          followingWin,
          MIN(interval) AS interval
        FROM
          MoreThanOneWinners
        UNION
        SELECT
          'Max Interval' AS interval_type,
          producer,
          interval,
          previousWin,
          followingWin,
          MAX(interval) AS interval
        FROM
          MoreThanOneWinners
      `);

    const producersMinWithInterval = queryResultIntervals
      .filter((movie: Movie) => movie.interval_type === 'Min Interval')
      .map((movie: Movie) => {
        return {
          producer: movie.producer,
          interval: movie.interval,
          previousWin: movie.previousWin,
          followingWin: movie.followingWin,
        };
      });

    const producersMaxWithInterval = queryResultIntervals
      .filter((movie: Movie) => movie.interval_type === 'Max Interval')
      .map((movie: Movie) => {
        return {
          producer: movie.producer,
          interval: movie.interval,
          previousWin: movie.previousWin,
          followingWin: movie.followingWin,
        };
      });

    return {
      min: [...producersMinWithInterval],
      max: [...producersMaxWithInterval],
    };
  }
}
