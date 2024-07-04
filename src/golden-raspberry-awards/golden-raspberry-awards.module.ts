import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoldenRaspberryAward } from './entities/golden-raspberry-award.entity';
import { GoldenRaspberryAwardsController } from './golden-raspberry-awards.controller';
import { CreateGoldenRaspberryAwardsUseCase } from './use-cases/create-golden-raspberry-awards';
import { FindAllGoldenRaspberryAwardsUseCase } from './use-cases/find-all-golden-raspberry-awards';
import { ImportCsvService } from './import-csv.service';
import { FindOneGoldenRaspBarrelAwardUseCase } from './use-cases/find-one-golden-raspberry-awards';
import { RemoveGoldenRaspberryAwardsUseCase } from './use-cases/remove-golden-raspberry-awards';
import { UpdateGoldenRaspberryAwardsUseCase } from './use-cases/update-golden-raspberry-awards';
import { GetProducersWithMinMaxIntervalAwatdsUseCase } from './use-cases/get-producers-with-min-max-interval-between-awards';

@Module({
  imports: [TypeOrmModule.forFeature([GoldenRaspberryAward])],
  controllers: [GoldenRaspberryAwardsController],
  providers: [
    ImportCsvService,
    CreateGoldenRaspberryAwardsUseCase,
    FindAllGoldenRaspberryAwardsUseCase,
    FindOneGoldenRaspBarrelAwardUseCase,
    RemoveGoldenRaspberryAwardsUseCase,
    UpdateGoldenRaspberryAwardsUseCase,
    GetProducersWithMinMaxIntervalAwatdsUseCase,
  ],
  exports: [ImportCsvService],
})
export class GoldenRaspberryAwardsModule {}
