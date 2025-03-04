import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Event {
  id: number;
  title: string;
  description: string;
  posterUrl: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private API_URL = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  // Método para obtener todos los eventos
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.API_URL}/events`);
  }
}
