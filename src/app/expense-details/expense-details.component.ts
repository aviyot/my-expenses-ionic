import { Component, Input, OnInit} from '@angular/core';
import { Expense } from '../models/expense.model';
import { ExpensesService } from '../services/expenses/expenses.service';
import { LanguageService } from '../services/language/language.service';

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.scss'],
})
export class ExpenseDetailsComponent implements OnInit {
  @Input() expense:Expense = null;
  languageWords: any;
  constructor( private expensesService: ExpensesService, private languageServ:LanguageService
    ) { }

  ngOnInit() {
  this.expensesService.calcLastPayDate(this.expense.fristPayDate,this.expense.numberOfPay);
  this.languageServ.selectedLanguage.subscribe(languageWords => {
    this.languageWords = languageWords;
  })
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
