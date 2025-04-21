import { Injectable } from '@nestjs/common';
import { OrderType } from 'src/interfaces/enum';
import { MarketOrderStrategy } from '../strategies/market-order.strategy';
import { LimitOrderStrategy } from '../strategies/limit-order.strategy';
import { OrderStrategy } from '../strategies/order-strategy.interface';

@Injectable()
export class OrderStrategyFactory {
  constructor(
    private market: MarketOrderStrategy,
    private limit: LimitOrderStrategy,
  ) {}

  getStrategy(type: OrderType): OrderStrategy {
    switch (type) {
      case OrderType.MARKET:
        return this.market;
      case OrderType.LIMIT:
        return this.limit;
      default:
        throw new Error('Order type not supported');
    }
  }
}
