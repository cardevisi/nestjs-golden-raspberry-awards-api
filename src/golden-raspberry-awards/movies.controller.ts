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
import { GetProducerIntervalBetweenAwardsUseCase } from './use-cases/get-producer-interval-between-awards';

@Controller('movie-awards')
export class MoviesController {
  constructor(
    private readonly createMoviesUseCase: CreateMovieUseCase,
    private readonly findAllMoviesUseCase: FindAllMoviesUseCase,
    private readonly findOneMoviesUseCase: FindOneGoldenRaspBarrelAwardUseCase,
    private readonly removeMoviesUseCase: RemoveMovieUseCase,
    private readonly updateMoviesUseCase: UpdateMovieUseCase,
    private readonly getProducerIntetrvalBetweenAwardsUseCase: GetProducerIntervalBetweenAwardsUseCase,
  ) {}

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto) {
    return await this.createMoviesUseCase.execute(createMovieDto);
  }

  @Get()
  async findAll() {
    return await this.findAllMoviesUseCase.execute();
  }

  @Get('producer-interval-between-awards')
  async getProducerLongerIntervalBetweenAwards() {
    return await this.getProducerIntetrvalBetweenAwardsUseCase.execute();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.findOneMoviesUseCase.execute(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return await this.updateMoviesUseCase.execute(id, updateMovieDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.removeMoviesUseCase.execute(id);
  }
}
