import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { MovementsService } from '../movements/movements.service';
import { Movement } from '../movements/movements.model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
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

  movementList: Movement[];

  constructor(private movementsService: MovementsService) { }

  ngOnInit() {
    let spent = 0;
    this.movementList = this.movementsService.getListValues();
    this.movementList = this.movementList.filter((movement) => {
      return movement.category && movement.category.id === this.selectedCategory;
    });
    this.movementList.forEach(movement => {
      spent += movement.amount;
    });
    this.pieChartData[0] = spent;
    this.pieChartData[1] = 4150 - spent;
  }

}
