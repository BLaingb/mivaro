import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IncomeSourcesPageRoutingModule } from './income-sources-routing.module';
import { IncomeSourcesPage } from './income-sources.page';




@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    IncomeSourcesPageRoutingModule
  ],
  declarations: [IncomeSourcesPage]
})
export class IncomeSourcesPageModule {}
