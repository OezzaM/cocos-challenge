import { Module } from '@nestjs/common';
import { InstrumentController } from './instrument.controller';
import { InstrumentService } from './instrument.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instrument } from 'src/entities/instrument';

@Module({
  imports: [TypeOrmModule.forFeature([Instrument])],
  controllers: [InstrumentController],
  providers: [InstrumentService],
  exports: [InstrumentService],
})
export class InstrumentModule {}
