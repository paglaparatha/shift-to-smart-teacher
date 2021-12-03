import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { ForgotComponent } from '../forgot/forgot.component';



@NgModule({
  declarations: [NavbarComponent, ForgotComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule,
  ],
  exports: [NavbarComponent, ForgotComponent]
})
export class ComponentModule { }
