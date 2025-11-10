import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../../shared/models';
import { API_URL } from './api.config';

@Injectable({ providedIn: 'root' })
export class AppointmentsService {
  private base = `${API_URL}/appointments`;
  constructor(private http: HttpClient) {}
  list(params?: { from?: string; to?: string; vetId?: number; petId?: number }): Observable<Appointment[]> {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null) httpParams = httpParams.set(k, String(v));
      });
    }
    return this.http.get<Appointment[]>(this.base, { params: httpParams });
  }
  create(data: Appointment): Observable<Appointment> { return this.http.post<Appointment>(this.base, data); }
  listByPets(petIds: number[], extra?: { from?: string; to?: string; vetId?: number }): Observable<Appointment[]> {
    let params = new HttpParams();
    petIds.forEach(id => params = params.append('petId', String(id)));
    if (extra) {
      Object.entries(extra).forEach(([k, v]) => {
        if (v !== undefined && v !== null) params = params.set(k, String(v));
      });
    }
    return this.http.get<Appointment[]>(this.base, { params });
  }
  update(id: number, changes: Partial<Appointment>): Observable<Appointment> {
    return this.http.patch<Appointment>(`${this.base}/${id}`, changes);
  }
  cancel(id: number): Observable<Appointment> {
    return this.update(id, { status: 'cancelada' as Appointment['status'] });
  }
}
