import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Item } from '../models/item.model';
import { Document } from '../models/document.model';
import { ItemsResponse } from './item.service';

@Injectable({
  providedIn: 'root'
})
export class MockApiService {
  private items: Item[] = [
    {
      id: '1',
      name: 'Luxury Apartment',
      type: 'Apartment',
      category: 'Residential',
      price: 500000,
      description: 'Modern luxury apartment in the heart of the city',
      status: 'active',
      location: {
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        latitude: 40.7128,
        longitude: -74.0060
      },
      lastMaintenanceDate: new Date('2024-01-01'),
      nextMaintenanceDate: new Date('2024-07-01'),
      notes: 'Premium finishes and amenities',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      isDeleted: false
    },
    {
      id: '2',
      name: 'Commercial Office Space',
      type: 'Office',
      category: 'Commercial',
      price: 1200000,
      description: 'Prime office space in business district',
      status: 'active',
      location: {
        address: '456 Business Ave',
        city: 'Chicago',
        state: 'IL',
        country: 'USA',
        latitude: 41.8781,
        longitude: -87.6298
      },
      lastMaintenanceDate: new Date('2024-02-01'),
      nextMaintenanceDate: new Date('2024-08-01'),
      notes: 'Recently renovated',
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01'),
      isDeleted: false
    }
  ];

  private documents: Document[] = [];
  private categories: string[] = ['Residential', 'Commercial', 'Industrial', 'Land'];
  private types: string[] = ['Apartment', 'House', 'Office', 'Retail', 'Warehouse', 'Plot'];

  constructor() {}

  getItems(): Observable<ItemsResponse> {
    return of({
      items: this.items.filter(item => !item.isDeleted),
      total: this.items.length
    }).pipe(delay(500));
  }

  getItem(id: string): Observable<Item> {
    const item = this.items.find(i => i.id === id);
    if (!item) {
      throw new Error('Item not found');
    }
    return of(item).pipe(delay(500));
  }

  createItem(item: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>): Observable<Item> {
    const newItem: Item = {
      ...item,
      id: (this.items.length + 1).toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false
    };
    this.items.push(newItem);
    return of(newItem).pipe(delay(500));
  }

  updateItem(id: string, item: Partial<Item>): Observable<Item> {
    const index = this.items.findIndex(i => i.id === id);
    if (index === -1) {
      throw new Error('Item not found');
    }
    this.items[index] = {
      ...this.items[index],
      ...item,
      updatedAt: new Date()
    };
    return of(this.items[index]).pipe(delay(500));
  }

  deleteItem(id: string): Observable<void> {
    const index = this.items.findIndex(i => i.id === id);
    if (index === -1) {
      throw new Error('Item not found');
    }
    this.items.splice(index, 1);
    return of(void 0).pipe(delay(500));
  }

  softDeleteItem(id: string): Observable<Item> {
    const index = this.items.findIndex(i => i.id === id);
    if (index === -1) {
      throw new Error('Item not found');
    }
    this.items[index] = {
      ...this.items[index],
      isDeleted: true,
      updatedAt: new Date()
    };
    return of(this.items[index]).pipe(delay(500));
  }

  restoreItem(id: string): Observable<Item> {
    const index = this.items.findIndex(i => i.id === id);
    if (index === -1) {
      throw new Error('Item not found');
    }
    this.items[index] = {
      ...this.items[index],
      isDeleted: false,
      updatedAt: new Date()
    };
    return of(this.items[index]).pipe(delay(500));
  }

  getCategories(): Observable<string[]> {
    return of(this.categories).pipe(delay(500));
  }

  getTypes(): Observable<string[]> {
    return of(this.types).pipe(delay(500));
  }

  uploadFile(file: File, itemId: string): Observable<Document> {
    const newDoc: Document = {
      id: (this.documents.length + 1).toString(),
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file),
      itemId,
      uploadedBy: 'current-user',
      uploadedAt: new Date()
    };
    this.documents.push(newDoc);
    return of(newDoc);
  }

  getFiles(itemId: string): Observable<Document[]> {
    return of(this.documents.filter(doc => doc.itemId === itemId));
  }

  deleteFile(fileId: string): Observable<void> {
    const index = this.documents.findIndex(doc => doc.id === fileId);
    if (index !== -1) {
      this.documents.splice(index, 1);
      return of(void 0);
    }
    throw new Error('File not found');
  }
} 