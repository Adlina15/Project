import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewExamPageRoutingModule } from './view-exam-routing.module';

import { ViewExamPage } from './view-exam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewExamPageRoutingModule
  ],
  declarations: [ViewExamPage]
})
export class ViewExamPageModule {}
