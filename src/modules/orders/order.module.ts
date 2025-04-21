import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/order';
import { Instrument } from 'src/entities/instrument';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MarketData } from 'src/entities/marketData';
import { MarketOrderStrategy } from './strategies/market-order.strategy';
import { LimitOrderStrategy } from './strategies/limit-order.strategy';
import { OrderStrategyFactory } from './factories/order-strategy.factory';
import { InstrumentService } from '../instrument/instrument.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Instrument, MarketData])],
  providers: [
    OrderService,
    MarketOrderStrategy,
    LimitOrderStrategy,
    OrderStrategyFactory,
    InstrumentService,
  ],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
