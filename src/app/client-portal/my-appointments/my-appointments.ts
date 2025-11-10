import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Appointment, Pet } from '../../shared/models';
import { PetsService } from '../../core/services/pets.service';
import { AppointmentsService } from '../../core/services/appointments.service';

@Component({
  selector: 'app-my-appointments',
  standalone: false,
  templateUrl: './my-appointments.html',
  styleUrls: ['./my-appointments.scss'],
})
export class MyAppointments {
  private ownerId = 1; // Demo
  pets$!: Observable<Pet[]>;
  appts$!: Observable<Appointment[]>;

  constructor(private pets: PetsService, private appts: AppointmentsService) {
    this.pets$ = this.pets.byOwner(this.ownerId);
    this.appts$ = this.pets$.pipe(
      map(ps => ps.map(p => p.id!).filter(Boolean) as number[]),
      switchMap(ids => ids.length ? this.appts.listByPets(ids) : of([] as Appointment[]))
    );
  }

  canCancel(a: Appointment) {
    return a.status === 'programada' || a.status === 'confirmada';
  }

  cancel(a: Appointment) {
    if (!a.id) return;
    this.appts.cancel(a.id).subscribe(() => {
      // Simple refresh: resuscribirse
      this.pets$ = this.pets.byOwner(this.ownerId);
      this.appts$ = this.pets$.pipe(
        map(ps => ps.map(p => p.id!).filter(Boolean) as number[]),
        switchMap(ids => ids.length ? this.appts.listByPets(ids) : of([] as Appointment[]))
      );
    });
  }
}
