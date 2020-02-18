import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-exchange-form',
  templateUrl: './exchange-form.component.html',
  styleUrls: ['./exchange-form.component.scss'],
})
export class ExchangeFormComponent implements OnInit {
  exchangeForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.exchangeForm = this.fb.group({
      date: [new Date(), Validators.required],
      amount: ['', Validators.required],
      description: ['', Validators.required],
      sourceAccount: ['', Validators.required],
      destinationAccount: ['', Validators.required]
    });
  }

}
