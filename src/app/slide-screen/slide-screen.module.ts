import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SlideScreenPageRoutingModule } from './slide-screen-routing.module';

import { SlideScreenPage } from './slide-screen.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SlideScreenPageRoutingModule
  ],
  declarations: [SlideScreenPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SlideScreenPageModule {}
