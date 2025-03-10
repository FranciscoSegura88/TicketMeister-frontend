import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Event {
  id: number;
  title: string;
  posterUrl: string;
  country: string;
  state: string;
  city: string;
  date: Date;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:5001';

  constructor(private http: HttpClient) {}

  // Método para obtener todos los eventos
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/events`);
  }

  // Método para obtener los detalles de un evento por su ID
  getEventById(eventId: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/events/${eventId}`);
  }
}
