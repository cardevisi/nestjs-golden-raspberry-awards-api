import { Column, Entity, PrimaryColumn } from 'typeorm';
import crypto from 'crypto';

@Entity('golden_raspberry_awards')
export class GoldenRaspberryAward {
  @PrimaryColumn()
  id: string;

  @Column()
  year: string;

  @Column()
  title: string;

  @Column()
  studios: string;

  @Column()
  producers: string;

  @Column()
  winner: boolean;

  constructor(
    id: string,
    year: string,
    title: string,
    studios: string,
    producers: string,
    winner: boolean,
  ) {
    this.id = id ?? crypto.randomUUID();
    this.year = year;
    this.title = title;
    this.studios = studios;
    this.producers = producers;
    this.winner = winner;
  }
}
