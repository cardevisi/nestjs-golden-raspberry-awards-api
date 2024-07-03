import { Body, Injectable } from '@nestjs/common';
import { CreateGoldenRaspberryAwardDto } from './dto/create-golden-raspberry-award.dto';
import { UpdateGoldenRaspberryAwardDto } from './dto/update-golden-raspberry-award.dto';
import { Repository } from 'typeorm';
import { GoldenRaspberryAward } from './entities/golden-raspberry-award.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GoldenRaspberryAwardsService {
  constructor(
    @InjectRepository(GoldenRaspberryAward)
    private goldenRaspberryAwardRepository: Repository<GoldenRaspberryAward>,
  ) {}

  create(createGoldenRaspberryAwardDto: CreateGoldenRaspberryAwardDto) {
    const goldenRaspberryAward = new GoldenRaspberryAward(
      createGoldenRaspberryAwardDto.id,
      createGoldenRaspberryAwardDto.year,
      createGoldenRaspberryAwardDto.title,
      createGoldenRaspberryAwardDto.studios,
      createGoldenRaspberryAwardDto.producers,
      createGoldenRaspberryAwardDto.winner,
    );
    return this.goldenRaspberryAwardRepository.save(goldenRaspberryAward);
  }

  findAll() {
    return this.goldenRaspberryAwardRepository.find();
  }

  findOne(id: string) {
    return this.goldenRaspberryAwardRepository.findOne({ where: { id } });
  }

  update(
    id: string,
    updateGoldenRaspberryAwardDto: UpdateGoldenRaspberryAwardDto,
  ) {
    return this.goldenRaspberryAwardRepository.update(
      id,
      updateGoldenRaspberryAwardDto,
    );
  }

  remove(id: string) {
    return this.goldenRaspberryAwardRepository.delete(id);
  }
}
