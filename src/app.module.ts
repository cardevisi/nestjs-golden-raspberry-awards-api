import { Module } from '@nestjs/common';
import { MoviesModule } from './golden-raspberry-awards/movies.module';
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
    MoviesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
