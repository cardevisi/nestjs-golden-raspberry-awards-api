import { InjectRepository } from '@nestjs/typeorm';
import { Movies } from '../entities/movies.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';

export interface IMoviesRepository {
  queryBuilder(alias?: string): SelectQueryBuilder<any>;
  findAll(): Promise<Movies[]>;
  findOne(id: string): Promise<Movies>;
  create(input: Movies): Promise<Movies>;
  update(id: string, input: Movies): Promise<void>;
  remove(id: string): Promise<void>;
  query(query: string): Promise<any>;
}

export class MoviesTypeOrmRepository implements IMoviesRepository {
  constructor(
    @InjectRepository(Movies)
    private readonly moviesRepository: Repository<Movies>,
  ) {}

  queryBuilder(alias: string): SelectQueryBuilder<any> {
    return this.moviesRepository.createQueryBuilder(alias);
  }

  async query(query: string): Promise<any> {
    return await this.moviesRepository.query(query);
  }
  async findAll(): Promise<Movies[]> {
    return await this.moviesRepository.find();
  }
  async findOne(id: string): Promise<Movies> {
    return await this.moviesRepository.findOne({
      where: { id },
    });
  }
  async create(input: Movies): Promise<Movies> {
    return await this.moviesRepository.save(input);
  }
  async update(id: string, input: Movies): Promise<any> {
    return await this.moviesRepository.update(id, input);
  }
  async remove(id: string): Promise<any> {
    return await this.moviesRepository.delete(id);
  }
}
