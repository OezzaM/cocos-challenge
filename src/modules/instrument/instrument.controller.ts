import { Controller, Get, Query } from '@nestjs/common';
import { InstrumentService } from './instrument.service';
import { SearchQueryDto } from './dto/search-query.dto';
import { ValidationPipe } from '@nestjs/common';

@Controller('instruments')
export class InstrumentController {
  constructor(private readonly instrumentService: InstrumentService) {}

  @Get('search')
  async search(@Query(ValidationPipe) query: SearchQueryDto) {
    const { query: searchQuery } = query;
    const results = await this.instrumentService.searchInstruments(searchQuery);
    return { results };
  }
}
