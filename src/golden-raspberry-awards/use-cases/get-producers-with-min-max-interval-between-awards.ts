import { Inject, Injectable } from '@nestjs/common';
import { IGoldenRaspberryAwardsRepository } from './golden-raspberry-awards.typeorm.repository';
import { SelectQueryBuilder } from 'typeorm';
import { GoldenRaspberryAward } from '../entities/golden-raspberry-award.entity';

@Injectable()
export class GetProducersWithMinMaxIntervalAwatdsUseCase {
  constructor(
    @Inject('IGoldenRaspberryAwardsRepository')
    private readonly goldenRaspberryAwardRepository: IGoldenRaspberryAwardsRepository,
  ) {}

  async execute() {
    /**
     * REFACTOR: apply a query builder
     */
    const queryResultMinMaxIntervals = await this.goldenRaspberryAwardRepository
      .query(`
      WITH FollowingYears AS (
        SELECT
          producers,
          title,
          year,
          LEAD(year) OVER (PARTITION BY producers ORDER BY year) AS following_year
        FROM
          golden_raspberry_awards
      ),
      Intervals AS (
        SELECT
          producers,
          title,
          year,
          following_year,
          following_year - year AS interval
        FROM
          FollowingYears
        WHERE
          following_year IS NOT NULL
      ),
      MaxInterval AS (
        SELECT
          producers,
          year,
          following_year,
          MAX(interval) AS max_interval
        FROM
          Intervals
        GROUP BY
          producers
      ),
      MinInterval AS (
        SELECT
          producers,
          year,
          following_year,
          MIN(interval) AS min_interval
        FROM
          Intervals
        GROUP BY
          producers
      )
      SELECT
        'Max Interval' AS interval_type,
        max.producers as producer,
        max.year as previousWin, 
        max.following_year as followingWin,
        max.max_interval AS interval
      FROM
        MaxInterval max
      UNION
      SELECT
        'Min Interval' AS interval_type,
        min.producers as producer,
        min.year as previousWin,
        min.following_year as followingWin,
        min.min_interval AS interval
      FROM
        MinInterval min`);

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
