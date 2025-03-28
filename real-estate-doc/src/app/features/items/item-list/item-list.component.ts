import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Item } from '@app/core/models/item.model';
import { ItemService } from '@app/core/services/item.service';
import { NotificationService } from '@app/core/services/notification.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'type', 'category', 'price', 'status', 'actions'];
  dataSource!: MatTableDataSource<Item>;
  searchText = '';
  selectedCategory = '';
  selectedType = '';
  categories: string[] = [];
  types: string[] = [];
  isLoading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private itemService: ItemService,
    private router: Router,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadItems();
    this.loadCategories();
    this.loadTypes();
  }

  loadItems(): void {
    this.isLoading = true;
    this.itemService.getItems().subscribe({
      next: (items) => {
        this.dataSource = new MatTableDataSource(items);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = this.createFilter();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading items:', error);
        this.notificationService.showError('Error loading items. Please try again later.');
        this.isLoading = false;
      }
    });
  }

  loadCategories(): void {
    // In a real application, this would come from a service
    this.categories = ['Residential', 'Commercial', 'Industrial'];
  }

  loadTypes(): void {
    // In a real application, this would come from a service
    this.types = ['House', 'Apartment', 'Office', 'Warehouse'];
  }

  createFilter(): (data: Item, filter: string) => boolean {
    return (data: Item, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      
      const matchesSearch = !searchTerms.searchText || 
        Object.keys(data).some(key => 
          String(data[key as keyof Item])
            .toLowerCase()
            .includes(searchTerms.searchText.toLowerCase())
        );

      const matchesCategory = !searchTerms.category || 
        data.category.toLowerCase() === searchTerms.category.toLowerCase();

      const matchesType = !searchTerms.type || 
        data.type.toLowerCase() === searchTerms.type.toLowerCase();

      return matchesSearch && matchesCategory && matchesType;
    };
  }

  applyFilter(): void {
    const filterValue = JSON.stringify({
      searchText: this.searchText,
      category: this.selectedCategory,
      type: this.selectedType
    });
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onAddItem(): void {
    this.router.navigate(['/items/new']);
  }

  onDeleteItem(item: Item): void {
    if (confirm(`Are you sure you want to delete ${item.name}?`)) {
      this.itemService.deleteItem(item.id).subscribe({
        next: () => {
          this.notificationService.showSuccess('Item deleted successfully');
          this.loadItems();
        },
        error: (error) => {
          console.error('Error deleting item:', error);
          this.notificationService.showError('Error deleting item. Please try again later.');
        }
      });
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'active':
        return 'text-green-600';
      case 'inactive':
        return 'text-red-600';
      case 'maintenance':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  }

  getStatusText(status: string): string {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }
} 