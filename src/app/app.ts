import { Component, signal, inject } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <ng-container *ngIf="auth.isLoggedIn(); else authOnly">
      <app-topbar />
      <div class="app-shell">
        <aside class="app-sidebar">
          <app-sidebar />
        </aside>
        <main class="app-content">
          <router-outlet />
        </main>
      </div>
    </ng-container>
    <ng-template #authOnly>
      <router-outlet />
    </ng-template>
  `,
  standalone: false,
  styleUrls: ['./app.scss']
})
export class App {
  auth = inject(AuthService);
  protected readonly title = signal('vet-clinic');
}
