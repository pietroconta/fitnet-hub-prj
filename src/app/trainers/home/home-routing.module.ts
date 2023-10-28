import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { UserTrainerViewPageRoutingModule } from '../user-trainer-view/user-trainer-view-routing.module';

const routes: Routes = [

  {
    path: '',
    component: HomePage,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
