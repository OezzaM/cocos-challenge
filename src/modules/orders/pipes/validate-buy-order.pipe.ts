import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderType, SideType } from 'src/interfaces/enum';

@Injectable()
export class ValidateCreateOrderPipe implements PipeTransform {
  transform(value: CreateOrderDto) {
    if (
      value.side === SideType.BUY &&
      value.type === OrderType.MARKET &&
      value.price !== undefined
    ) {
      throw new BadRequestException(
        'Price cannot be sent for MARKET orders of type BUY.',
      );
    }

    if (
      value.side === SideType.BUY &&
      value.type === OrderType.LIMIT &&
      (value.price === null || value.price === undefined)
    ) {
      throw new BadRequestException(
        'The price is mandatory for LIMIT orders of type BUY.',
      );
    }

    return value;
  }
}
