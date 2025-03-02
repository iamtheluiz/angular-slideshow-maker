import { Component, OnDestroy, OnInit } from '@angular/core';
import { SlideService } from '../../services/slides/slide.service';
import { SlideComponent } from "../slide/slide.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-slideshow',
  imports: [
    SlideComponent
  ],
  templateUrl: './slideshow.component.html',
  styleUrl: './slideshow.component.scss'
})
export class SlideshowComponent implements OnInit, OnDestroy {
  slides: any;
  currentSlideIndex = 0;

  private subscriptions = new Subscription();

  constructor(private slideService: SlideService) {
    slideService.ngOnInit();

    this.handleKeyboard = this.handleKeyboard.bind(this);
  }

  ngOnInit(): void {
    this.subscriptions.add(this.slideService.currentSlides.subscribe(slides => {
      this.slides = slides;
    }));

    document.addEventListener("keydown", this.handleKeyboard);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();

    document.removeEventListener("keydown", this.handleKeyboard);
  }

  handleKeyboard(event: KeyboardEvent) {
    if (event.code === "ArrowLeft" || event.code === "KeyA") {
      this.handlePreviousSlide();
    } else if (event.code === "ArrowRight" || event.code === "KeyD") {
      this.handleNextSlide();
    } else if (event.code === "KeyF") {
      this.handleToggleFullScreen();
    }
  }

  handleToggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  handlePreviousSlide() {
    let newSlideIndex = this.currentSlideIndex - 1;

    if (newSlideIndex < 0) {
      newSlideIndex = 0;
    }

    this.currentSlideIndex = newSlideIndex;
  }

  handleNextSlide() {
    let newSlideIndex = this.currentSlideIndex + 1;

    if (newSlideIndex > this.slides.length - 1) {
      newSlideIndex = this.slides.length - 1;
    }

    this.currentSlideIndex = newSlideIndex;
  }
}
