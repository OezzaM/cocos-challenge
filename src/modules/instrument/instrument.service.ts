import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Instrument } from 'src/entities/instrument';

@Injectable()
export class InstrumentService {
  constructor(
    @InjectRepository(Instrument)
    private readonly instrumentRepository: Repository<Instrument>,
  ) {}

  async searchInstruments(query: string): Promise<Instrument[]> {
    return this.instrumentRepository.find({
      where: [{ ticker: ILike(`%${query}%`) }, { name: ILike(`%${query}%`) }],
    });
  }

  async findInstrumentById(id: number): Promise<Instrument> {
    const instrument = await this.instrumentRepository.findOne({
      where: { id },
    });
    if (!instrument) {
      throw new NotFoundException('Instrument not found');
    }

    return instrument;
  }
}
