import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateMovieUseCase } from './../src/golden-raspberry-awards/use-cases/create-movie';
import csvParser from 'csv-parser';
import fs from 'fs';
import path from 'path';

async function readCsvFile(filePath: string): Promise<any[]> {
  const results = [];
  return await new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csvParser({ strict: true, separator: ';' }))
      .on('data', (data) => {
        results.push(data);
        resolve(results);
      })
      .on('error', (error) => {
        reject(error);
      })
      .on('end', () => {
        resolve(results);
      });
  });
}

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createGolden: CreateMovieUseCase;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const projectRoot = process.cwd();
    const csvFilePath = path.join(projectRoot, 'movielist.csv');
    const readResult = await readCsvFile(csvFilePath);

    createGolden = moduleFixture.get<CreateMovieUseCase>(CreateMovieUseCase);
    readResult.forEach((movie) => {
      const producers = movie.producers.split(/,|and/g);
      producers.forEach(async (producer: string) => {
        if (producer.trim() === '') return;
        await createGolden.execute({
          id: movie.id,
          year: movie.year,
          title: movie.title,
          studios: movie.studios,
          producer: producer.trim(),
          winner: movie.winner === 'yes' ? true : false,
        });
      });
    });
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/movie-awards/producer-interval-between-awards')
      .expect(200)
      .expect({
        min: [
          {
            producer: 'Joel Silver',
            interval: 1,
            previousWin: 1990,
            followingWin: 1991,
          },
        ],
        max: [
          {
            producer: 'Matthew Vaughn',
            interval: 13,
            previousWin: 2002,
            followingWin: 2015,
          },
        ],
      });
  });
});
