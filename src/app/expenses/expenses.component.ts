import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { ExpensesService } from "../services/expenses/expenses.service";
import { Expense } from "../models/expense.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-expenses",
  templateUrl: "./expenses.component.html",
  styleUrls: ["./expenses.component.scss"],
})
export class ExpensesComponent implements OnInit {
  expenses: Expense[] = [];
  selectedId: number = null;

  constructor(
    private router: Router,
    private expensesService: ExpensesService
  ) {}

  ngOnInit() {
    this.expensesService.dataLoaded.subscribe((val) => {
      if (val) {
        this.expenses = this.expensesService.expenses;
        this.expenses.sort((a, b) => b.amount - a.amount);
      }
    });

    this.expensesService.dataChanged.subscribe(() => {
      this.expenses = this.expensesService.expenses;
      this.expenses.sort((a, b) => b.amount - a.amount);
    });
  }

  onSelect(selectedId: number) {
    if (this.selectedId) {
      this.selectedId = null;
    } else {
      this.selectedId = selectedId;
    }
  }

  onAdd() {
    this.router.navigate(["/", "expense-add-form"]);
    this.expensesService.dataChanged.next(true);
    this.selectedId = null;
  }

  onEdit() {
    this.router.navigate(["/", "expense-add-form", "edit", this.selectedId]);
    this.selectedId = null;
  }

  onDelete() {
    this.expensesService.delete(this.selectedId);
    this.selectedId = null;
  }
}
