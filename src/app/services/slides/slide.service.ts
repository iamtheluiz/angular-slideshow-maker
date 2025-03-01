import { Injectable, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import defaultData from "../../fixtures/data.json";
import showdown from "showdown";

const converter = new showdown.Converter({
  tables: true
});

@Injectable({
  providedIn: 'root'
})
export class SlideService implements OnInit {
  private slidesSource = new BehaviorSubject<any>(null);
  private markdownSource = new BehaviorSubject<string>(defaultData.defaultMarkdownValue);

  currentSlides = this.slidesSource.asObservable();
  currentMarkdown = this.markdownSource.asObservable();

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    let markdownText = localStorage.getItem("@angular-slideshow-maker/markdownText");

    if (!markdownText) {
      markdownText = this.markdownSource.value;
    }

    this.changeMarkdown(markdownText);
  }

  changeSlides(slides: any) {
    this.slidesSource.next(slides);
  }

  changeMarkdown(markdown: string) {
    this.markdownSource.next(markdown);

    // Update storage
    localStorage.setItem("@angular-slideshow-maker/markdownText", markdown);

    this.updateSlides(markdown);
  }

  updateSlides(markdown: string): void {
    // Get each slide content
    const splittedMarkdownText = markdown.split('---\n');

    const serializedMarkdownText = splittedMarkdownText.map(text => {
      const html = converter.makeHtml(text);

      return this.sanitizer.sanitize(SecurityContext.HTML, this.sanitizer.bypassSecurityTrustHtml(html));
    });

    this.changeSlides(serializedMarkdownText);
  }
}
