import { Component, OnInit } from '@angular/core';
import { ExpenseCategoriesService } from './expense-categories.service';
import { ExpenseCategory } from './expense-categories.model';

@Component({
  selector: 'app-expense-categories',
  templateUrl: './expense-categories.page.html',
  styleUrls: ['./expense-categories.page.scss'],
})
export class ExpenseCategoriesPage implements OnInit {
  categories: ExpenseCategory[];

  constructor(private expenseCatService: ExpenseCategoriesService) { }

  ngOnInit() {
    this.expenseCatService.getListObservable().subscribe(categories => {
      this.categories = categories;
      console.log('Categories: ', categories);
    });
  }

}
