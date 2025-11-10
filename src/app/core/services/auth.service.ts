import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

export type UserRole = 'admin' | 'recep' | 'vet';
export interface User {
  id: number;
  username: string;
  name: string;
  role: UserRole;
}

interface LoginResponse extends User {}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3001';
  currentUser = signal<User | null>(this.readSession());

  private readSession(): User | null {
    try {
      if (typeof window === 'undefined' || typeof localStorage === 'undefined') return null;
      const raw = localStorage.getItem('session');
      if (!raw) return null;
      return JSON.parse(raw) as User;
    } catch { return null; }
  }

  private writeSession(user: User | null) {
    try {
      if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;
      if (user) localStorage.setItem('session', JSON.stringify(user));
      else localStorage.removeItem('session');
    } catch { /* noop */ }
  }

  login(username: string, password: string) {
    return this.http.get<LoginResponse[]>(`${this.baseUrl}/users`, { params: { username, password } }).pipe(
      map(list => list[0] ?? null),
      tap(user => {
        if (user) {
          this.currentUser.set(user);
          this.writeSession(user);
        }
      })
    );
  }

  logout() {
    this.currentUser.set(null);
    this.writeSession(null);
  }

  isLoggedIn() { return !!this.currentUser(); }
  hasRole(roles: UserRole[]) {
    const u = this.currentUser();
    return !!u && roles.includes(u.role);
  }
}
