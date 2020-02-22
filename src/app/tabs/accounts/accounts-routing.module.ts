import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountsPage } from './accounts.page';

const routes: Routes = [
  {
    path: '',
    component: AccountsPage
  },
  {
    path: 'new',
    loadChildren: () => import('./new-account/new-account.module').then( m => m.NewAccountPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountsPageRoutingModule {}
