import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { GoldenRaspberryAward } from './entities/golden-raspberry-award.entity';
import csvParser from 'csv-parser';
import * as fs from 'fs';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ImportCsvService {
  constructor(
    @InjectRepository(GoldenRaspberryAward)
    private readonly goldenRaspberryAwardsRepository: Repository<GoldenRaspberryAward>,
  ) {}

  async importCsv(filePath: string): Promise<void> {
    const GoldenRaspberryAwardsMovies: GoldenRaspberryAward[] = [];

    return new Promise((resolve, rejects) => {
      fs.createReadStream(filePath)
        .pipe(csvParser({ strict: true, separator: ';' }))
        .on('data', (data) => {
          const movie = new GoldenRaspberryAward(
            data.id,
            data.year,
            data.title,
            data.studios,
            data.producers,
            data.winner === 'yes' ? true : false,
          );
          GoldenRaspberryAwardsMovies.push(movie);
        })
        .on('end', async () => {
          await this.goldenRaspberryAwardsRepository.save(
            GoldenRaspberryAwardsMovies,
          );
          resolve();
        })
        .on('error', (error) => {
          rejects(error);
        });
    });
  }
}
