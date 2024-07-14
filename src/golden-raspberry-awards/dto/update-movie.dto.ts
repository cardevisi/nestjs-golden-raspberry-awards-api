import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  id: string;
  year: number;
  title: string;
  studios: string;
  producer: string;
  winner: boolean;
}
