import { Column, Entity, PrimaryColumn } from 'typeorm';
import crypto from 'crypto';

@Entity('movies')
export class Movies {
  @PrimaryColumn()
  id: string;

  @Column()
  year: number;

  @Column()
  title: string;

  @Column()
  studios: string;

  @Column()
  producer: string;

  @Column()
  winner: boolean;

  constructor(
    id: string,
    year: number,
    title: string,
    studios: string,
    producer: string,
    winner: boolean,
  ) {
    this.id = id ?? crypto.randomUUID();
    this.year = year;
    this.title = title;
    this.studios = studios;
    this.producer = producer;
    this.winner = winner;
  }
}
