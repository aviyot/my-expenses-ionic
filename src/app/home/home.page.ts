import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { ExpensesService } from "../services/expenses/expenses.service";
import { Expense } from "../models/expense.model";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  expenses: Expense[] = [];
  totalExpenses: number = 0;
  selectedId: number = null;
  showDetails: boolean = false;
  constructor(
    private expensesService: ExpensesService,
    private router: Router,
    public alertController: AlertController
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

    if (this.selectedId === expenseId) {
      this.selectedId = null;
    } else {
      this.selectedId = expenseId;

    }

    this.showDetails = false
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

  showFilterAlert() {
    this.presentAlert();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Sort by ",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Sort Acs",
          handler: (sortType) => {
            this.expenses = this.expensesService.sortExpenses([...this.expenses],sortType,"acs");
          },
        },
        {
          text: "Sort Des",
          handler: (sortType) => {
            this.expenses = this.expensesService.sortExpenses([...this.expenses],sortType);
          },
        }
      ],
      inputs : [
        {
          name: 'sortType',
          type: 'radio',
          label: 'Amount',
          value: 'amount',
        },
        {
      /*     public id :number,
          public name:string,
          public amount:number,
          public category:string,
          public methodPay:string,
          public freqPay: number,
          public benef: string,
          public commitDate:Date,
          public fristPayDate:Date, 
          public numberOfPay:number */
          name: 'sortType',
          type: 'radio',
          label: 'Name',
          value: 'name',
          checked: true
        },
        {
          name: 'sortType',
          type: 'radio',
          label: 'Category',
          value: 'category',
        },
        {
          name: 'sortType',
          type: 'radio',
          label: 'Pay Method',
          value: 'methodPay',
        }
      
     
      ]
    });

    await alert.present();
  }
}
