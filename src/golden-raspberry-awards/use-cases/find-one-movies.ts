import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Movies } from '../entities/movies.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IMoviesRepository } from './golden-raspberry-awards.typeorm.repository';

@Injectable()
export class FindOneGoldenRaspBarrelAwardUseCase {
  constructor(
    @Inject('IMoviesRepository')
    private readonly findOneMoviesRepository: IMoviesRepository,
  ) {}

  execute(id: string) {
    return this.findOneMoviesRepository.findOne(id);
  }
}
