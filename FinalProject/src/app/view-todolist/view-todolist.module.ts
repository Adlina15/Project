import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewTodolistPageRoutingModule } from './view-todolist-routing.module';

import { ViewTodolistPage } from './view-todolist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewTodolistPageRoutingModule
  ],
  declarations: [ViewTodolistPage]
})
export class ViewTodolistPageModule {}
