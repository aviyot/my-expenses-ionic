import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { IncomePageRoutingModule } from './income-routing.module';

import { IncomePage } from './income.page';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    IncomePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [IncomePage]
})
export class IncomePageModule {}
