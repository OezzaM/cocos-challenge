import { Body, Controller, Get, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PortfolioService } from './portfolio.service';
import { GetPortfolioSwagger } from './docs/portfolio-swagger.docs';

@ApiBearerAuth()
@ApiTags('Portfolio')
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get('/:id')
  @ApiOperation({
    summary: GetPortfolioSwagger.summary,
    description: GetPortfolioSwagger.description,
  })
  @ApiResponse(GetPortfolioSwagger.okResponse)
  @ApiResponse(GetPortfolioSwagger.badRequestResponse)
  @ApiResponse(GetPortfolioSwagger.notFoundResponse)
  @ApiParam({
    type: 'path',
    name: 'id',
    description: 'The id of user',
    schema: { type: 'number' },
  })
  public getCityByIdAsync(@Param('id') id) {
    return this.portfolioService.getPortfolio(Number(id));
  }
}
