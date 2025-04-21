import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MarketData } from 'src/entities/marketData';
import { LatestPrice } from 'src/interfaces/latest-price.interface';
import { Repository } from 'typeorm';
@Injectable()
export class MarketService {
  constructor(
    @InjectRepository(MarketData)
    private readonly marketDataRepository: Repository<MarketData>,
  ) {}

  async getLatestPricesForInstruments(instrumentIds: number[]) {
    const data = await this.marketDataRepository
      .createQueryBuilder('md')
      .select(['md.instrumentId AS "instrumentId"', 'md.close AS "close"'])
      .where('md.instrumentId IN (:...ids)', { ids: instrumentIds })
      .orderBy('md.date', 'DESC')
      .getRawMany<LatestPrice>();

    const latestPrices = new Map<number, number>();

    for (const { instrumentId, close } of data) {
      if (!latestPrices.has(instrumentId)) {
        latestPrices.set(instrumentId, close);
      }
    }

    return latestPrices;
  }
}
