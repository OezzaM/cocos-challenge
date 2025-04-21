import { Injectable } from '@nestjs/common';
import { OrderService } from '../orders/order.service';
import { MarketService } from '../market/market.service';
import { PortfolioStrategy } from './calculator/strategies/portfolio.strategy';
import { PortfolioCalculator } from './calculator/portfolio-calculator';
import { CashStrategy } from './calculator/strategies/cash.strategy';
import { EquityStrategy } from './calculator/strategies/equity.strategy';

@Injectable()
export class PortfolioService {
  constructor(
    private readonly orderService: OrderService,
    private readonly marketService: MarketService,
  ) {}

  public async getPortfolio(userId: number) {
    const orders = await this.orderService.getFilledOrdersByUserId(userId);

    const strategies: PortfolioStrategy[] = [
      new CashStrategy(),
      new EquityStrategy(this.marketService),
    ];

    const calculator = new PortfolioCalculator(strategies);
    const result = await calculator.calculate(orders);

    return {
      portfolioValue: result,
      message: 'Calculated',
    };
  }
}
