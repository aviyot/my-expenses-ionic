import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from "@angular/core";
import { Expense } from "../models/expense.model";

@Component({
  selector: "app-expenses",
  templateUrl: "./expenses.component.html",
  styleUrls: ["./expenses.component.scss"],
})
export class ExpensesComponent implements OnChanges,OnInit {
  @Output() select: EventEmitter<number> = new EventEmitter();
  @Input() expenses: Expense[] = [];
  @Input() showDetails : boolean = false;
  @Input() selectedId:number = null;
  @Input() selectedSortType:string;
  colDiv:string;

  constructor() {}

  ngOnInit() {
  }
  ngOnChanges(){
    if(this.selectedSortType){
      this.colDiv = "3";
    }
    else {
      this.colDiv = "4";

    }

  }
  onSelect(selectedId: number) {

    this.select.emit(selectedId);

  }
}
