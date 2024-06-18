export interface Card {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export interface AddCards {
  cardIds: string[];
}

export interface CardProps {
  card: Card;
}
