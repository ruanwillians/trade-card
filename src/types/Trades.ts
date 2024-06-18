import { Card } from './Cards';

export type TypeTrade = 'OFFERING' | 'RECEIVING';

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
  type: TypeTrade;
  card: Card;
}

export interface AddTrades {
  cards: {
    cardId: string;
    type: TypeTrade;
  }[];
}
