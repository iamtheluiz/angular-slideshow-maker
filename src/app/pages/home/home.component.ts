import { NgFor } from '@angular/common';
import { Component, DoCheck, OnInit, SecurityContext } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

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
    const splittedMarkdownText = this.markdownText.split('---');

    const serializedMarkdownText = splittedMarkdownText.map(text => {
      const splittedLines = text.split('\n');

      const serializedLines = splittedLines.filter(line => line !== "").map(line => {
        let serializedLine = line.replaceAll("\n", "<br>");

        if (line.startsWith("# ")) {
          serializedLine = `<h1>${line.split("# ")[1]}</h1>`;
        } else {
          serializedLine = `<p>${line}</p>`;
        }

        return serializedLine;
      })

      return this.sanitizer.sanitize(SecurityContext.HTML, this.sanitizer.bypassSecurityTrustHtml(serializedLines.join('')));
    });



    this.slides = serializedMarkdownText;

    // Update storage
    localStorage.setItem("@angular-slideshow-maker/markdownText", this.markdownText);
  }
}
