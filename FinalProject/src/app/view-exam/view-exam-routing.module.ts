import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewExamPage } from './view-exam.page';

const routes: Routes = [
  {
    path: '',
    component: ViewExamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewExamPageRoutingModule {}
