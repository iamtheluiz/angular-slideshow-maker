import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SlideService } from '../../services/slides/slide.service';
import { SlideComponent } from "../../components/slide/slide.component";
import { NgFor } from '@angular/common';
import { FullscreenService } from '../../services/slides/fullscreen.service';
import { PdfService } from '../../services/slides/pdf.service';

@Component({
  selector: 'app-slide-export',
  imports: [
    SlideComponent,
    NgFor
  ],
  templateUrl: './slide-export.component.html',
  styleUrl: './slide-export.component.scss'
})
export class SlideExportComponent implements AfterViewInit {
  slide: any;
  slides: any;

  private subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private slideService: SlideService,
    private fullscreenService: FullscreenService,
    private pdfService: PdfService
  ) {
    slideService.ngOnInit();
  }

  ngOnInit(): void {
    this.subscriptions.add(this.slideService.currentSlides.subscribe(slides => {
      this.slides = slides;
    }));

    const id = this.route.snapshot.paramMap.get("id");

    if (!id) {
      this.router.navigateByUrl("/slide/list");
    }

    this.slide = this.slideService.getSlideList().filter(slide => slide.id === Number(id))[0];
    this.slideService.changeMarkdown(this.slide.markdown);

    this.fullscreenService.setFullscreen(true);
  }

  ngAfterViewInit(): void {
    this.pdfService.generatePdf();
  }
}
