import { CommonModule } from '@angular/common'; // Importa CommonModule
import { Component, OnInit } from '@angular/core';
import { EventService, Event } from '../../services/event.service';
import { RouterModule } from '@angular/router'; // Importa RouterModule si usas [routerLink]

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, RouterModule], // Añade CommonModule y RouterModule
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  events: Event[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.events = data;
      },
      error: (error) => {
        console.error('Error al cargar los eventos', error);
      }
    });
  }
}
