import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MarketData } from './marketData';
import { Order } from './order';
import { InstrumentType } from 'src/interfaces/enum';

@Entity('instruments')
export class Instrument {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ticker: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: InstrumentType,
    nullable: true,
  })
  type: InstrumentType;

  @OneToMany(() => Order, (order) => order.instrument)
  orders: Order[];

  @OneToMany(() => MarketData, (data) => data.instrument)
  marketData: MarketData[];
}
