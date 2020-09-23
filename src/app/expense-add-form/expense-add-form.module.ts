import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { ExpenseAddFormPageRoutingModule } from './expense-add-form-routing.module';
import { ExpenseAddFormPage } from './expense-add-form.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    ExpenseAddFormPageRoutingModule
  ],
  declarations: [ExpenseAddFormPage]
})
export class ExpenseAddFormPageModule {}
