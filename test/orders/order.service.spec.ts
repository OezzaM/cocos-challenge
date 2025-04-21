import { Test, TestingModule } from '@nestjs/testing';
import { Order } from 'src/entities/order';
import { OrderType, SideType } from 'src/interfaces/enum';
import { OrderService } from 'src/modules/orders/order.service';
import { OrderStrategyFactory } from 'src/modules/orders/factories/order-strategy.factory';
import { InstrumentService } from 'src/modules/instrument/instrument.service';

describe('OrderService', () => {
  let orderService: OrderService;
  let instrumentService: InstrumentService;
  let mockOrderStrategyFactory: Partial<OrderStrategyFactory>;

  beforeEach(async () => {
    const mockOrderRepository = {
      create: jest.fn().mockResolvedValue(new Order()),
      save: jest.fn().mockResolvedValue(new Order()),
    };

    const mockInstrumentRepository = {
      findOne: jest.fn().mockResolvedValue({
        id: 1,
        name: 'Instrument 1',
      }),
    };

    mockOrderStrategyFactory = {
      getStrategy: jest.fn().mockReturnValue({
        resolvePrice: jest.fn().mockReturnValue(10),
        resolveStatus: jest.fn().mockReturnValue('created'),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        InstrumentService,
        { provide: 'OrderRepository', useValue: mockOrderRepository },
        { provide: 'InstrumentRepository', useValue: mockInstrumentRepository },
        { provide: OrderStrategyFactory, useValue: mockOrderStrategyFactory },
      ],
    }).compile();

    orderService = module.get<OrderService>(OrderService);
    instrumentService = module.get<InstrumentService>(InstrumentService);
  });

  it('should be defined', () => {
    expect(orderService).toBeDefined();
    expect(instrumentService).toBeDefined();
  });

  it('should create a new order with type: LIMIT and PRICE', async () => {
    const newOrder = await orderService.createOrder(1, {
      size: 1,
      type: OrderType.LIMIT,
      side: SideType.BUY,
      price: 10,
      instrumentId: 1,
      userId: 1,
    });
    expect(newOrder).toBeDefined();
    expect(newOrder).toBeInstanceOf(Order);
  });

  it('should create a new order with type: MARKET', async () => {
    const newOrder = await orderService.createOrder(1, {
      size: 1,
      type: OrderType.MARKET,
      side: SideType.BUY,
      instrumentId: 1,
      userId: 1,
    });
    expect(newOrder).toBeDefined();
    expect(newOrder).toBeInstanceOf(Order);
  });
});
