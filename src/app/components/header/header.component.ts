import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { FullscreenService } from '../../services/slides/fullscreen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  fullscreen: boolean = false;

  private subscriptions = new Subscription();

  constructor(private fullscreenService: FullscreenService) { }

  ngOnInit(): void {
    this.subscriptions.add(this.fullscreenService.currentFullscreen.subscribe(fullscreen => {
      this.fullscreen = fullscreen;
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
