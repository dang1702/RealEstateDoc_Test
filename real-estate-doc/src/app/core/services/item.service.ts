import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Item } from '../models/item.model';
import { MockDataService } from './mock-data.service';

export interface ItemsResponse {
  items: Item[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private mockDataService: MockDataService
  ) { }

  getItems(): Observable<Item[]> {
    if (environment.useMockApi) {
      return of(this.mockDataService.getItems());
    }
    return this.http.get<Item[]>(`${this.apiUrl}/items`);
  }

  getItemById(id: string): Observable<Item> {
    if (environment.useMockApi) {
      return of(this.mockDataService.getItemById(id));
    }
    return this.http.get<Item>(`${this.apiUrl}/items/${id}`);
  }

  createItem(item: Omit<Item, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Observable<Item> {
    if (environment.useMockApi) {
      return of(this.mockDataService.createItem(item));
    }
    return this.http.post<Item>(`${this.apiUrl}/items`, item);
  }

  updateItem(id: string, item: Item): Observable<Item> {
    if (environment.useMockApi) {
      return of(this.mockDataService.updateItem(id, item));
    }
    return this.http.put<Item>(`${this.apiUrl}/items/${id}`, item);
  }

  deleteItem(id: string): Observable<void> {
    if (environment.useMockApi) {
      return of(this.mockDataService.deleteItem(id));
    }
    return this.http.delete<void>(`${this.apiUrl}/items/${id}`);
  }

  softDeleteItem(id: string): Observable<Item> {
    if (environment.useMockApi) {
      return of(this.mockDataService.softDeleteItem(id));
    }
    return this.http.patch<Item>(`${this.apiUrl}/items/${id}/soft-delete`, {});
  }

  restoreItem(id: string): Observable<Item> {
    if (environment.useMockApi) {
      return of(this.mockDataService.restoreItem(id));
    }
    return this.http.patch<Item>(`${this.apiUrl}/items/${id}/restore`, {});
  }

  getCategories(): Observable<string[]> {
    if (environment.useMockApi) {
      return of(this.mockDataService.getCategories());
    }
    return this.http.get<string[]>(`${this.apiUrl}/categories`);
  }

  getTypes(): Observable<string[]> {
    if (environment.useMockApi) {
      return of(this.mockDataService.getTypes());
    }
    return this.http.get<string[]>(`${this.apiUrl}/types`);
  }

  uploadDocument(itemId: string, file: File): Observable<{ url: string }> {
    if (environment.useMockApi) {
      return this.mockDataService.uploadDocument(itemId, file);
    }
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ url: string }>(`${this.apiUrl}/items/${itemId}/documents`, formData);
  }

  uploadImage(itemId: string, file: File): Observable<{ url: string }> {
    if (environment.useMockApi) {
      return this.mockDataService.uploadImage(itemId, file);
    }
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ url: string }>(`${this.apiUrl}/items/${itemId}/images`, formData);
  }

  deleteDocument(itemId: string, documentId: string): Observable<void> {
    if (environment.useMockApi) {
      return of();
    }
    return this.http.delete<void>(`${this.apiUrl}/items/${itemId}/documents/${documentId}`);
  }

  deleteImage(itemId: string, imageId: string): Observable<void> {
    if (environment.useMockApi) {
      return of();
    }
    return this.http.delete<void>(`${this.apiUrl}/items/${itemId}/images/${imageId}`);
  }
} 