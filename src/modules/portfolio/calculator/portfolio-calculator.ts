import { Order } from 'src/entities/order';
import { PortfolioStrategy } from './strategies/portfolio.strategy';

export class PortfolioCalculator {
  constructor(private strategies: PortfolioStrategy[]) {}

  async calculate(orders: Order[]) {
    for (const order of orders) {
      this.strategies.forEach((s) => s.process(order));
    }

    const results = await Promise.all(
      this.strategies.map((s) => Promise.resolve(s.getResult())),
    );

    return results.reduce((acc, res) => ({ ...acc, ...res }), {});
  }
}
