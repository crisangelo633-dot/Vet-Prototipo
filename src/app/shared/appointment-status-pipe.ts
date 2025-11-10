import { Pipe, PipeTransform } from '@angular/core';
import { AppointmentStatus } from './models';

@Pipe({
  name: 'appointmentStatus',
  standalone: false
})
export class AppointmentStatusPipe implements PipeTransform {
  private map: Record<AppointmentStatus, string> = {
    programada: 'Programada',
    confirmada: 'Confirmada',
    atendida: 'Atendida',
    cancelada: 'Cancelada',
    no_asistio: 'No asistió',
  } as const;

  transform(value: AppointmentStatus): string {
    return this.map[value] ?? String(value);
  }

}
