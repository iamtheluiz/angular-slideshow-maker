import { NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SlideComponent } from "../../components/slide/slide.component";
import { SlideService } from '../../services/slides/slide.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [
    FormsModule,
    NgFor,
    RouterLink,
    SlideComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  markdown: any;
  slides: any;

  private subscriptions = new Subscription();

  constructor(private slideService: SlideService) {
    slideService.ngOnInit();
  }

  markdownChange(value: string) {
    this.slideService.changeMarkdown(value);
  }

  ngOnInit(): void {
    this.subscriptions.add(this.slideService.currentMarkdown.subscribe(markdown => {
      this.markdown = markdown;
    }));
    this.subscriptions.add(this.slideService.currentSlides.subscribe(slides => {
      this.slides = slides;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
