import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SlideShowComponent } from './pages/slide-show/slide-show.component';
import { SlideListComponent } from './pages/slide-list/slide-list.component';
import { SlideEditComponent } from './pages/slide-edit/slide-edit.component';
import { SlideCreateComponent } from './pages/slide-create/slide-create.component';
import { SlideExportComponent } from './pages/slide-export/slide-export.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'slide/:id/edit', component: SlideEditComponent },
  { path: 'slide/:id/show', component: SlideShowComponent },
  { path: 'slide/:id/export', component: SlideExportComponent },
  { path: 'slide/list', component: SlideListComponent },
  { path: 'slide/create', component: SlideCreateComponent }
];
