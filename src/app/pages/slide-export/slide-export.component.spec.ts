import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideExportComponent } from './slide-export.component';

describe('SlideExportComponent', () => {
  let component: SlideExportComponent;
  let fixture: ComponentFixture<SlideExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideExportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
