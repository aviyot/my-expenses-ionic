import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ExpensesService } from '../services/expenses/expenses.service';
import { Expense } from '../models/expense.model';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

expenses: Expense[] = [];
totalExpenses:number = 0;
  constructor(private storage: Storage,private expensesService: ExpensesService) {}

  ngOnInit() {

    this.expensesService.totalExpenses.subscribe((val) => {
      this.totalExpenses = val;
    })

    this.expensesService.dataChanged.subscribe(()=>{
      this.expensesService.calcTotalExpenses();
    })
  /*   this.storage.set('name', 'Max');
    this.storage.get('name').then((val) => {
      console.log('Your age is', val);
    }); */

  }


}
