import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MovementForm } from '../movement-form';
import { AccountsService } from 'src/app/tabs/accounts/accounts.service';
import { Account } from 'src/app/tabs/accounts/accounts.model';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-exchange-form',
  templateUrl: './exchange-form.component.html',
  styleUrls: ['./exchange-form.component.scss'],
})
export class ExchangeFormComponent extends MovementForm implements OnInit {
  form: FormGroup;
  accounts: Observable<Account[]>;
  @Output() formEmitter = new EventEmitter<FormGroup>(true);

  constructor(
    private fb: FormBuilder,
    private accountsService: AccountsService) {
    super();
  }

  ngOnInit() {
    this.form = this.fb.group({
      date: [new Date(), Validators.required],
      amount: ['', Validators.required],
      description: ['', Validators.required],
      sourceAccount: ['', Validators.required],
      destinationAccount: ['', Validators.required]
    });
    this.accounts = this.accountsService.getListObservable().pipe(take(1));
    this.form.valueChanges.subscribe(() => {
      if (this.form.valid) {
        this.form.value.sourceAccount = this.accountsService.getDocumentReference(this.form.value.sourceAccount);
        this.form.value.destinationAccount = this.accountsService.getDocumentReference(this.form.value.destinationAccount);
      }
      this.formEmitter.emit(this.form);
    });
  }

}
