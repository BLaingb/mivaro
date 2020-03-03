import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MovementForm } from '../movement-form';
import { Account } from 'src/app/tabs/accounts/accounts.model';
import { AccountsService } from 'src/app/tabs/accounts/accounts.service';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ExpenseCategoriesService } from 'src/app/expense-categories/expense-categories.service';
import { ExpenseCategory } from 'src/app/expense-categories/expense-categories.model';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss'],
})
export class ExpenseFormComponent extends MovementForm implements OnInit {
  form: FormGroup;
  accounts: Observable<Account[]>;
  categories: Observable<ExpenseCategory[]>;
  @Output() formEmitter = new EventEmitter<FormGroup>(true);

  constructor(
    private fb: FormBuilder,
    private accountsService: AccountsService,
    private categoriesService: ExpenseCategoriesService) {
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
    this.accounts = this.accountsService.getListObservable().pipe(take(1));
    this.categories = this.categoriesService.getListObservable().pipe(take(1));
    this.form.valueChanges.subscribe(() => {
      if (this.form.valid) {
        this.form.value.account = this.accountsService.getDocumentReference(this.form.value.account);
        this.form.value.category = this.categoriesService.getDocumentReference(this.form.value.category);
      }
      this.formEmitter.emit(this.form);
    });
  }
}
