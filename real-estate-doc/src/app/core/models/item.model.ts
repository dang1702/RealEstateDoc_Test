export interface Location {
  address: string;
  city: string;
  state: string;
  country: string;
}

export interface MaintenanceInfo {
  lastMaintenanceDate: Date;
  nextMaintenanceDate: Date;
  maintenanceNotes: string;
}

export interface Item {
  id: string;
  name: string;
  type: string;
  category: string;
  price: number;
  description: string;
  location: Location;
  features: string[];
  status: 'active' | 'inactive' | 'maintenance';
  maintenanceInfo: MaintenanceInfo | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
} 