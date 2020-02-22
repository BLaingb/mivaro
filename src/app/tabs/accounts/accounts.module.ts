import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AccountsPageRoutingModule } from './accounts-routing.module';
import { AccountsPage } from './accounts.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule,
    AccountsPageRoutingModule
  ],
  declarations: [AccountsPage]
})
export class AccountsPageModule {}
