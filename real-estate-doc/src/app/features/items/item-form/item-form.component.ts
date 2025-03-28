import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../../../core/services/item.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Item } from '../../../core/models/item.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {
  itemForm!: FormGroup;
  categories: string[] = [];
  types: string[] = [];
  isEditMode = false;
  isLoading = false;
  selectedFiles: { documents: File[], images: File[] } = {
    documents: [],
    images: []
  };

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadTypes();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadItem(id);
    }
  }

  createForm(): void {
    this.itemForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      type: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      location: this.fb.group({
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required]
      }),
      features: [[]],
      status: ['active', Validators.required],
      maintenanceInfo: [null]
    });
  }

  loadCategories(): void {
    this.itemService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: () => {
        this.notificationService.showError('Error loading categories');
      }
    });
  }

  loadTypes(): void {
    this.itemService.getTypes().subscribe({
      next: (types) => {
        this.types = types;
      },
      error: () => {
        this.notificationService.showError('Error loading types');
      }
    });
  }

  loadItem(id: string): void {
    this.isLoading = true;
    this.itemService.getItemById(id).subscribe({
      next: (item) => {
        this.itemForm.patchValue(item);
        this.isLoading = false;
      },
      error: () => {
        this.notificationService.showError('Error loading item');
        this.router.navigate(['/items']);
      }
    });
  }

  onFileSelected(event: Event, type: 'documents' | 'images'): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles[type] = Array.from(input.files);
    }
  }

  onSubmit(): void {
    console.log('Form submitted');
    if (this.itemForm.valid) {
      console.log('Form is valid');
      this.isLoading = true;
      const formValue = this.itemForm.value;
      console.log('Form value:', formValue);

      if (this.isEditMode) {
        console.log('Updating item');
        const item: Item = {
          ...formValue,
          id: this.route.snapshot.paramMap.get('id')!,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null
        };

        this.itemService.updateItem(item.id, item).subscribe({
          next: (savedItem) => {
            console.log('Item updated:', savedItem);
            this.handleFileUploads(savedItem.id);
          },
          error: (error) => {
            console.error('Error updating item:', error);
            this.notificationService.showError('Error updating item');
          },
          complete: () => {
            this.isLoading = false;
          }
        });
      } else {
        console.log('Creating new item');
        // Remove fields that should be handled by the service
        const { id, createdAt, updatedAt, deletedAt, ...newItem } = formValue;
        console.log('New item data:', newItem);
        this.itemService.createItem(newItem).subscribe({
          next: (savedItem) => {
            console.log('Item created:', savedItem);
            this.handleFileUploads(savedItem.id);
          },
          error: (error) => {
            console.error('Error creating item:', error);
            this.notificationService.showError('Error creating item');
          },
          complete: () => {
            this.isLoading = false;
          }
        });
      }
    } else {
      console.log('Form is invalid:', this.itemForm.errors);
    }
  }

  private handleFileUploads(itemId: string): void {
    const uploads = [
      ...this.selectedFiles.documents.map(file => 
        this.itemService.uploadDocument(itemId, file)
      ),
      ...this.selectedFiles.images.map(file => 
        this.itemService.uploadImage(itemId, file)
      )
    ];

    if (uploads.length > 0) {
      forkJoin(uploads).subscribe({
        next: () => {
          this.notificationService.showSuccess(
            `Item ${this.isEditMode ? 'updated' : 'created'} successfully`
          );
          this.router.navigate(['/items']);
        },
        error: () => {
          this.notificationService.showError('Error uploading files');
        }
      });
    } else {
      this.notificationService.showSuccess(
        `Item ${this.isEditMode ? 'updated' : 'created'} successfully`
      );
      this.router.navigate(['/items']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/items']);
  }
} 