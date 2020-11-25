import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpenseAddFormPage } from './expense-add-form.page';

const routes: Routes = [
  {
    path: '',
    component: ExpenseAddFormPage
  },
  {
    path: 'edit/:id',
    component: ExpenseAddFormPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpenseAddFormPageRoutingModule {}
