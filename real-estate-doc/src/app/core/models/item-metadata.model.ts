export interface ItemMetadata {
  location?: {
    address: string;
    city: string;
    state: string;
    country: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  specifications?: {
    [key: string]: string | number | boolean;
  };
  features?: string[];
  images?: string[];
  status?: 'available' | 'reserved' | 'sold' | 'maintenance';
  lastMaintenanceDate?: Date;
  nextMaintenanceDate?: Date;
  notes?: string;
} 