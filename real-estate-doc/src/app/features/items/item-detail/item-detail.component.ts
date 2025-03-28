import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../../core/models/item.model';
import { ItemService } from '../../../core/services/item.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
  item: Item | null = null;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadItem(id);
    }
  }

  loadItem(id: string): void {
    this.isLoading = true;
    this.itemService.getItemById(id).subscribe({
      next: (item: Item) => {
        this.item = item;
        this.isLoading = false;
      },
      error: (error) => {
        this.notificationService.showError('Error loading item details');
        this.router.navigate(['/items']);
      }
    });
  }

  onEdit(): void {
    if (this.item) {
      this.router.navigate(['/items', this.item.id, 'edit']);
    }
  }

  onDelete(): void {
    if (this.item) {
      if (confirm('Are you sure you want to delete this item?')) {
        this.itemService.deleteItem(this.item.id).subscribe({
          next: () => {
            this.notificationService.showSuccess('Item deleted successfully');
            this.router.navigate(['/items']);
          },
          error: () => {
            this.notificationService.showError('Error deleting item');
          }
        });
      }
    }
  }

  onBack(): void {
    this.router.navigate(['/items']);
  }

  getStatusClass(): string {
    if (!this.item) return '';
    
    switch (this.item.status.toLowerCase()) {
      case 'active':
        return 'text-green-600';
      case 'inactive':
        return 'text-red-600';
      case 'pending':
        return 'text-yellow-600';
      default:
        return '';
    }
  }
} 