import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Reserva } from '../models/reserva';

@Injectable({ providedIn: 'root' })
export class ReservaService {
  private readonly http = inject(HttpClient);
  private readonly url = environment.apiUrl;

  listar(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.url);
  }

  obtener(id: number): Observable<Reserva> {
    return this.http.get<Reserva>(`${this.url}/${id}`);
  }

  crear(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.url, reserva);
  }

  actualizar(id: number, reserva: Reserva): Observable<Reserva> {
    return this.http.put<Reserva>(`${this.url}/${id}`, reserva);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
