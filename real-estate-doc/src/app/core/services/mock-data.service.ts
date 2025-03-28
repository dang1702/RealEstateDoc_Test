import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private items: Item[] = [
    {
      id: '1',
      name: 'Luxury Villa',
      type: 'House',
      category: 'Residential',
      price: 1500000,
      description: 'Beautiful luxury villa with modern amenities',
      location: {
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        country: 'USA'
      },
      features: ['Pool', 'Garden', 'Garage'],
      status: 'active',
      maintenanceInfo: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    },
    {
      id: '2',
      name: 'Downtown Apartment',
      type: 'Apartment',
      category: 'Residential',
      price: 500000,
      description: 'Modern apartment in the heart of downtown',
      location: {
        address: '456 Park Ave',
        city: 'New York',
        state: 'NY',
        country: 'USA'
      },
      features: ['Gym', 'Parking', 'Security'],
      status: 'active',
      maintenanceInfo: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    },
    {
      id: '3',
      name: 'Office Building',
      type: 'Commercial',
      category: 'Office',
      price: 3000000,
      description: 'Class A office building with premium amenities',
      location: {
        address: '789 Business Blvd',
        city: 'New York',
        state: 'NY',
        country: 'USA'
      },
      features: ['Elevator', 'Security', 'Parking'],
      status: 'maintenance',
      maintenanceInfo: {
        lastMaintenanceDate: new Date(),
        nextMaintenanceDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        maintenanceNotes: 'Regular maintenance check'
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }
  ];

  private categories: string[] = ['Residential', 'Commercial', 'Industrial', 'Land'];
  private types: string[] = ['House', 'Apartment', 'Condo', 'Villa', 'Office', 'Shop', 'Warehouse'];

  constructor() { }

  getItems(): Item[] {
    return this.items.filter(item => !item.deletedAt);
  }

  getItemById(id: string): Item {
    const item = this.items.find(item => item.id === id && !item.deletedAt);
    if (!item) {
      throw new Error('Item not found');
    }
    return item;
  }

  createItem(item: Omit<Item, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Item {
    const newItem: Item = {
      ...item,
      id: (this.items.length + 1).toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    };
    this.items.push(newItem);
    return newItem;
  }

  updateItem(id: string, item: Partial<Item>): Item {
    const index = this.items.findIndex(i => i.id === id && !i.deletedAt);
    if (index === -1) {
      throw new Error('Item not found');
    }
    this.items[index] = {
      ...this.items[index],
      ...item,
      updatedAt: new Date()
    };
    return this.items[index];
  }

  deleteItem(id: string): void {
    const index = this.items.findIndex(i => i.id === id && !i.deletedAt);
    if (index === -1) {
      throw new Error('Item not found');
    }
    this.items.splice(index, 1);
  }

  softDeleteItem(id: string): Item {
    const index = this.items.findIndex(i => i.id === id && !i.deletedAt);
    if (index === -1) {
      throw new Error('Item not found');
    }
    this.items[index] = {
      ...this.items[index],
      status: 'inactive',
      deletedAt: new Date(),
      updatedAt: new Date()
    };
    return this.items[index];
  }

  restoreItem(id: string): Item {
    const index = this.items.findIndex(i => i.id === id && i.deletedAt);
    if (index === -1) {
      throw new Error('Item not found');
    }
    this.items[index] = {
      ...this.items[index],
      status: 'active',
      deletedAt: null,
      updatedAt: new Date()
    };
    return this.items[index];
  }

  getCategories(): string[] {
    return this.categories;
  }

  getTypes(): string[] {
    return this.types;
  }

  uploadDocument(itemId: string, file: File): Observable<{ url: string }> {
    const url = `https://mock-api.com/documents/${itemId}/${file.name}`;
    return of({ url }).pipe(delay(1000));
  }

  uploadImage(itemId: string, file: File): Observable<{ url: string }> {
    const url = `https://mock-api.com/images/${itemId}/${file.name}`;
    return of({ url }).pipe(delay(1000));
  }
} 