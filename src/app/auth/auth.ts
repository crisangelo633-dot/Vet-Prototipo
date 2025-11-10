import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  error = '';
  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const { username, password } = this.form.value as { username: string; password: string };
    this.error = '';
    this.auth.login(username, password).subscribe(user => {
      if (!user) {
        this.error = 'Credenciales inválidas';
        return;
      }
      this.router.navigate(['/dashboard']);
    });
  }
}
