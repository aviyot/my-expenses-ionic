import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { HomePage } from "./home.page";

import { HomePageRoutingModule } from "./home-routing.module";
import { ControlButtonsComponent } from "../control-buttons/control-buttons.component";
import { ExpensesComponent } from "../expenses/expenses.component";
import { ExpenseDetailsComponent } from "../expense-details/expense-details.component";
import { SortModalComponent } from "../sort-modal/sort-modal.component";
import { FilterExpensesComponent } from '../filter-expenses/filter-expenses.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
  declarations: [
    HomePage,
    ControlButtonsComponent,
    ExpensesComponent,
    ExpenseDetailsComponent,
    SortModalComponent,
    FilterExpensesComponent
  ],
})
export class HomePageModule {}
