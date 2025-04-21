import { Order } from 'src/entities/order';

export interface PortfolioStrategy {
  process(order: Order): void;
  getResult(): Record<string, unknown> | Promise<Record<string, unknown>>;
}
