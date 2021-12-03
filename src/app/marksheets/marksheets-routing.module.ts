import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarksheetsPage } from './marksheets.page';

const routes: Routes = [
  {
    path: '',
    component: MarksheetsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarksheetsPageRoutingModule {}
