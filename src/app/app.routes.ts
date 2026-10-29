import { Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { HomeComponent } from './features/home/home.component';
import { ReservaListComponent } from './features/reservas/reserva-list/reserva-list.component';
import { ReservaFormComponent } from './features/reservas/reserva-form/reserva-form.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'reservas', component: ReservaListComponent },
      { path: 'reservas/nuevo', component: ReservaFormComponent },
      { path: 'reservas/editar/:id', component: ReservaFormComponent },
    ]
  },
  { path: '**', redirectTo: 'home' }
];
