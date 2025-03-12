import { Router, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ContentComponent } from './components/content/content.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { BuyTicketComponent } from './components/buy-ticket/buy-ticket.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';

export const routes: Routes = [
    {path: 'thank-you', component: ThankYouComponent},
    {path: 'event/:id', component: EventDetailComponent},
    {path: 'buy-tickets/:id', component: BuyTicketComponent },
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'content', component: ContentComponent},
    {path: '', redirectTo: '/content', pathMatch: 'full'}
];
