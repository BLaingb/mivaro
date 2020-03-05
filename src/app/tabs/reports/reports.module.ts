import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ChartsModule } from 'ng2-charts';
import { ReportsPage } from './reports.page';
import { SpentByCategoryComponent } from './charts/spent-by-category/spent-by-category.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: ReportsPage }]),
    ChartsModule
  ],
  declarations: [ReportsPage, SpentByCategoryComponent]
})
export class ReportsPageModule {}
