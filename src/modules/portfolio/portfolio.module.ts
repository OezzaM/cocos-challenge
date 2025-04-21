import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { OrderModule } from '../orders/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketModule } from '../market/market.module';
import { Order } from 'src/entities/order';

@Module({
  imports: [OrderModule, MarketModule, TypeOrmModule.forFeature([Order])],
  controllers: [PortfolioController],
  providers: [PortfolioService],
})
export class PortfolioModule {}
