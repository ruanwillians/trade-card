import { Card } from './Cards';

export interface Trade {
  id: string;
  userId: string;
  createdAt: string;
  user: { name: string };
  tradeCards: TradeCard[];
}

export interface TradeCard {
  id: string;
  cardId: string;
  tradeId: string;
  type: 'OFFERING' | 'RECEIVING';
  card: Card;
}
