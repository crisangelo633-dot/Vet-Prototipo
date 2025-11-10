import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OwnersService } from '../core/services/owners.service';
import { ToastService } from '../core/services/toast.service';

@Component({
  selector: 'app-owners',
  standalone: false,
  templateUrl: './owners.html',
  styleUrl: './owners.scss',
})
export class Owners {
  private fb = inject(FormBuilder);
  private owners = inject(OwnersService);
  private toast = inject(ToastService);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: [''],
    email: ['', []],
  });

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const payload = this.form.getRawValue();
    // Guardar en API mock
    this.owners.create(payload as any).subscribe({
      next: () => {
        this.persistLocal(payload);
        this.toast.show('Dueño registrado', 'success');
        this.form.reset();
      },
      error: () => {
        this.persistLocal(payload);
        this.toast.show('Dueño guardado localmente', 'info');
        this.form.reset();
      }
    });
  }

  private persistLocal(o: any) {
    try {
      if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;
      const key = 'owners_local';
      const raw = localStorage.getItem(key);
      const list = raw ? JSON.parse(raw) : [];
      list.push({ id: Date.now(), ...o });
      localStorage.setItem(key, JSON.stringify(list));
    } catch { /* noop */ }
  }
}
