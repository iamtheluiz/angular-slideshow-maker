import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideListComponent } from './slide-list.component';

describe('SlideListComponent', () => {
  let component: SlideListComponent;
  let fixture: ComponentFixture<SlideListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
