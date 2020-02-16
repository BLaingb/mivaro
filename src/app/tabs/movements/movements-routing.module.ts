import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovementsPage } from './movements.page';

const routes: Routes = [
  {
    path: '',
    component: MovementsPage
  },
  {
    path: 'new',
    loadChildren: () => import('./new-movement/new-movement.module').then( m => m.NewMovementPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovementsPageRoutingModule {}
