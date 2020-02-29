import { Component, OnInit } from '@angular/core';
import { ExpenseCategoriesService } from './expense-categories.service';
import { ExpenseCategory } from './expense-categories.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HelpersService } from '../shared/helpers.service';

@Component({
  selector: 'app-expense-categories',
  templateUrl: './expense-categories.page.html',
  styleUrls: ['./expense-categories.page.scss'],
})
export class ExpenseCategoriesPage implements OnInit {
  categories: ExpenseCategory[];
  form: FormGroup;

  constructor(
    private expenseCatService: ExpenseCategoriesService,
    private helpersService: HelpersService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
    this.expenseCatService.getListObservable().subscribe(categories => {
      this.categories = categories;
    });
  }

  initializeForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      plannedExpense: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onConfirm() {
    if (this.form.valid) {
      this.helpersService.handlePromise(
        this.expenseCatService.addDocument({ ...this.form.value }),
        {
          showToast: false
        }
      );
      this.form.reset();
    }
  }

  async delete(id: string) {
    this.helpersService.handlePromise(
      this.expenseCatService.deleteById(id),
      {
        showToast: false
      }
    );
  }

}
