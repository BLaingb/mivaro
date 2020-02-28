import { Component, OnInit } from '@angular/core';
import { ExpenseCategoriesService } from './expense-categories.service';
import { ExpenseCategory } from './expense-categories.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
      this.expenseCatService.addDocument({ ...this.form.value });
      this.form.reset();
    }
  }

  async delete(id: string) {
    this.expenseCatService.deleteById(id);
  }

}
