import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Movies } from '../entities/movies.entity';
import csvParser from 'csv-parser';
import * as fs from 'fs';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ImportCsvService {
  constructor(
    @InjectRepository(Movies)
    private readonly moviesRepository: Repository<Movies>,
  ) {}

  async importCsv(filePath: string): Promise<void> {
    const MovieList: Movies[] = [];

    return new Promise((resolve, rejects) => {
      fs.createReadStream(filePath)
        .pipe(csvParser({ strict: true, separator: ';' }))
        .on('data', (data) => {
          const producers = data.producers.split(/,|and/g);
          producers.map((producer: string) => {
            if (producer.trim() === '') return;
            const producerName = producer.trim();
            const movies = new Movies(
              data.id,
              data.year,
              data.title,
              data.studios,
              producerName,
              data.winner === 'yes' ? true : false,
            );
            MovieList.push(movies);
          });
        })
        .on('end', async () => {
          await this.moviesRepository.save(MovieList);
          resolve();
        })
        .on('error', (error) => {
          rejects(error);
        });
    });
  }
}
