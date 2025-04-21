import { PortfolioStrategy } from './portfolio.strategy';
import { Order } from 'src/entities/order';
import { InstrumentType, SideType } from 'src/interfaces/enum';
import { MarketService } from 'src/modules/market/market.service';

export class EquityStrategy implements PortfolioStrategy {
  private positions = new Map<number, { size: number; invested: number }>();

  constructor(private readonly marketService: MarketService) {}

  process(order: Order): void {
    const { instrument, size, price, side } = order;
    if (instrument.type === InstrumentType.MONEDA) return;

    const value = Number(price) * size;

    const existing = this.positions.get(instrument.id) || {
      size: 0,
      invested: 0,
    };

    if (side === SideType.BUY) {
      existing.size += size;
      existing.invested += value;
    } else if (side === SideType.SELL) {
      existing.size -= size;
      existing.invested -= value;
    }

    this.positions.set(instrument.id, existing);
  }

  async getResult(): Promise<Record<string, unknown>> {
    const instrumentIds = Array.from(this.positions.keys());
    const prices =
      await this.marketService.getLatestPricesForInstruments(instrumentIds);

    const positions = [];
    let totalValue = 0;

    for (const [id, data] of this.positions.entries()) {
      if (data.size <= 0) continue;

      const priceClose = prices.get(id);
      if (!priceClose) continue;

      const currentValue = priceClose * data.size;
      const performance =
        data.invested > 0
          ? ((currentValue - data.invested) / data.invested) * 100
          : 0;

      totalValue += currentValue;

      positions.push({
        instrumentId: id,
        ...data,
        currentValue,
        performance: Number(performance.toFixed(2)),
      });
    }

    return {
      positions,
      totalValue: Number(totalValue.toFixed(2)),
    };
  }
}
