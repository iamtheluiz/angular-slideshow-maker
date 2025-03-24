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

      document.querySelector("body")?.classList.add("remove-box");
      document.querySelector("app-content")?.classList.add("remove-box");
    } else {
      document.exitFullscreen();

      document.querySelector("body")?.classList.remove("remove-box");
      document.querySelector("app-content")?.classList.remove("remove-box");
    }

    this.fullscreen.next(newFullscreen);
  }
}
