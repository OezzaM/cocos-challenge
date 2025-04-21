import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ORM_CONFIG } from './constants/ormConfig';
import { OrderModule } from './modules/orders/order.module';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { Order } from './entities/order';
import { MarketData } from './entities/marketData';
import { InstrumentModule } from './modules/instrument/instrument.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ORM_CONFIG),
    TypeOrmModule.forFeature([Order, MarketData]),
    OrderModule,
    PortfolioModule,
    InstrumentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
