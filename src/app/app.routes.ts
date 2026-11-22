import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Dra. Lívia Ribeiro | Estética Avançada em Santo André' },
  { path: '**', redirectTo: '' },
];
