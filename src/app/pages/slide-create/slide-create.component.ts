import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { ContainerComponent } from "../../components/container/container.component";

import defaultData from "../../fixtures/data.json";
import { SlideService } from '../../services/slides/slide.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slide-create',
  imports: [
    ReactiveFormsModule,
    ContainerComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
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
