import { Component, OnDestroy, OnInit } from '@angular/core';
import { SlideService } from '../../services/slides/slide.service';
import { SlideComponent } from "../slide/slide.component";
import { NgFor } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-slideshow',
  imports: [
    SlideComponent,
    NgFor
  ],
  templateUrl: './slideshow.component.html',
  styleUrl: './slideshow.component.scss'
})
export class SlideshowComponent implements OnInit, OnDestroy {
  slides: any;

  private subscriptions = new Subscription();

  constructor(private slideService: SlideService) {
    slideService.ngOnInit();
  }

  ngOnInit(): void {
    this.subscriptions.add(this.slideService.currentSlides.subscribe(slides => {
      this.slides = slides;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
