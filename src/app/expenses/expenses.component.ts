import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ExpensesService } from '../services/expenses/expenses.service';
import { Expense } from '../models/expense.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit{
   @Output() edit:EventEmitter<number>  = new EventEmitter<number>();
  selected : boolean = false;
  selectedIndex:number = null;
  expenses : Expense[] = [];
  selectedRow : number = null;
  isSelectedRow:boolean = false;

  constructor(private router : Router,private expensesService: ExpensesService) { }

  ngOnInit() {
 
    this.expensesService.dataLoaded.subscribe((val)=>{
         if(val){
          this.expenses = this.expensesService.expenses;
          this.expenses.sort((a,b)=> b.amount-a.amount)
         }
    })

    this.expensesService.dataChanged.subscribe(()=>{
      this.expenses = this.expensesService.expenses;
      this.expenses.sort((a,b)=> b.amount-a.amount)
    })
  }
  


  onSelect(selectedIndex:number){
    this.selected = true;
    this.selectedIndex = selectedIndex;
    console.log(this.expenses[this.selectedIndex]);
  }

  onAdd() {
    this.router.navigate(['/','expense-add-form']);
    this.selected = false;
    this.expensesService.dataChanged.next(true);

  }

  onEdit(){
    this.edit.emit(this.selectedIndex);
    this.selected = false;
    this.router.navigate(['/','expense-add-form','edit',this.selectedIndex]);
  }

  onDelete(){
    console.log("delete:",this.selectedIndex);
    this.expensesService.delete(this.selectedIndex);
    this.selected = false;

  }

  onSelectRow(selectedRow){
    if(this.selectedRow === selectedRow )
    this.isSelectedRow = !this.isSelectedRow
    this.selectedRow = selectedRow;
  }
}
