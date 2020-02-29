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
    this.movementList = this.movementsService.getListValues();
  }

}
