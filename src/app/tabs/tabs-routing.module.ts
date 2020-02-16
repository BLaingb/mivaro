import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'movements',
        children: [
          {
            path: '',
            loadChildren: () => import('./movements/movements.module').then( m => m.MovementsPageModule)
          }
        ]
      },
      {
        path: 'accounts',
        children: [
          {
            path: '',
            loadChildren: () => import('./accounts/accounts.module').then( m => m.AccountsPageModule)
          }
        ]
      },
      {
        path: 'reports',
        children: [
          {
            path: '',
            loadChildren: () => import('./reports/reports.module').then( m => m.ReportsPageModule)
          }
        ]
      },
      {
        path: 'config',
        children: [
          {
            path: '',
            loadChildren: () => import('./configuration/configuration.module').then( m => m.ConfigurationPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/movements',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/movements',
    pathMatch: 'full'
  },
  {
    path: 'new-movement',
    loadChildren: () => import('./movements/new-movement/new-movement.module').then( m => m.NewMovementPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
