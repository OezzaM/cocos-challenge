import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketService } from './market.service';
import { MarketData } from 'src/entities/marketData';

@Module({
  imports: [TypeOrmModule.forFeature([MarketData])],
  providers: [MarketService],
  exports: [MarketService],
})
export class MarketModule {}
