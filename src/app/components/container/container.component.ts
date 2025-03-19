import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { FullscreenService } from '../../services/slides/fullscreen.service';

@Component({
  selector: 'app-container',
  imports: [],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent implements AfterViewInit, OnDestroy {
  fullscreen: boolean = false;

  @ViewChild('section') section!: ElementRef<HTMLElement>;

  private subscriptions = new Subscription();

  constructor(private fullscreenService: FullscreenService) { }

  ngAfterViewInit(): void {
    this.subscriptions.add(this.fullscreenService.currentFullscreen.subscribe(fullscreen => {
      this.section.nativeElement.parentElement?.setAttribute('style', fullscreen ? 'max-width: 100%' : '');

      console.log(this.section.nativeElement)

      this.fullscreen = fullscreen;
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
