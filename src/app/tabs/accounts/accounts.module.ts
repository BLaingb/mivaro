import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountsPage } from './accounts.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: AccountsPage }])
  ],
  declarations: [AccountsPage]
})
export class AccountsPageModule {}
