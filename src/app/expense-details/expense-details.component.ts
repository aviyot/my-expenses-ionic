import { Component, Input, OnInit} from '@angular/core';
import { Expense } from '../models/expense.model';
import { ExpensesService } from '../services/expenses/expenses.service';

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.scss'],
})
export class ExpenseDetailsComponent implements OnInit {
  @Input() expense:Expense = null;
  constructor( private expensesService: ExpensesService) { }

  ngOnInit() {
  this.expensesService.calcLastPayDate(this.expense.fristPayDate,this.expense.numberOfPay);
  }

  
  calcLastPayDate():Date{
    
    return new Date(this.expensesService.calcLastPayDate(this.expense.fristPayDate,this.expense.numberOfPay));

  }

/*   addMonths(date, months) {
    var d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    return date;
} */
   
}
