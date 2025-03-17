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
  private slideListSource = new BehaviorSubject<Array<Slide>>([
    {
      id: 1,
      name: "Example 1",
      markdown: "# Introduction\nWelcome to our slideshow presentation! This tool allows you to create dynamic presentations using simple Markdown syntax. \n---\n# Features\n- Easy to use: Just write in Markdown!\n- Local storage: All generated data is stored on your machine.\n---\n# How to Use\n1. Write your content in Markdown format.\n2. Use '---' to separate different slides.\n3. Preview your slides and make adjustments as needed.\n---\n# Example Table\n| Name           | Genre    | Rating |\n|----------------|----------|--------|\n| Toradora       | Romance  | 10     |\n| 86: Eighty-Six | Drama    | 10     |\n---\n# Conclusion\nThank you for using our slideshow generator! We hope you enjoy creating your presentations.\n",
      createdAt: new Date()
    },
    {
      id: 2,
      name: "Example 2",
      markdown: "# Overview\nThis presentation covers the basics of Markdown and its applications in creating slideshows.\n---\n# What is Markdown?\nMarkdown is a lightweight markup language with plain-text formatting syntax.\n---\n# Benefits of Using Markdown\n- **Simplicity**: Easy to learn and use.\n- **Flexibility**: Can be converted to HTML and other formats.\n---\n# Markdown Syntax Examples\n- Headers: `# Header 1`, `## Header 2`\n- Lists: `- Item 1`, `1. Item 2`\n---\n# Conclusion\nMarkdown is a powerful tool for creating content quickly and efficiently.\n",
      createdAt: new Date()
    },
    {
      id: 3,
      name: "Example 3",
      markdown: "# Introduction to AI\nArtificial Intelligence (AI) is the simulation of human intelligence in machines.\n---\n# Types of AI\n1. **Narrow AI**: Specialized in one task.\n2. **General AI**: Can perform any intellectual task that a human can do.\n---\n# Applications of AI\n- Healthcare: Diagnosis and treatment recommendations.\n- Finance: Fraud detection and risk management.\n---\n# Future of AI\nThe future of AI holds great potential for advancements in various fields.\n",
      createdAt: new Date()
    },
    {
      id: 4,
      name: "Example 4",
      markdown: "# Web Development Trends\nExplore the latest trends in web development for 2025.\n---\n# Key Trends\n- **Progressive Web Apps (PWAs)**: Combining the best of web and mobile apps.\n- **Serverless Architecture**: Reducing server management overhead.\n---\n# Tools to Watch\n- **React**: A JavaScript library for building user interfaces.\n- **Vue.js**: A progressive framework for building UIs.\n---\n# Conclusion\nStaying updated with trends is crucial for web developers to remain competitive.\n",
      createdAt: new Date()
    },
    {
      id: 5,
      name: "Example 5",
      markdown: "# Healthy Eating\nUnderstanding the importance of nutrition and healthy eating habits.\n---\n# Nutritional Guidelines\n- **Fruits and Vegetables**: Aim for at least 5 servings a day.\n- **Whole Grains**: Choose whole grains over refined grains.\n---\n# Benefits of Healthy Eating\n- Improved mood and energy levels.\n- Reduced risk of chronic diseases.\n---\n# Conclusion\nAdopting healthy eating habits can lead to a better quality of life.\n",
      createdAt: new Date()
    },
    {
      id: 6,
      name: "Example 6",
      markdown: "# Introduction to Python\nPython is a high-level programming language known for its readability and versatility.\n---\n# Key Features\n- **Easy to Learn**: Great for beginners.\n- **Extensive Libraries**: Supports various applications.\n---\n# Popular Frameworks\n- **Django**: For web development.\n- **Pandas**: For data analysis.\n---\n# Conclusion\nPython continues to grow in popularity and is widely used in many industries.\n",
      createdAt: new Date()
    }
  ]
  );
  private slidesSource = new BehaviorSubject<any>(null);
  private markdownSource = new BehaviorSubject<string>("");

  currentSlideList = this.slideListSource.asObservable();
  currentSlides = this.slidesSource.asObservable();
  currentMarkdown = this.markdownSource.asObservable();

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // let slideList = JSON.parse(localStorage.getItem("@angular-slideshow-maker/slide-list") ?? "[]");

    // this.slideListSource.next(slideList);
  }

  changeSlides(slides: any) {
    this.slidesSource.next(slides);
  }

  changeMarkdown(markdown: string) {
    this.markdownSource.next(markdown);

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
  }

  deleteSlide(id: number) {
    const newSlideList = this.slideListSource.value.filter(slide => slide.id !== id);

    this.slideListSource.next(newSlideList);
  }
}
