import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { Slide } from '../../interfaces/slide';
import { SlideService } from '../../services/slides/slide.service';
import { ContentComponent } from "../../components/content/content.component";
import { SlideComponent } from "../../components/slide/slide.component";
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-slide-list',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    RouterLink,
    ContentComponent,
    SlideComponent,
    NgForOf
],
  templateUrl: './slide-list.component.html',
  styleUrl: './slide-list.component.scss'
})
export class SlideListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'name', 'preview', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource<Slide>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private subscriptions = new Subscription();

  constructor(private slideService: SlideService) {
    this.slideService.ngOnInit();
  }

  ngOnInit(): void {
    this.subscriptions.add(this.slideService.currentSlideList.subscribe(slideList => {
      this.dataSource.data = slideList;
    }))
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  handleDeleteSlide(id: number) {
    this.slideService.deleteSlide(id);
  }

  formatSlideHtml(markdown: string) {
    return this.slideService.getSlideHtml(markdown);
  }
}
