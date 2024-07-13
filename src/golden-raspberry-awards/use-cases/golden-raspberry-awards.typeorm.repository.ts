import { InjectRepository } from '@nestjs/typeorm';
import { Movies } from '../entities/movies.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';

export interface IGoldenRaspberryAwardsRepository {
  queryBuilder(alias?: string): SelectQueryBuilder<any>;
  findAll(): Promise<Movies[]>;
  findOne(id: string): Promise<Movies>;
  create(input: Movies): Promise<Movies>;
  update(id: string, input: Movies): Promise<void>;
  remove(id: string): Promise<void>;
  query(query: string): Promise<any>;
}

export class GoldenRaspberryAwardsTypeOrmRepository
  implements IGoldenRaspberryAwardsRepository
{
  constructor(
    @InjectRepository(Movies)
    private readonly goldenRaspberryAwardRepository: Repository<Movies>,
  ) {}

  queryBuilder(alias: string): SelectQueryBuilder<any> {
    return this.goldenRaspberryAwardRepository.createQueryBuilder(alias);
  }

  async query(query: string): Promise<any> {
    return await this.goldenRaspberryAwardRepository.query(query);
  }
  async findAll(): Promise<Movies[]> {
    return await this.goldenRaspberryAwardRepository.find();
  }
  async findOne(id: string): Promise<Movies> {
    return await this.goldenRaspberryAwardRepository.findOne({
      where: { id },
    });
  }
  async create(input: Movies): Promise<Movies> {
    return await this.goldenRaspberryAwardRepository.save(input);
  }
  async update(id: string, input: Movies): Promise<any> {
    return await this.goldenRaspberryAwardRepository.update(id, input);
  }
  async remove(id: string): Promise<any> {
    return await this.goldenRaspberryAwardRepository.delete(id);
  }
}
