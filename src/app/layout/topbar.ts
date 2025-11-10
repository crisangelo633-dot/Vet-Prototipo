import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-topbar',
  standalone: false,
  templateUrl: './topbar.html',
  styleUrls: ['./topbar.scss']
})
export class Topbar {
  private auth = inject(AuthService);
  private router = inject(Router);
  user = this.auth.currentUser;

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth']);
  }
}
