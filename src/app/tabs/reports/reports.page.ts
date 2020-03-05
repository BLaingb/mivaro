import { Component, OnInit } from '@angular/core';
import { MovementsService } from '../movements/movements.service';
import { ExpenseCategoriesService } from 'src/app/expense-categories/expense-categories.service';
import { HelpersService } from 'src/app/shared/helpers.service';
import { LoadingController } from '@ionic/angular';
import { Movement } from '../movements/movements.model';
import { ExpenseCategory } from 'src/app/expense-categories/expense-categories.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
  movements: Movement[] = [];
  categories: ExpenseCategory[] = [];

  constructor(
    private movementsService: MovementsService,
    private categoriesService: ExpenseCategoriesService,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {

  }

  async loadLists() {
    const loader = await this.loadingCtrl.create();
    loader.present();
    this.movementsService.getListObservable().pipe(take(1)).subscribe(movs => this.movements = movs);
    this.categoriesService.getListObservable().pipe(take(1)).subscribe(catgs => this.categories = catgs);
    loader.dismiss();
  }

}
