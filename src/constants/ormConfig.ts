import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
import { Instrument } from 'src/entities/instrument';
import { MarketData } from 'src/entities/marketData';
import { Order } from 'src/entities/order';
import { User } from 'src/entities/user';

export const ORM_CONFIG: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.PGHOST || 'localhost',
  port: parseInt(process.env.PORT) || 5432,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  entities: [User, Order, Instrument, MarketData],
  synchronize: false,
  extra: {
    ssl: {
      rejectAuthroized: false,
    },
    connectionLimit: Number(10),
  },
};
