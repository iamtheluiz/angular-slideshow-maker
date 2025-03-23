import { Component, DoCheck, Input, OnDestroy, OnInit } from '@angular/core';
import { SlideService } from '../../services/slides/slide.service';
import { SlideComponent } from "../slide/slide.component";
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FullscreenService } from '../../services/slides/fullscreen.service';
import { Slide } from '../../interfaces/slide';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-slideshow',
  imports: [
    SlideComponent,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './slideshow.component.html',
  styleUrl: './slideshow.component.scss'
})
export class SlideshowComponent implements OnInit, OnDestroy, DoCheck {
  @Input() slide: Slide | undefined;
  @Input() showReturn: boolean = true;
  @Input() showFull: boolean = true;
  @Input() showGeneratePDF: boolean = true;

  slides: any;
  currentSlideIndex = 0;

  private subscriptions = new Subscription();

  constructor(
    private slideService: SlideService,
    private fullscreenService: FullscreenService,
    private router: Router
  ) {
    slideService.ngOnInit();

    this.handleKeyboard = this.handleKeyboard.bind(this);
  }

  ngOnInit(): void {
    this.subscriptions.add(this.slideService.currentSlides.subscribe(slides => {
      this.slides = slides;
    }));

    this.slideService.changeMarkdown(this.slide?.markdown ?? "");

    document.addEventListener("keydown", this.handleKeyboard);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();

    document.removeEventListener("keydown", this.handleKeyboard);
  }

  ngDoCheck(): void {
    console.log(this.slides);
    console.log(this.showReturn)
  }

  handleKeyboard(event: KeyboardEvent) {
    if (event.code === "ArrowLeft" || event.code === "KeyA") {
      this.handlePreviousSlide();
    } else if (event.code === "ArrowRight" || event.code === "KeyD") {
      this.handleNextSlide();
    } else if (this.showFull && event.code === "KeyF") {
      this.handleToggleFullScreen();
    } else if (this.showReturn && event.code === "Backspace") {
      this.handleReturn();
    }
  }

  handleReturn() {
    this.router.navigateByUrl("/slide/edit");
  }

  handleToggleFullScreen() {
    this.fullscreenService.toggleFullscreen();
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

  handleGeneratePDF() {

  }
}
