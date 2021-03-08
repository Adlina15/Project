import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewTodolistPage } from './view-todolist.page';

const routes: Routes = [
  {
    path: '',
    component: ViewTodolistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewTodolistPageRoutingModule {}
