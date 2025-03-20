import { Injectable, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import defaultData from "../../fixtures/data.json";
import showdown from "showdown";
import { Slide } from '../../interfaces/slide';

const converter = new showdown.Converter({
  tables: true
});

@Injectable({
  providedIn: 'root'
})
export class SlideService implements OnInit {
  private slideListSource = new BehaviorSubject<Array<Slide>>([]);
  private slidesSource = new BehaviorSubject<any>(null);
  private markdownSource = new BehaviorSubject<string>("");

  currentSlideList = this.slideListSource.asObservable();
  currentSlides = this.slidesSource.asObservable();
  currentMarkdown = this.markdownSource.asObservable();

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    let slideList = JSON.parse(localStorage.getItem("@angular-slideshow-maker/slide-list") ?? "[]");

    this.slideListSource.next(slideList);
  }

  private updateSlides(markdown: string): void {
    // Get each slide content
    const splittedMarkdownText = markdown.split('---\n');

    const serializedMarkdownText = splittedMarkdownText.map(text => {
      const html = converter.makeHtml(text);

      return this.sanitizer.sanitize(SecurityContext.HTML, this.sanitizer.bypassSecurityTrustHtml(html));
    });

    this.changeSlides(serializedMarkdownText);
  }

  private updateLocalStorage() {
    localStorage.setItem("@angular-slideshow-maker/slide-list", JSON.stringify(this.slideListSource.value));
  }

  changeSlides(slides: any) {
    this.slidesSource.next(slides);
  }

  changeMarkdown(markdown: string) {
    this.markdownSource.next(markdown);

    this.updateSlides(markdown);
  }

  getSlideList() {
    return this.slideListSource.value;
  }

  setCurrentSlide(id: number) {
    const slide = this.slideListSource.value.filter(slide => slide.id === id)[0];

    this.changeMarkdown(slide.markdown ?? defaultData.defaultMarkdownValue);
  }

  createSlide(slide: Slide) {
    const id = Math.max(...this.slideListSource.value.map(slide => slide.id), 0) + 1

    const serializedSlide: Slide = {
      ...slide,
      id,
      createdAt: new Date(),
    }

    const newSlideList = [
      ...this.slideListSource.value,
      serializedSlide
    ];

    this.slideListSource.next(newSlideList);
    this.updateLocalStorage();
  }

  updateSlide(slide: Slide) {
    const updatedSlideList = this.slideListSource.value.map(item => {
      if (item.id !== slide.id) {
        return item;
      }

      return slide;
    })

    this.slideListSource.next(updatedSlideList);
    this.updateLocalStorage();
  }

  deleteSlide(id: number) {
    const newSlideList = this.slideListSource.value.filter(slide => slide.id !== id);

    this.slideListSource.next(newSlideList);
    this.updateLocalStorage();
  }
}
