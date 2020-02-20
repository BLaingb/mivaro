import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-exchange-form',
  templateUrl: './exchange-form.component.html',
  styleUrls: ['./exchange-form.component.scss'],
})
export class ExchangeFormComponent implements OnInit {
  form: FormGroup;
  @Output() formEmitter = new EventEmitter<FormGroup>(true);

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      date: [new Date(), Validators.required],
      amount: ['', Validators.required],
      description: ['', Validators.required],
      sourceAccount: ['', Validators.required],
      destinationAccount: ['', Validators.required]
    });
    this.form.valueChanges.subscribe(() => {
      this.formEmitter.emit(this.form);
    });
  }

}
