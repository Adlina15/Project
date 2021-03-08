import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditExamPage } from './edit-exam.page';

const routes: Routes = [
  {
    path: '',
    component: EditExamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditExamPageRoutingModule {}
