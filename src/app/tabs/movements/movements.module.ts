import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovementsPage } from './movements.page';
import { MovementsPageRoutingModule } from './movements-routing.module';
import { MovementItemComponent } from './movement-item/movement-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovementsPageRoutingModule
  ],
  declarations: [MovementsPage, MovementItemComponent]
})
export class MovementsPageModule {}
