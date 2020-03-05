import { Component, OnInit, Input } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { Movement } from 'src/app/tabs/movements/movements.model';
import { ExpenseCategory } from 'src/app/expense-categories/expense-categories.model';
import { MovementsService } from 'src/app/tabs/movements/movements.service';
import { ExpenseCategoriesService } from 'src/app/expense-categories/expense-categories.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-spent-by-category',
  templateUrl: './spent-by-category.component.html',
  styleUrls: ['./spent-by-category.component.scss'],
})
export class SpentByCategoryComponent implements OnInit {
  @Input() movementList: Movement[];
  @Input() categoryList: ExpenseCategory[];
  selectedCategory = 'Aei13AILd4fvMPtzJlku';
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
    const cats: any = {};
    this.categoryList.forEach(category => {
      cats[category.id] = { name: category.name, amountSpent: 0, budget: category.plannedExpense };
    });
    this.movementList = this.movementList.filter((movement) => movement.type === 'EGRESO');
    this.movementList.forEach(movement => {
      if (cats[movement.category.id]) {
        cats[movement.category.id].amountSpent += movement.amount;
      }
    });
    const spent = cats[this.selectedCategory] ? cats[this.selectedCategory].amountSpent : 0;
    const budget = cats[this.selectedCategory] ? cats[this.selectedCategory].budget - spent : 0;
    this.pieChartData[0] = spent;
    this.pieChartData[1] = budget;
    this.loading = false;
  }
}
