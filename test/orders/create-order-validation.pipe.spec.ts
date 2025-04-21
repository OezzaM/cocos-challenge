import { BadRequestException } from '@nestjs/common';
import { OrderType, SideType } from 'src/interfaces/enum';
import { ValidateCreateOrderPipe } from 'src/modules/orders/pipes/validate-buy-order.pipe';

describe('CreateOrderValidationPipe', () => {
  let pipe: ValidateCreateOrderPipe;
  beforeEach(() => {
    pipe = new ValidateCreateOrderPipe();
  });

  it('should pass validation for a valid LIMIT order', () => {
    const dto = {
      size: 1,
      type: OrderType.LIMIT,
      side: SideType.BUY,
      price: 10,
      instrumentId: 1,
      userId: 1,
    };
    expect(pipe.transform(dto)).toEqual(dto);
  });

  it('should pass validation for a valid MARKET order (no price)', () => {
    const dto = {
      size: 1,
      type: OrderType.MARKET,
      side: SideType.BUY,
      instrumentId: 1,
      userId: 1,
    };
    expect(pipe.transform(dto)).toEqual(dto);
  });

  it('should throw if MARKET order has a price', () => {
    const dto = {
      size: 1,
      type: OrderType.MARKET,
      side: SideType.BUY,
      price: 10,
      instrumentId: 1,
      userId: 1,
    };
    expect(() => pipe.transform(dto)).toThrow(BadRequestException);
  });

  it('should throw if LIMIT order is missing price', () => {
    const dto = {
      size: 1,
      type: OrderType.LIMIT,
      side: SideType.BUY,
      instrumentId: 1,
      userId: 1,
    };
    expect(() => pipe.transform(dto)).toThrow(BadRequestException);
  });
});
