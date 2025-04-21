import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderService } from '../orders/order.service';
import { MarketService } from '../market/market.service';
import { PortfolioStrategy } from './calculator/strategies/portfolio.strategy';
import { PortfolioCalculator } from './calculator/portfolio-calculator';
import { CashStrategy } from './calculator/strategies/cash.strategy';
import { EquityStrategy } from './calculator/strategies/equity.strategy';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user';
import { Repository } from 'typeorm';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly orderService: OrderService,
    private readonly marketService: MarketService,
  ) {}

  public async getPortfolio(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

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
