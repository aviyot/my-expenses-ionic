import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from "@angular/core";
import { Router } from '@angular/router';
import { Expense } from "../models/expense.model";

@Component({
  selector: "app-expenses",
  templateUrl: "./expenses.component.html",
  styleUrls: ["./expenses.component.scss"],
})
export class ExpensesComponent implements OnChanges,OnInit {
  @Output() select: EventEmitter<number> = new EventEmitter();
  @Output() selectedOp : EventEmitter<string> = new EventEmitter(null);
  @Input() expenses: Expense[] = [];
  @Input() showDetails : boolean = false;
  @Input() selectedId:number = null;
  @Input() selectedSortType:string;
  colDiv:number;
  @Input() selectedArr:number[] = [];
  @Input() multiypleSelect = false;

  constructor(private router:Router) {}

  ngOnInit() {
  }
  ngOnChanges(){
    if(this.selectedSortType){
      this.colDiv = 0;
    }
    else {
      this.colDiv = 2;

    }

  }
  onSelect(selectedId: number) {

    this.select.emit(selectedId);

  }

 
  onEdit(ev) {
    this.selectedOp.emit("edit")
    ev.stopPropagation()


 /*    this.router.navigate(["/", "expense-add-form", "edit", this.selectedId]);
    this.selectedId = null; */
  }
 onDelete(ev){
   this.selectedOp.emit("delete")
  ev.stopPropagation()


 }

  isItemInclude(id:number):boolean{
    return this.selectedArr.includes(id)
  }

 
}
