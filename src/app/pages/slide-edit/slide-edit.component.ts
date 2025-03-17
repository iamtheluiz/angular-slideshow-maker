import { Subscription } from 'rxjs';
import { NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { SlideComponent } from '../../components/slide/slide.component';
import { SlideService } from '../../services/slides/slide.service';

@Component({
  selector: 'app-slide-edit',
  imports: [
    FormsModule,
    NgFor,
    RouterLink,
    SlideComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './slide-edit.component.html',
  styleUrl: './slide-edit.component.scss'
})
export class SlideEditComponent implements OnInit, OnDestroy {
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
