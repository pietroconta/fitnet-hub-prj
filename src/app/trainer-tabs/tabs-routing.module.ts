import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../trainers/home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'trainer-user-view/:id',
        loadChildren: () => import('../trainers/user-trainer-view/user-trainer-view.module').then((m) => m.UserTrainerViewPageModule),
      }

      /*{
        path: 'search',
        loadChildren: () =>
          import('../user-trainer-view/user-trainer-view-routing.module').then((m) => m.UserTrainerViewPageRoutingModule),
      },*/
      // Aggiungi altre schede qui se necessario
    ],

  },
  {
    path: '',
    redirectTo: 'tabs/home', // Imposta la scheda predefinita
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
