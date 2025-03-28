export interface Review {
  id: string;
  rating: number;
  title: string;
  content: string;
  itemId: string;
  userId: string;
  userName: string;
  createdAt: Date;
  updatedAt?: Date;
  isVerified?: boolean;
  helpful?: number;
  images?: string[];
  metadata?: {
    pros?: string[];
    cons?: string[];
    tags?: string[];
  };
} 