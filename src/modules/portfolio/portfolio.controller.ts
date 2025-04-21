import { Body, Controller, Get, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/entities/user';
import { PortfolioService } from './portfolio.service';

@ApiBearerAuth()
@ApiTags('Portfolio')
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get('/:id')
  @ApiParam({
    type: 'path',
    name: 'id',
    description: 'The id of user',
    schema: { type: 'number' },
  })
  @ApiOperation({
    summary: 'This endpoint get portfolio',
  })
  @ApiResponse({
    status: 200,
    description: 'The portfolio user is: ',
    type: User,
  })
  public getCityByIdAsync(@Param('id') id) {
    return this.portfolioService.getPortfolio(Number(id));
  }
}
