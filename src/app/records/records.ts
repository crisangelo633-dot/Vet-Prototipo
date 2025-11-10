import { Component, inject } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { PetsService } from '../core/services/pets.service';
import { RecordsService } from '../core/services/records.service';

@Component({
  selector: 'app-records',
  standalone: false,
  templateUrl: './records.html',
  styleUrl: './records.scss',
})
export class Records {
  private petsSvc = inject(PetsService);
  private recsSvc = inject(RecordsService);

  pets$: Observable<any[]> = this.petsSvc.list();
  selectedPetId: number | null = null;
  records$: Observable<any[]> = of([]);

  onPetChange(val: string) {
    const id = Number(val);
    this.selectedPetId = isNaN(id) ? null : id;
    if (!this.selectedPetId) { this.records$ = of([]); return; }
    const petId = this.selectedPetId;
    this.records$ = this.recsSvc.byPet(petId).pipe(
      map(apiList => {
        const local = this.readLocal(petId);
        return [...apiList, ...local];
      })
    );
  }

  private readLocal(petId: number): any[] {
    try {
      if (typeof window === 'undefined' || typeof localStorage === 'undefined') return [];
      const raw = localStorage.getItem('records_local');
      if (!raw) return [];
      const list = JSON.parse(raw);
      return Array.isArray(list) ? list.filter(r => Number(r?.petId) === petId) : [];
    } catch { return []; }
  }
}
