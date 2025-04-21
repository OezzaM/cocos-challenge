import { Order } from 'src/entities/order';
import { InstrumentType, SideType } from 'src/interfaces/enum';
import { PortfolioStrategy } from './portfolio.strategy';

export class CashStrategy implements PortfolioStrategy {
  private cash = 0;

  process(order: Order): void {
    const { side, price, size, instrument } = order;

    if (instrument.type === InstrumentType.MONEDA) {
      const value = Number(price) * size;
      if (side === SideType.CASH_IN || side === SideType.SELL) {
        this.cash += value;
      } else if (side === SideType.CASH_OUT || side === SideType.BUY) {
        this.cash -= value;
      }
    }
  }

  getResult(): Record<string, unknown> {
    return { availableCash: Number(this.cash.toFixed(2)) };
  }
}
