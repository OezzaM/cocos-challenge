import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from 'src/entities/order';
import { StatusType } from 'src/interfaces/enum';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStrategyFactory } from './factories/order-strategy.factory';
import { OrderFactory } from './factories/order.factory';
import { InstrumentService } from '../instrument/instrument.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    private readonly strategyFactory: OrderStrategyFactory,
    private readonly instrumentService: InstrumentService,
  ) {}

  public async getFilledOrdersByUserId(userId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: {
        user: { id: userId },
        status: StatusType.FILLED,
      },
      relations: ['instrument', 'user'],
    });
  }

  async createOrder(userId: number, dto: CreateOrderDto): Promise<Order> {
    const instrument = await this.instrumentService.findInstrumentById(
      dto.instrumentId,
    );

    const strategy = this.strategyFactory.getStrategy(dto.type);
    const resolvedPrice = await strategy.resolvePrice(dto, instrument);
    const status = strategy.resolveStatus();

    const orderBuild = OrderFactory.build(
      userId,
      instrument,
      dto,
      resolvedPrice,
      status,
    );

    console.log(orderBuild);
    const order = this.orderRepository.create(orderBuild);

    return this.orderRepository.save(order);
  }
}
