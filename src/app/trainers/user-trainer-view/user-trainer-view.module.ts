import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserTrainerViewPageRoutingModule } from './user-trainer-view-routing.module';

import { UserTrainerViewPage } from './user-trainer-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserTrainerViewPageRoutingModule
  ],
  declarations: [UserTrainerViewPage]
})
export class UserTrainerViewPageModule {}
