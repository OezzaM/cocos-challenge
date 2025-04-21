import { Controller, Get, Query } from '@nestjs/common';
import { InstrumentService } from './instrument.service';
import { SearchQueryDto } from './dto/search-query.dto';
import { ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SearchInstrumentsSwagger } from './docs/instrument-swagger.docs';

@Controller('instruments')
export class InstrumentController {
  constructor(private readonly instrumentService: InstrumentService) {}

  @Get('search')
  @ApiOperation({
    summary: SearchInstrumentsSwagger.summary,
    description: SearchInstrumentsSwagger.description,
  })
  @ApiResponse(SearchInstrumentsSwagger.okResponse)
  @ApiResponse(SearchInstrumentsSwagger.badRequestResponse)
  async search(@Query(ValidationPipe) query: SearchQueryDto) {
    const { query: searchQuery } = query;
    const results = await this.instrumentService.searchInstruments(searchQuery);
    return { results };
  }
}
