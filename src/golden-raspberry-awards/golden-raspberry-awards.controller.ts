import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateGoldenRaspberryAwardDto } from './dto/create-golden-raspberry-award.dto';
import { CreateGoldenRaspberryAwardsUseCase } from './use-cases/create-golden-raspberry-awards';
import { FindAllGoldenRaspberryAwardsUseCase } from './use-cases/find-all-golden-raspberry-awards';
import { FindOneGoldenRaspBarrelAwardUseCase } from './use-cases/find-one-golden-raspberry-awards';
import { RemoveGoldenRaspberryAwardsUseCase } from './use-cases/remove-golden-raspberry-awards';
import { UpdateGoldenRaspberryAwardsUseCase } from './use-cases/update-golden-raspberry-awards';
import { UpdateGoldenRaspberryAwardDto } from './dto/update-golden-raspberry-award.dto';
import { GetProducersWithMinMaxIntervalAwatdsUseCase } from './use-cases/get-producers-with-min-max-interval-between-awards';

@Controller('golden-raspberry-awards')
export class GoldenRaspberryAwardsController {
  constructor(
    private readonly createGoldenRaspberryAwardsUseCase: CreateGoldenRaspberryAwardsUseCase,
    private readonly findAllGoldenRaspberryAwardsUseCase: FindAllGoldenRaspberryAwardsUseCase,
    private readonly findOneGoldenRaspberryAwardsUseCase: FindOneGoldenRaspBarrelAwardUseCase,
    private readonly removeGoldenRaspberryAwardsUseCase: RemoveGoldenRaspberryAwardsUseCase,
    private readonly updateGoldenRaspberryAwardsUseCase: UpdateGoldenRaspberryAwardsUseCase,
    private readonly getProductMinMaxUseCase: GetProducersWithMinMaxIntervalAwatdsUseCase,
  ) {}

  @Post()
  create(@Body() createGoldenRaspberryAwardDto: CreateGoldenRaspberryAwardDto) {
    return this.createGoldenRaspberryAwardsUseCase.execute(
      createGoldenRaspberryAwardDto,
    );
  }

  @Get()
  findAll() {
    return this.findAllGoldenRaspberryAwardsUseCase.execute();
  }

  @Get('get-producer-longer-interval-between-awards')
  getProducerLongerIntervalBetweenAwards() {
    return this.getProductMinMaxUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOneGoldenRaspberryAwardsUseCase.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGoldenRaspberryAwardDto: UpdateGoldenRaspberryAwardDto,
  ) {
    return this.updateGoldenRaspberryAwardsUseCase.execute(
      id,
      updateGoldenRaspberryAwardDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeGoldenRaspberryAwardsUseCase.execute(id);
  }
}
