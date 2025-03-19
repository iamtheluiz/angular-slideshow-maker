import { Component, OnInit } from '@angular/core';
import { SlideshowComponent } from "../../components/slideshow/slideshow.component";
import { ActivatedRoute, Router } from '@angular/router';
import { Slide } from '../../interfaces/slide';
import { SlideService } from '../../services/slides/slide.service';

@Component({
  selector: 'app-slide-show',
  imports: [
    SlideshowComponent
  ],
  templateUrl: './slide-show.component.html',
  styleUrl: './slide-show.component.scss'
})
export class SlideShowComponent implements OnInit {
  slide!: Slide;

  constructor(private route: ActivatedRoute, private router: Router, private slideService: SlideService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigateByUrl("/slide/list");
      return;
    }

    this.slide = this.slideService.getSlideList().filter(slide => slide.id === Number(id))[0]
  }
}
