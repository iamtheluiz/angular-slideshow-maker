import { Subscription } from 'rxjs';
import { NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { SlideComponent } from '../../components/slide/slide.component';
import { SlideService } from '../../services/slides/slide.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-slide-edit',
  imports: [
    FormsModule,
    NgFor,
    RouterLink,
    SlideComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './slide-edit.component.html',
  styleUrl: './slide-edit.component.scss'
})
export class SlideEditComponent implements OnInit, OnDestroy {
  slide: any;
  markdown: any;
  slides: any;

  private subscriptions = new Subscription();

  constructor(private route: ActivatedRoute, private router: Router, private slideService: SlideService) {
    slideService.ngOnInit();
  }

  ngOnInit(): void {
    this.subscriptions.add(this.slideService.currentMarkdown.subscribe(markdown => {
      this.markdown = markdown;
    }));
    this.subscriptions.add(this.slideService.currentSlides.subscribe(slides => {
      this.slides = slides;
    }));

    const id = this.route.snapshot.paramMap.get("id");

    if (!id) {
      this.router.navigateByUrl("/slide/list");
    }

    this.slide = this.slideService.getSlideList().filter(slide => slide.id === Number(id))[0];
    this.slideService.changeMarkdown(this.slide.markdown);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  markdownChange(value: string) {
    this.slideService.changeMarkdown(value);
  }

  handleSaveSlide() {
    this.slideService.updateSlide({
      ...this.slide,
      markdown: this.markdown
    });
  }
}
