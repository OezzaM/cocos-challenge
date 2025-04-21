import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Instrument } from './instrument';

@Entity('marketdata')
export class MarketData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'instrumentid' })
  instrumentId: number;

  @Column('decimal')
  high: number;

  @Column('decimal')
  low: number;

  @Column('decimal')
  open: number;

  @Column('decimal')
  close: number;

  @Column('decimal')
  previousclose: number;

  @Column()
  date: Date;

  @ManyToOne(() => Instrument, (instrument) => instrument.marketData)
  @JoinColumn({ name: 'instrumentid' })
  instrument: Instrument;
}
