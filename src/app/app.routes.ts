import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PresentComponent } from './pages/present/present.component';

export const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'present', component: PresentComponent
  }
];
