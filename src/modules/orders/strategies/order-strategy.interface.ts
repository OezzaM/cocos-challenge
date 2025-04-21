import { StatusType } from 'src/interfaces/enum';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Instrument } from 'src/entities/instrument';

export interface OrderStrategy {
  resolvePrice(dto: CreateOrderDto, instrument: Instrument): Promise<number>;
  resolveStatus(): StatusType;
}
