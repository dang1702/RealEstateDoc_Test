import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ItemService } from './services/item.service';
import { MockDataService } from './services/mock-data.service';
import { NotificationService } from './services/notification.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ItemService,
    MockDataService,
    NotificationService
  ]
})
export class CoreModule { } 