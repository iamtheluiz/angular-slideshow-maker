import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { Slide } from '../../interfaces/slide';
import { MatButtonModule } from '@angular/material/button';
import { SlideService } from '../../services/slides/slide.service';
import { Subscription } from 'rxjs';
import { ContainerComponent } from "../../components/container/container.component";
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-slide-list',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    ContainerComponent,
    RouterLink
],
  templateUrl: './slide-list.component.html',
  styleUrl: './slide-list.component.scss'
})
export class SlideListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'name', 'markdown', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource<Slide>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private subscriptions = new Subscription();

  constructor(private slideService: SlideService, private router: Router) {
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

  handleShowSlide(id: number) {
    this.slideService.setCurrentSlide(id);

    this.router.navigateByUrl("slide/show")
  }
  
  handleEditSlide(id: number) {
    this.slideService.setCurrentSlide(id);

    this.router.navigateByUrl("slide/edit")
  }

  handleDeleteSlide(id: number) {
    this.slideService.deleteSlide(id);
  }
}
