export type AppointmentStatus = 'programada' | 'confirmada' | 'atendida' | 'cancelada' | 'no_asistio';

export interface Appointment {
  id?: number;
  petId: number;
  vetId: number;
  start: string; // ISO
  end: string;   // ISO
  reason?: string;
  status: AppointmentStatus;
}
