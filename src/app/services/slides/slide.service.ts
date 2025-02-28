import { Injectable, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import showdown from "showdown";

const converter = new showdown.Converter({
  tables: true
});

@Injectable({
  providedIn: 'root'
})
export class SlideService implements OnInit {
  private slidesSource = new BehaviorSubject<any>(null);
  private markdownSource = new BehaviorSubject<string>(`# Introduction
Welcome to our slideshow presentation! This tool allows you to create dynamic presentations using simple Markdown syntax. 

---
# Features
- Easy to use: Just write in Markdown!
- Local storage: All generated data is stored on your machine.

---
# How to Use
1. Write your content in Markdown format.
2. Use '---' to separate different slides.
3. Preview your slides and make adjustments as needed.

---
# Example Table
| Name           | Genre    | Rating |
|----------------|----------|--------|
| Toradora       | Romance  | 10     |
| 86: Eighty-Six | Drama    | 10     |

---
# Conclusion
Thank you for using our slideshow generator! We hope you enjoy creating your presentations.
`);

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
