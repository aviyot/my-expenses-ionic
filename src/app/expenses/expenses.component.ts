import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { Expense } from "../models/expense.model";

@Component({
  selector: "app-expenses",
  templateUrl: "./expenses.component.html",
  styleUrls: ["./expenses.component.scss"],
})
export class ExpensesComponent implements OnInit {
  @Output() select: EventEmitter<number> = new EventEmitter();
  @Input() expenses: Expense[] = [];
  @Input() showDetails : boolean = false;
  @Input() selectedId:number = null;

  constructor() {}

  ngOnInit() {

  }

  onSelect(selectedId: number) {

    this.select.emit(selectedId);

  }
}
