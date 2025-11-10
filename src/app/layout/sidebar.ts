import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserRole } from '../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class Sidebar {
  private auth = inject(AuthService);
  private router = inject(Router);
  user = this.auth.currentUser;

  isActive(path: string) { return this.router.url.startsWith(path); }

  private role(): UserRole | null { return this.user()?.role ?? null; }
  canSee(allowed: UserRole[] | 'all'): boolean {
    const r = this.role();
    if (!r) return false;
    if (r === 'admin') return true;
    if (allowed === 'all') return true;
    return allowed.includes(r);
  }
}
