export interface Comment {
  id: string;
  content: string;
  itemId: string;
  userId: string;
  userName: string;
  createdAt: Date;
  updatedAt?: Date;
  parentId?: string;
  replies?: Comment[];
  isEdited?: boolean;
  metadata?: {
    attachments?: string[];
    tags?: string[];
  };
} 