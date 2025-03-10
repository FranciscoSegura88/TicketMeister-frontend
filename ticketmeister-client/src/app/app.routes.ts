import { Router, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ContentComponent } from './components/content/content.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';


export const routes: Routes = [
    {path: 'event/:id', component: EventDetailComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'content', component: ContentComponent},
    {path: '', redirectTo: '/content', pathMatch: 'full'}
];
