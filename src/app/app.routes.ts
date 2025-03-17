import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SlideShowComponent } from './pages/slide-show/slide-show.component';
import { SlideListComponent } from './pages/slide-list/slide-list.component';
import { SlideEditComponent } from './pages/slide-edit/slide-edit.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'slide/edit', component: SlideEditComponent },
  { path: 'slide/show', component: SlideShowComponent },
  { path: 'slide/list', component: SlideListComponent }
];
