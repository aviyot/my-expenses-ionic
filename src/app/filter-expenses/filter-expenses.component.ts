import { Component, OnInit } from "@angular/core";
import { Expense } from "../models/expense.model";
import { ExpensesService } from "../services/expenses/expenses.service";

@Component({
  selector: "app-filter-expenses",
  templateUrl: "./filter-expenses.component.html",
  styleUrls: ["./filter-expenses.component.scss"],
})
export class FilterExpensesComponent implements OnInit {
  startTime: Date;
  endTime: Date;
  filteredExpenses: Expense[] = [];
  fillterType: string;
  showStartDate = false;
  showEndDate = false;
  constructor(private expensesService: ExpensesService) {}

  ngOnInit() {
    this.expensesService.expenses.subscribe((expenses)=>{
      this.filteredExpenses = expenses
    });
  }

  changeStartTime(val: any) {
    this.startTime = val;
  }

  changeEndTime(val: any) {
    this.endTime = val;
  }

  filter() {
    const pastDtae = new Date(2000, 1, 1);
    const futtureDtae = new Date(2100, 1, 1);
    let startTime = new Date(this.startTime).getTime();
    let endTime = new Date(this.endTime).getTime();

    switch (this.fillterType) {
      case "fromDate":
        this.expensesService.filteredExpenses = this.expensesService.filterDateExpenses(
          this.filteredExpenses,
          pastDtae.getTime(),
          endTime
        );
        break;
      case "untilDate":
        this.expensesService.filteredExpenses = this.expensesService.filterDateExpenses(
          this.filteredExpenses,
          startTime,
          futtureDtae.getTime()
        );
        break;
      case "futture":
        this.expensesService.filteredExpenses = this.expensesService.filterDateExpenses(
          this.filteredExpenses,
          new Date().getTime(),
          futtureDtae.getTime()
        );
        break;
      case "finished":
        this.expensesService.filteredExpenses = this.expensesService.filterDateExpenses(
          this.filteredExpenses,
          pastDtae.getTime(),
          new Date().getTime()
        );
        break;
      case "betwwen":
        this.expensesService.filteredExpenses = this.expensesService.filterDateExpenses(
          this.filteredExpenses,
          startTime,
          endTime
        );
        break;
      case "all":
        this.expensesService.filteredExpenses = this.filteredExpenses;
    }
  }

  endTimeFilter(fillterType) {
    this.fillterType = fillterType.value;

    switch (this.fillterType) {
      case "fromDate":
        this.showStartDate = true;
        this.showEndDate = false;
        break;
      case "untilDate":
        this.showStartDate = false;
        this.showEndDate = true;
        break;
      case "futture":
        this.showStartDate = false;
        this.showEndDate = false;
        break;
      case "finished":
        this.showStartDate = false;
        this.showEndDate = false;
        break;
      case "betwwen":
        this.showStartDate = true;
        this.showEndDate = true;
        break;
        case "all":
          this.showStartDate = false;
          this.showEndDate = false;
          break;
    }
  }
}
