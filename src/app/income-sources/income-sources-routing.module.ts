import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncomeSourcesPage } from './income-sources.page';

const routes: Routes = [
  {
    path: '',
    component: IncomeSourcesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncomeSourcesPageRoutingModule {}
