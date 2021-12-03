import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TuitionsPageRoutingModule } from './tuitions-routing.module';

import { TuitionsPage } from './tuitions.page';
import { ComponentModule } from '../components/component/component.module';
import { TuitionStudentsComponent } from '../components/tuition-students/tuition-students.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TuitionsPageRoutingModule,
    ComponentModule
  ],
  declarations: [TuitionsPage, TuitionStudentsComponent]
})
export class TuitionsPageModule {}
