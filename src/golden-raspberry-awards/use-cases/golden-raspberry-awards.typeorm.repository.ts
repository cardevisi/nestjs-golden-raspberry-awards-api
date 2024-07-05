import { InjectRepository } from '@nestjs/typeorm';
import { GoldenRaspberryAward } from '../entities/golden-raspberry-award.entity';
import { Repository } from 'typeorm';

export interface IGoldenRaspberryAwardsRepository {
  findAll(): Promise<GoldenRaspberryAward[]>;
  findOne(id: string): Promise<GoldenRaspberryAward>;
  create(input: GoldenRaspberryAward): Promise<GoldenRaspberryAward>;
  update(id: string, input: GoldenRaspberryAward): Promise<void>;
  remove(id: string): Promise<void>;
  query(query: string): Promise<any>;
}

export class GoldenRaspberryAwardsTypeOrmRepository
  implements IGoldenRaspberryAwardsRepository
{
  constructor(
    @InjectRepository(GoldenRaspberryAward)
    private readonly goldenRaspberryAwardRepository: Repository<GoldenRaspberryAward>,
  ) {}

  async query(query: string): Promise<any> {
    return await this.goldenRaspberryAwardRepository.query(query);
  }
  async findAll(): Promise<GoldenRaspberryAward[]> {
    return await this.goldenRaspberryAwardRepository.find();
  }
  async findOne(id: string): Promise<GoldenRaspberryAward> {
    return await this.goldenRaspberryAwardRepository.findOne({
      where: { id },
    });
  }
  async create(input: GoldenRaspberryAward): Promise<GoldenRaspberryAward> {
    return await this.goldenRaspberryAwardRepository.save(input);
  }
  async update(id: string, input: GoldenRaspberryAward): Promise<any> {
    return await this.goldenRaspberryAwardRepository.update(id, input);
  }
  async remove(id: string): Promise<any> {
    return await this.goldenRaspberryAwardRepository.delete(id);
  }
}
