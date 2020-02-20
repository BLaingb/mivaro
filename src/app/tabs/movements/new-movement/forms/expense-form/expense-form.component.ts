import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MovementForm } from '../movement-form';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss'],
})
export class ExpenseFormComponent extends MovementForm implements OnInit {
  form: FormGroup;
  @Output() formEmitter = new EventEmitter<FormGroup>(true);

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.form = this.fb.group({
      date: [new Date(), Validators.required],
      category: ['', Validators.required],
      amount: ['', Validators.required],
      description: ['', Validators.required],
      account: ['', Validators.required],
      isBilled: ['']
    });
    this.form.valueChanges.subscribe(() => {
      this.formEmitter.emit(this.form);
    });
  }
}
