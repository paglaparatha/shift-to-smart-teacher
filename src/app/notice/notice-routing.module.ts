import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoticePage } from './notice.page';

const routes: Routes = [
  {
    path: '',
    component: NoticePage
  },
  {
    path: 'view/:id',
    loadChildren: () => import('./view/view.module').then( m => m.ViewPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoticePageRoutingModule {}
