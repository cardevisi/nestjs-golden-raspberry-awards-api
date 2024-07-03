import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoldenRaspberryAwardsModule } from './golden-raspberry-awards/golden-raspberry-awards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoldenRaspberryAward } from './golden-raspberry-awards/entities/golden-raspberry-award.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [GoldenRaspberryAward],
      synchronize: true,
    }),
    GoldenRaspberryAwardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
