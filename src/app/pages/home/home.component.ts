import { NgFor } from '@angular/common';
import { Component, DoCheck, OnInit, SecurityContext } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import showdown from "showdown";

const converter = new showdown.Converter({
  tables: true
});

@Component({
  selector: 'app-home',
  imports: [
    FormsModule,
    NgFor
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements DoCheck, OnInit {
  markdownText: string = "";
  slides: any = [];

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const markdownText = localStorage.getItem("@angular-slideshow-maker/markdownText");

    if (markdownText) {
      this.markdownText = markdownText;
    }
  }

  ngDoCheck(): void {
    // Get each slide content
    const splittedMarkdownText = this.markdownText.split('---\n');

    const serializedMarkdownText = splittedMarkdownText.map(text => {
      const html = converter.makeHtml(text);

      return this.sanitizer.sanitize(SecurityContext.HTML, this.sanitizer.bypassSecurityTrustHtml(html));
    });

    this.slides = serializedMarkdownText;

    // Update storage
    localStorage.setItem("@angular-slideshow-maker/markdownText", this.markdownText);
  }
}
