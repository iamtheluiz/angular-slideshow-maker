import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import defaultData from "../../fixtures/data.json";
import { SlideService } from '../../services/slides/slide.service';
import { ContentComponent } from "../../components/content/content.component";

@Component({
  selector: 'app-slide-create',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ContentComponent
],
  templateUrl: './slide-create.component.html',
  styleUrl: './slide-create.component.scss'
})
export class SlideCreateComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private slideService: SlideService, private router: Router) {
    this.slideService.ngOnInit();
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new FormControl("", Validators.required),
      markdown: new FormControl(defaultData.defaultMarkdownValue)
    })
  }

  handleSubmit() {
    if (this.formGroup.valid) {
      this.slideService.createSlide(this.formGroup.value);
      
      this.router.navigateByUrl("/slide/list")
    }
  }
}
