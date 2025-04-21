import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class SearchQueryDto {
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  @IsNotEmpty({ message: 'Query cannot be empty' })
  @Length(3, 100)
  @ApiProperty({
    description: 'Query parameter to search for TICKER or NAME',
    example: 'GGAL',
  })
  query: string;
}
