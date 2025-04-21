import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderStrategy } from './order-strategy.interface';
import { CreateOrderDto } from '../dto/create-order.dto';
import { MarketData } from 'src/entities/marketData';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StatusType } from 'src/interfaces/enum';

@Injectable()
export class MarketOrderStrategy implements OrderStrategy {
  constructor(
    @InjectRepository(MarketData)
    private readonly marketDataRepository: Repository<MarketData>,
  ) {}

  async resolvePrice(dto: CreateOrderDto): Promise<number> {
    const latestMarketData = await this.marketDataRepository.findOne({
      where: { instrument: { id: dto.instrumentId } },
      order: { date: 'DESC' },
    });

    if (!latestMarketData) {
      throw new NotFoundException(
        'There is no market data for this instrument',
      );
    }

    return Number(latestMarketData.close);
  }
  resolveStatus(): StatusType {
    return StatusType.FILLED;
  }
}
