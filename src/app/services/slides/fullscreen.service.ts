import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FullscreenService {
  private fullscreen = new BehaviorSubject(false);

  currentFullscreen = this.fullscreen.asObservable();

  constructor() { }

  toggleFullscreen() {
    const newFullscreen = !document.fullscreenElement;

    if (newFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }

    this.fullscreen.next(newFullscreen);
  }
}
