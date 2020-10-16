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
  @Output() select: EventEmitter<number> = new EventEmitter();
  @Input() expenses: Expense[] = [];
  @Input() showDetails : boolean = false;
  selectedId:number = null;
  expensesSelected = false;

  constructor() {}

  ngOnInit() {
/*     this.expensesService.dataLoaded.subscribe((val) => {
      if (val) {
        this.expenses = this.expensesService.expenses;
      }
    });

    this.expensesService.dataChanged.subscribe(() => {
      this.expenses = this.expensesService.expenses;
    }); */
  }

  onSelect(selectedId: number) {

    if (this.selectedId === selectedId) {
      this.selectedId = null;
      this.expensesSelected = false;
    } else {
      this.selectedId = selectedId;
      this.expensesSelected = true;

    }

    this.select.emit(selectedId);

  }
/* 
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

  showDetail(){
    if(!this.showDetails ){
    this.showDetails = true;
    }
    else {
      this.showDetails = false;
    }
  } */
}
