import { Order } from 'src/entities/order';
import { Instrument } from 'src/entities/instrument';
import { CreateOrderDto } from '../dto/create-order.dto';
import { StatusType } from 'src/interfaces/enum';
import { User } from 'src/entities/user';

export class OrderFactory {
  static build(
    userId: number,
    instrument: Instrument,
    dto: CreateOrderDto,
    price: number,
    status: StatusType,
  ): Partial<Order> {
    const { size, type, side } = dto;
    return {
      user: { id: userId } as User,
      instrument,
      size,
      type,
      side,
      status,
      price,
    };
  }
}
