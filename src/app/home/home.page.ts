import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { ExpensesService } from "../services/expenses/expenses.service";
import { Expense } from "../models/expense.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  expenses: Expense[] = [];
  totalExpenses: number = 0;
  selectedId: number = null;
  showDetails:boolean = false;
  constructor(
    private expensesService: ExpensesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.expensesService.totalExpenses.subscribe((val) => {
      this.totalExpenses = val;
    });

    this.expensesService.dataChanged.subscribe(() => {
      this.expensesService.calcTotalExpenses();
    });

    this.expensesService.dataLoaded.subscribe((val) => {
      if (val) {
        this.expenses = this.expensesService.expenses;
      }
    });

    this.expensesService.dataChanged.subscribe(() => {
      this.expenses = this.expensesService.expenses;
    });
  
  }

  onSelect(expenseId) {
 
      this.selectedId = expenseId;
    
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

  showDetail() {
    if (!this.showDetails) {
      this.showDetails = true;
    } else {
      this.showDetails = false;
    }
  }
}
