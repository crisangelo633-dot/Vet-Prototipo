import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Owner } from '../../shared/models';
import { API_URL } from './api.config';

@Injectable({ providedIn: 'root' })
export class OwnersService {
  private base = `${API_URL}/owners`;
  constructor(private http: HttpClient) {}
  list(): Observable<Owner[]> { return this.http.get<Owner[]>(this.base); }
  create(data: Owner): Observable<Owner> { return this.http.post<Owner>(this.base, data); }
}
