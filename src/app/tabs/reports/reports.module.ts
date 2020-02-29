import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ChartsModule } from 'ng2-charts';
import { ReportsPage } from './reports.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: ReportsPage }]),
    ChartsModule
  ],
  declarations: [ReportsPage]
})
export class ReportsPageModule {}
