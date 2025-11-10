import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet } from '../../shared/models';
import { API_URL } from './api.config';

@Injectable({ providedIn: 'root' })
export class PetsService {
  private base = `${API_URL}/pets`;
  constructor(private http: HttpClient) {}
  list(): Observable<Pet[]> { return this.http.get<Pet[]>(this.base); }
  byOwner(ownerId: number): Observable<Pet[]> {
    const params = new HttpParams().set('ownerId', ownerId);
    return this.http.get<Pet[]>(this.base, { params });
  }
  create(data: Pet): Observable<Pet> { return this.http.post<Pet>(this.base, data); }
}
