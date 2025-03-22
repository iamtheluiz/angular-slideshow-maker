import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { SlideService } from '../../services/slides/slide.service';
import { MatIconModule } from '@angular/material/icon';
import { ContentComponent } from "../../components/content/content.component";
import { SlideshowComponent } from "../../components/slideshow/slideshow.component";

@Component({
  selector: 'app-slide-edit',
  imports: [
    FormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ContentComponent,
    SlideshowComponent
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
