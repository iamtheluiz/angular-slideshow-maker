import { AfterViewInit, ChangeDetectorRef, Component, DoCheck, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-slide',
  imports: [],
  templateUrl: './slide.component.html',
  styleUrl: './slide.component.scss'
})
export class SlideComponent implements AfterViewInit, DoCheck {
  @Input() html = "";

  @ViewChild('slide') slide: any;

  scale = 0;

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.calculateRelativeSize();
  }

  ngDoCheck(): void {
    this.calculateRelativeSize();
  }

  calculateRelativeSize() {
    if (!this.slide) return;

    const baseWidth = 1920;
    const baseHeight = 1080;
    const baseScale = 1;

    const slideElement = this.slide.nativeElement as HTMLDivElement;

    this.scale = Number((slideElement.parentElement!.clientWidth * baseScale) / baseWidth);

    slideElement.parentElement!.scrollLeft = (slideElement.parentElement!.scrollWidth - (baseWidth * this.scale)) / 2;
    slideElement.parentElement!.scrollTop = (slideElement.parentElement!.scrollHeight - (baseHeight * this.scale)) / 2;

    this.cdr.detectChanges();
  }
}