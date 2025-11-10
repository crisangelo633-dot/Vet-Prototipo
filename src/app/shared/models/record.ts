export interface MedicalRecordEntry {
  id?: number;
  petId: number;
  appointmentId: number;
  date: string; // ISO
  symptoms?: string;
  diagnosis?: string;
  treatment?: string;
  vaccines?: Array<{ name: string; dose?: string }>;
  attachments?: Array<{ id: string; url: string; name: string }>;
}
