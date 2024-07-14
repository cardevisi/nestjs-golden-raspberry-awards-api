import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movies } from './entities/movies.entity';
import { MoviesController } from './movies.controller';
import { CreateMovieUseCase } from './use-cases/create-movie';
import { FindAllMoviesUseCase } from './use-cases/find-all-movies';
import { ImportCsvService } from './infra/import-csv.service';
import { FindOneMovieUseCase } from './use-cases/find-one-movies';
import { GetProducerIntervalBetweenAwardsUseCase } from './use-cases/get-producer-interval-between-awards';
import { MoviesTypeOrmRepository } from './use-cases/golden-raspberry-awards.typeorm.repository';
import { RemoveMovieUseCase } from './use-cases/remove-movie';
import { UpdateMovieUseCase } from './use-cases/update-movie';

@Module({
  imports: [TypeOrmModule.forFeature([Movies])],
  controllers: [MoviesController],
  providers: [
    ImportCsvService,
    CreateMovieUseCase,
    FindAllMoviesUseCase,
    FindOneMovieUseCase,
    RemoveMovieUseCase,
    UpdateMovieUseCase,
    GetProducerIntervalBetweenAwardsUseCase,
    MoviesTypeOrmRepository,
    {
      provide: 'IMoviesRepository',
      useExisting: MoviesTypeOrmRepository,
    },
  ],
  exports: [ImportCsvService, MoviesTypeOrmRepository],
})
export class MoviesModule {}
