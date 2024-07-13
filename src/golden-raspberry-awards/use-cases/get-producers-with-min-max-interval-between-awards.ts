import { Inject, Injectable } from '@nestjs/common';
import { IGoldenRaspberryAwardsRepository } from './golden-raspberry-awards.typeorm.repository';
import { SelectQueryBuilder } from 'typeorm';
import { Movies } from '../entities/movies.entity';

@Injectable()
export class GetProducersWithMinMaxIntervalAwatdsUseCase {
  MIN_QUANTITY_OF_AWARDS = 2;
  constructor(
    @Inject('IGoldenRaspberryAwardsRepository')
    private readonly goldenRaspberryAwardRepository: IGoldenRaspberryAwardsRepository,
  ) {}

  async execute() {
    const queryResultMinMaxIntervals = await this.goldenRaspberryAwardRepository
      .query(`
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
       )
       SELECT
          'Max Interval' AS interval_type,
          max.producer,
          max.previousWin,
          max.followingWin,
          MAX(interval) AS interval
       FROM
         MoreThanOneWinners max
       UNION
       SELECT
          'Min Interval' AS interval_type,
          min.producer,
          min.previousWin,
          min.followingWin,
          MIN(interval) AS interval
       FROM
         MoreThanOneWinners min
       ORDER BY interval DESC
   `);

    const producersMinWithInterval = queryResultMinMaxIntervals
      .filter((movie) => movie.interval_type === 'Min Interval')
      .map((movie) => {
        return {
          producer: movie.producer,
          interval: movie.interval,
          previousWin: movie.previousWin,
          followingWin: movie.followingWin,
        };
      });

    const producersMaxWithInterval = queryResultMinMaxIntervals
      .filter((movie) => movie.interval_type === 'Max Interval')
      .map((movie) => {
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
