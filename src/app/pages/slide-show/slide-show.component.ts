import { Component } from '@angular/core';
import { SlideshowComponent } from "../../components/slideshow/slideshow.component";

@Component({
  selector: 'app-slide-show',
  imports: [
    SlideshowComponent
  ],
  templateUrl: './slide-show.component.html',
  styleUrl: './slide-show.component.scss'
})
export class SlideShowComponent {

}
