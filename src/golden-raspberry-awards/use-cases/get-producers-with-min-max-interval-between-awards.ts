import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GoldenRaspberryAward } from '../entities/golden-raspberry-award.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetProducersWithMinMaxIntervalAwatdsUseCase {
  constructor(
    @InjectRepository(GoldenRaspberryAward)
    private readonly goldenRaspberryAwardRepository: Repository<GoldenRaspberryAward>,
  ) {}

  async execute() {
    const queryResult = await this.goldenRaspberryAwardRepository.query(`
      WITH PreviousYears AS (
        SELECT
          producers,
          title,
          year,
          LAG(year) OVER (PARTITION BY producers ORDER BY year) AS previous_year
        FROM
          golden_raspberry_awards
      ),
      Intervals AS (
        SELECT
          producers,
          title,
          year as followingWin,
          previous_year as previousWin,
          year - previous_year AS interval
        FROM
          PreviousYears
        WHERE
          previous_year IS NOT NULL
      ),
      MaxInterval AS (
        SELECT
          producers,
          previousWin,
          followingWin,
          MAX(interval) AS max_interval
        FROM
          Intervals
        GROUP BY
          producers
      ),
      MinInterval AS (
        SELECT
          producers,
          previousWin,
          followingWin,
          MIN(interval) AS min_interval
        FROM
          Intervals
        GROUP BY
          producers
      )
      -- Resultados Finais
      SELECT
        'Max Interval' AS interval_type,
        maxline.producers as producer,
        maxline.previousWin,
        maxline.followingWin,
        maxline.max_interval AS interval
      FROM
        MaxInterval maxline
      UNION
      SELECT
        'Min Interval' AS interval_type,
        minline.producers as producer,
        minline.previousWin,
        minline.followingWin,
        minline.min_interval AS interval
      FROM
        MinInterval minline
      ORDER BY
        producer ASC;
    `);

    const producersMin = queryResult
      .filter((movie) => movie.interval_type === 'Min Interval')
      .map((movie) => {
        return {
          producer: movie.producer,
          interval: movie.interval,
          previousWin: movie.previousWin,
          followingWin: movie.followingWin,
        };
      });

    const producersMax = queryResult
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
      min: [...producersMin],
      max: [...producersMax],
    };
  }
}
