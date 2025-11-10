import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MedicalRecordEntry } from '../../shared/models';
import { API_URL } from './api.config';

@Injectable({ providedIn: 'root' })
export class RecordsService {
  private base = `${API_URL}/records`;
  constructor(private http: HttpClient) {}
  byPet(petId: number): Observable<MedicalRecordEntry[]> {
    const params = new HttpParams().set('petId', petId);
    return this.http.get<MedicalRecordEntry[]>(this.base, { params });
  }
}
