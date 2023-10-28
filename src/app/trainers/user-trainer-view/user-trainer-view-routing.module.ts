import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserTrainerViewPage } from './user-trainer-view.page';

const routes: Routes = [
  {
    path: '',
    component: UserTrainerViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserTrainerViewPageRoutingModule {}
