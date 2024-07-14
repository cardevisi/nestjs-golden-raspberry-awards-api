import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateMovieDto } from './dto/create-movie.dto';
import { CreateMovieUseCase } from './use-cases/create-movie';
import { FindAllMoviesUseCase } from './use-cases/find-all-movies';
import { FindOneGoldenRaspBarrelAwardUseCase } from './use-cases/find-one-movies';
import { RemoveMovieUseCase } from './use-cases/remove-movie';
import { UpdateMovieUseCase } from './use-cases/update-movie';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { GetProducersWithMinMaxIntervalAwatdsUseCase } from './use-cases/get-producer-with-min-max-interval-between-awards';

@Controller('movie-awards')
export class MoviesController {
  constructor(
    private readonly createMoviesUseCase: CreateMovieUseCase,
    private readonly findAllMoviesUseCase: FindAllMoviesUseCase,
    private readonly findOneMoviesUseCase: FindOneGoldenRaspBarrelAwardUseCase,
    private readonly removeMoviesUseCase: RemoveMovieUseCase,
    private readonly updateMoviesUseCase: UpdateMovieUseCase,
    private readonly getProductMinMaxUseCase: GetProducersWithMinMaxIntervalAwatdsUseCase,
  ) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.createMoviesUseCase.execute(createMovieDto);
  }

  @Get()
  findAll() {
    return this.findAllMoviesUseCase.execute();
  }

  @Get('interval-between-awards')
  getProducerLongerIntervalBetweenAwards() {
    return this.getProductMinMaxUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOneMoviesUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.updateMoviesUseCase.execute(id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeMoviesUseCase.execute(id);
  }
}
