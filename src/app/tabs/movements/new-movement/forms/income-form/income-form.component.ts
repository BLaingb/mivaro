import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.scss'],
})
export class IncomeFormComponent implements OnInit {
  form: FormGroup;
  @Output() formEmitter = new EventEmitter<FormGroup>(true);

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      date: ['', Validators.required],
      source: ['', Validators.required],
      amount: ['', Validators.required],
      description: ['', Validators.required],
      account: ['', Validators.required]
    });
    this.form.valueChanges.subscribe(() => {
      this.formEmitter.emit(this.form);
    });
  }

}
