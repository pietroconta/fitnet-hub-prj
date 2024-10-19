import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SlideScreenPage } from './slide-screen.page';

const routes: Routes = [
  {
    path: '',
    component: SlideScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SlideScreenPageRoutingModule {}
