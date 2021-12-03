import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MarksheetsPageRoutingModule } from './marksheets-routing.module';

import { MarksheetsPage } from './marksheets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MarksheetsPageRoutingModule
  ],
  declarations: [MarksheetsPage]
})
export class MarksheetsPageModule {}
