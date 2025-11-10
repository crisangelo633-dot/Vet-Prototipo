import { Component } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { FormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { OwnersService } from '../../core/services/owners.service';
import { PetsService } from '../../core/services/pets.service';
import { Owner, Pet } from '../../shared/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pet-form',
  standalone: false,
  templateUrl: './pet-form.html',
  styleUrls: ['./pet-form.scss'],
})
export class PetForm {
  owners$: Observable<Owner[]>;
  saving = false;
  form!: UntypedFormGroup;

  constructor(private fb: FormBuilder, private owners: OwnersService, private pets: PetsService, private toast: ToastService) {
    this.owners$ = this.owners.list();
    this.form = this.fb.group({
      ownerId: [null as number | null, Validators.required],
      name: ['', [Validators.required, Validators.minLength(2)]],
      species: ['perro' as 'perro' | 'gato' | 'ave' | 'reptil' | 'otro', Validators.required],
      breed: [''],
      sex: ['' as 'macho' | 'hembra' | '' ],
      birthDate: [''],
      weightKg: [null as number | null],
      neutered: [false],
      notes: [''],
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const payload: Pet = this.form.getRawValue() as unknown as Pet;
    this.saving = true;
    this.pets.create(payload).subscribe({
      next: () => {
        this.saving = false;
        this.persistLocal(payload);
        this.form.reset({ species: 'perro', neutered: false });
        this.toast.show('Mascota registrada', 'success');
      },
      error: () => {
        this.saving = false;
        this.persistLocal(payload);
        this.toast.show('Mascota guardada localmente', 'info');
      }
    });
  }

  private persistLocal(p: Pet) {
    try {
      if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;
      const key = 'pets_local';
      const raw = localStorage.getItem(key);
      const list: Pet[] = raw ? JSON.parse(raw) : [];
      const id = (p as any).id ?? Date.now();
      list.push({ ...(p as any), id } as any);
      localStorage.setItem(key, JSON.stringify(list));
    } catch { /* noop */ }
  }
}
