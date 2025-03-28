export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  itemId: string;
  uploadedBy: string;
  uploadedAt: Date;
  metadata?: {
    description?: string;
    tags?: string[];
    version?: string;
  };
} 