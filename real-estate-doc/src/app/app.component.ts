import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <span>Real Estate Document Management</span>
    </mat-toolbar>
    <div class="container mx-auto p-4">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }
    .container {
      max-width: 1200px;
    }
  `]
})
export class AppComponent {
  title = 'Real Estate Document Management';
}
