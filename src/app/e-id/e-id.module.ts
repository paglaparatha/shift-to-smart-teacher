import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EIdPageRoutingModule } from './e-id-routing.module';

import { EIdPage } from './e-id.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EIdPageRoutingModule
  ],
  declarations: [EIdPage]
})
export class EIdPageModule {}
