import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ContainerComponent } from "../../components/container/container.component";
import { HeaderComponent } from "../../components/header/header.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    ContainerComponent,
    HeaderComponent,
    RouterLink
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
}
