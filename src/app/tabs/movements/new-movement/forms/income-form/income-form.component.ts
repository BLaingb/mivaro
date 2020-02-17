import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.scss'],
})
export class IncomeFormComponent implements OnInit {
  incomeForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.incomeForm = this.fb.group({
      date: ['', Validators.required],
      source: ['', Validators.required],
      amount: ['', Validators.required],
      description: ['', Validators.required],
      account: ['', Validators.required]
    });
  }

}
