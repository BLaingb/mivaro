import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { NewMovementPageRoutingModule } from './new-movement-routing.module';

import { NewMovementPage } from './new-movement.page';
import { ReactiveFormsModule } from '@angular/forms';
import { ExpenseFormComponent } from './forms/expense-form/expense-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    NewMovementPageRoutingModule
  ],
  declarations: [NewMovementPage, ExpenseFormComponent]
})
export class NewMovementPageModule {}
