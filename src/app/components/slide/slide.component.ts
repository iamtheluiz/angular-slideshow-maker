import { AfterViewInit, ChangeDetectorRef, Component, DoCheck, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-slide',
  imports: [],
  templateUrl: './slide.component.html',
  styleUrl: './slide.component.scss'
})
export class SlideComponent implements AfterViewInit, DoCheck {
  @Input() html = "";
  @Input() full = false;

  @ViewChild('slide') slide: any;

  relativeFontSize = 0;
  relativePadding = 0;

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
    const baseFontSize = 42;
    const basePadding = 64;

    const slideElement = this.slide.nativeElement as HTMLDivElement;

    this.relativeFontSize = Number((slideElement.clientWidth * baseFontSize) / baseWidth);
    this.relativePadding = Number((slideElement.clientWidth * basePadding) / baseWidth);

    this.cdr.detectChanges();
  }
}