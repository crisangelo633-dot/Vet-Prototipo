import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vet } from '../../shared/models';
import { API_URL } from './api.config';

@Injectable({ providedIn: 'root' })
export class VetsService {
  private base = `${API_URL}/vets`;
  constructor(private http: HttpClient) {}
  list(): Observable<Vet[]> { return this.http.get<Vet[]>(this.base); }
}
