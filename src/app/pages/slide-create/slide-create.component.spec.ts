import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideCreateComponent } from './slide-create.component';

describe('SlideCreateComponent', () => {
  let component: SlideCreateComponent;
  let fixture: ComponentFixture<SlideCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
