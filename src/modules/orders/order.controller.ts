import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ValidateCreateOrderPipe } from './pipes/validate-buy-order.pipe';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateOrderSwagger } from './docs/order-swagger.docs';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({
    summary: CreateOrderSwagger.summary,
    description: CreateOrderSwagger.description,
  })
  @ApiResponse(CreateOrderSwagger.okResponse)
  @ApiResponse(CreateOrderSwagger.badRequestResponse)
  @ApiResponse(CreateOrderSwagger.notFoundResponse)
  @Post()
  @UsePipes(ValidateCreateOrderPipe)
  async createOrder(@Body() dto: CreateOrderDto) {
    const userId = dto.userId;
    const order = await this.orderService.createOrder(userId, dto);
    return { message: 'Order created', order };
  }
}
