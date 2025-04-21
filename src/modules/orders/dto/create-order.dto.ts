import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { OrderType, SideType } from 'src/interfaces/enum';

export class CreateOrderDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  userId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  instrumentId: number;

  @ApiProperty({ example: SideType.BUY })
  @IsEnum(SideType)
  side: SideType;

  @ApiProperty({ example: OrderType.MARKET })
  @IsEnum(OrderType)
  type: OrderType;

  @ApiProperty({ example: 3 })
  @IsPositive()
  size: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;
}
