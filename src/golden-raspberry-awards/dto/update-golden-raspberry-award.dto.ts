import { PartialType } from '@nestjs/mapped-types';
import { CreateGoldenRaspberryAwardDto } from './create-golden-raspberry-award.dto';

export class UpdateGoldenRaspberryAwardDto extends PartialType(
  CreateGoldenRaspberryAwardDto,
) {
  id: string;
  year: number;
  title: string;
  studios: string;
  producers: string;
  winner: boolean;
}
