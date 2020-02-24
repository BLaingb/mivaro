import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovementsPage } from './movements.page';
import { MovementsPageRoutingModule } from './movements-routing.module';
import { MovementItemComponent } from './movement-item/movement-item.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovementsPageRoutingModule,
    SharedModule
  ],
  declarations: [MovementsPage, MovementItemComponent]
})
export class MovementsPageModule {}
