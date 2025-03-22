import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContainerComponent } from "./components/container/container.component";
import { HeaderComponent } from "./components/header/header.component";
import { ContentComponent } from "./components/content/content.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ContainerComponent, HeaderComponent, ContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
}
