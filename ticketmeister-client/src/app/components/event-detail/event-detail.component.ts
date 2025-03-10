import { CommonModule } from '@angular/common'; // Importa CommonModule
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService, Event } from '../../services/event.service';
import { RouterModule } from '@angular/router'; // Importa RouterModule si usas [routerLink]

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, RouterModule], // Añade CommonModule y RouterModule
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  event: Event | undefined;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');

    if (eventId) {
      this.loadEventDetails(+eventId);
    }
  }

  loadEventDetails(eventId: number): void {
    this.eventService.getEventById(eventId).subscribe({
      next: (data) => {
        this.event = data;
      },
      error: (error) => {
        console.error('Error al cargar los detalles del evento', error);
      }
    });
  }
}
