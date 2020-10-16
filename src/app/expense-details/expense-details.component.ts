import { Component, Input, OnInit} from '@angular/core';
import { Expense } from '../models/expense.model';

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.scss'],
})
export class ExpenseDetailsComponent implements OnInit {
  @Input() expense:Expense = null;
  constructor() { }

  ngOnInit() {}

}
