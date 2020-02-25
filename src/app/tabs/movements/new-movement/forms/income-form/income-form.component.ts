import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Account } from 'src/app/tabs/accounts/accounts.model';
import { MovementForm } from '../movement-form';
import { AccountsService } from 'src/app/tabs/accounts/accounts.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.scss'],
})
export class IncomeFormComponent extends MovementForm implements OnInit {
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
      source: ['', Validators.required],
      amount: ['', Validators.required],
      description: ['', Validators.required],
      account: ['', Validators.required]
    });
    this.accounts = this.accountsService.getListObservable().pipe(take(1));
    this.form.valueChanges.subscribe(() => {
      if (this.form.valid) {
        this.form.value.account = this.accountsService.getDocumentReference(this.form.value.account);
      }
      this.formEmitter.emit(this.form);
    });
  }

}
