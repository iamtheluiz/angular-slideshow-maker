import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FullscreenService {
  private fullscreen = new BehaviorSubject(false);

  currentFullscreen = this.fullscreen.asObservable();

  constructor() { }

  setFullscreen(value: boolean) {
    this.fullscreen.next(value);

    this.checkFullscreen();
  }

  toggleFullscreen() {
    const newFullscreen = !document.fullscreenElement;

    this.setFullscreen(newFullscreen);
  }

  checkFullscreen() {
    if (this.fullscreen.value) {
      document.documentElement.requestFullscreen();

      document.querySelector("body")?.classList.add("remove-box");
      document.querySelector("app-content")?.classList.add("remove-box");
    } else {
      document.exitFullscreen();

      document.querySelector("body")?.classList.remove("remove-box");
      document.querySelector("app-content")?.classList.remove("remove-box");
    }
  }
}
