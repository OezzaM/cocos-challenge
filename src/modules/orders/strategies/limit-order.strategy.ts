import { Injectable } from '@nestjs/common';
import { OrderStrategy } from './order-strategy.interface';
import { CreateOrderDto } from '../dto/create-order.dto';
import { StatusType } from 'src/interfaces/enum';

@Injectable()
export class LimitOrderStrategy implements OrderStrategy {
  resolvePrice(dto: CreateOrderDto): Promise<number> {
    return Promise.resolve(dto.price);
  }

  resolveStatus(): StatusType {
    return StatusType.NEW;
  }
}
