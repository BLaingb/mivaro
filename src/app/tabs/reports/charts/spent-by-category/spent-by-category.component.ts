import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { ExpenseCategory } from 'src/app/expense-categories/expense-categories.model';
import { ExpenseCategoriesService } from 'src/app/expense-categories/expense-categories.service';
import { Movement } from 'src/app/tabs/movements/movements.model';
import { MovementsService } from 'src/app/tabs/movements/movements.service';

@Component({
  selector: 'app-spent-by-category',
  templateUrl: './spent-by-category.component.html',
  styleUrls: ['./spent-by-category.component.scss'],
})
export class SpentByCategoryComponent implements OnInit {
  @Input() movementList: Movement[];
  @Input() categoryList: ExpenseCategory[];
  private totalBudget = 0;
  private totalSpent = 0;
  public categories: any = {};
  public val: string;
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top'
    }
  };
  public pieChartLabels: Label[] = ['Gastado', 'Por Gastar'];
  public pieChartData: number[] = [300, 500];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)']
    }
  ];
  public loading = true;

  constructor(
    private movementsService: MovementsService,
    private categoriesService: ExpenseCategoriesService) { }

  ngOnInit() {
    this.load();
  }

  async load() {
    this.movementList = await this.movementsService.getList();
    this.categoryList = await this.categoriesService.getList();
    this.categoryList.forEach(category => {
      this.categories[category.id] = { name: category.name, amountSpent: 0, budget: category.plannedExpense };
      this.totalBudget += category.plannedExpense;
    });
    this.movementList = this.movementList.filter((movement) => movement.type === 'EGRESO');
    this.movementList.forEach(movement => {
      if (this.categories[movement.category.id]) {
        this.categories[movement.category.id].amountSpent += movement.amount;
        this.totalSpent += movement.amount;
      }
    });
    this.drawChart('ALL');
    this.loading = false;
  }

  drawChart(categoryId: string) {
    let spent = this.categories[categoryId] ? this.categories[categoryId].amountSpent : 0;
    let remaining = this.categories[categoryId] ? this.categories[categoryId].budget - spent : 0;
    if (categoryId === 'ALL') {
      spent = this.totalSpent;
      remaining = this.totalBudget - spent;
    }
    this.pieChartData = [spent, remaining];
  }
}
