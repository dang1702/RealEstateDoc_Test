import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'items',
    loadChildren: () => import('./features/items/items.module').then(m => m.ItemsModule)
  },
  {
    path: '',
    redirectTo: 'items',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'items'
  }
];
