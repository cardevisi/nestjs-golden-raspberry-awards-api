import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoldenRaspberryAwardsModule } from './golden-raspberry-awards/golden-raspberry-awards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movies } from './golden-raspberry-awards/entities/movies.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [Movies],
      synchronize: true,
    }),
    GoldenRaspberryAwardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
