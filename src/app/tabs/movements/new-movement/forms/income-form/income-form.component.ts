import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Account } from 'src/app/tabs/accounts/accounts.model';
import { AccountsService } from 'src/app/tabs/accounts/accounts.service';
import { MovementForm } from '../movement-form';
import { IncomeSource } from 'src/app/income-sources/income-source.model';
import { IncomeSourcesService } from 'src/app/income-sources/income-sources.service';

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.scss'],
})
export class IncomeFormComponent extends MovementForm implements OnInit {
  form: FormGroup;
  accounts: Observable<Account[]>;
  incomeSources: Observable<IncomeSource[]>;
  @Output() formEmitter = new EventEmitter<FormGroup>(true);

  constructor(
    private fb: FormBuilder,
    private accountsService: AccountsService,
    private incomeSourcesService: IncomeSourcesService) {
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
    this.incomeSources = this.incomeSourcesService.getListObservable().pipe(take(1));
    this.form.valueChanges.subscribe(() => {
      if (this.form.valid) {
        this.form.value.account = this.accountsService.getDocumentReference(this.form.value.account);
      }
      this.formEmitter.emit(this.form);
    });
  }

}
