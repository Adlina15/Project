import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditExamPageRoutingModule } from './edit-exam-routing.module';

import { EditExamPage } from './edit-exam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditExamPageRoutingModule
  ],
  declarations: [EditExamPage]
})
export class EditExamPageModule {}
