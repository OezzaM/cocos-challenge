import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user';
import { Instrument } from './instrument';
import { OrderType, SideType, StatusType } from 'src/interfaces/enum';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'instrumentid' })
  instrumentId: number;

  @Column({ name: 'userid' })
  userId: number;

  @Column({
    type: 'enum',
    enum: SideType,
    nullable: true,
  })
  side: SideType;

  @Column('int')
  size: number;

  @Column('numeric', { precision: 10, scale: 2 })
  price: number;

  @Column({
    type: 'enum',
    enum: OrderType,
    nullable: true,
  })
  type: OrderType;

  @Column({
    type: 'enum',
    enum: StatusType,
    nullable: true,
  })
  status: StatusType;

  @CreateDateColumn({ type: 'timestamp' })
  datetime: Date;

  @ManyToOne(() => Instrument, (instrument) => instrument.orders)
  @JoinColumn({ name: 'instrumentid' })
  instrument: Instrument;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'userid' })
  user: User;
}
