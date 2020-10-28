import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { ExpensesService } from "../services/expenses/expenses.service";
import { Expense } from "../models/expense.model";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { LanguageService } from "../services/language/language.service";

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
  languageWords: any;
  selectedSortType: string;
  selectedTotalAmount = 0;
  selectedArr:number[] = [];
  multiypleSelect = false;

  constructor(
    private expensesService: ExpensesService,
    private router: Router,
    public alertController: AlertController,
    private languageServ: LanguageService
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

    this.languageServ.selectedLanguage.subscribe((languageWords) => {
      this.languageWords = languageWords;
    });
  }

  
  onSelect(expenseId) {
    if(this.multiypleSelect){
    if(this.selectedArr.includes(expenseId)){
     this.selectedArr = this.selectedArr.filter((item)=> item!== expenseId)
     this.selectedTotalAmount -= this.expenses.find((ex) => {
      return ex.id === expenseId;
    }).amount;
    }
    else{
     this.selectedArr = [...this.selectedArr,expenseId];
     this.selectedTotalAmount += this.expenses.find((ex) => {
      return ex.id === expenseId;
    }).amount;
    }
  }
    if (this.selectedId === expenseId) {
      this.selectedId = null;
    } else {
      this.selectedId = expenseId;
    }


    this.showDetails = false;


  }

  actionRespone(actionType:string){

    switch(actionType) {
      case "add" :
        this.onAdd();
        break;
      case "edit":
        this.onEdit();
        break;
      case "delete":
        this.onDelete
        break;
      case "detial":
        this.showDetail();
        break;
      case "sort":
        this.showFilterAlert();
        break;
      case "multipplaySelect":
        this.selectMultiplt(true);
        break;
      case "disableMultipplaySelect":
         this.selectMultiplt(false);
         break;

    }

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
    this.deleteWarning();
  }

  showDetail() {
    if (!this.showDetails) {
      this.showDetails = true;
    } else {
      this.showDetails = false;
    }
  }

  selectMultiplt(isMultiyplySelect){
    if(!isMultiyplySelect){
      this.multiypleSelect = false;
      let ar=[];
      this.selectedArr = ar;
      this.selectedId = null;
      this.selectedTotalAmount = 0;
    }
    else {
      this.selectedId = null;
      this.multiypleSelect = true;
    }
  }

  showFilterAlert() {
    this.presentAlert();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: this.languageWords.sortBy,
      buttons: [
        {
          text: this.languageWords.cancel,
          role: "cancel",
        },
        {
          text: this.languageWords.sortAcs,
          handler: (sortType) => {
            this.expenses = this.expensesService.sortExpenses(
              [...this.expenses],
              sortType,
              "acs"
            );
            if (sortType !== "name" && sortType !== "amount") {
              this.selectedSortType = sortType;
            } else {
              this.selectedSortType = "";
            }
          },
        },
        {
          text: this.languageWords.sortDcs,
          handler: (sortType) => {
            this.expenses = this.expensesService.sortExpenses(
              [...this.expenses],
              sortType
            );
            if (sortType !== "name" && sortType !== "amount") {
              this.selectedSortType = sortType;
            } else {
              this.selectedSortType = "";
            }
          },
        },
      ],
      inputs: [
        {
          name: "sortType",
          type: "radio",
          label: this.languageWords.amount,
          value: "amount",
        },
        {
    
          name: "sortType",
          type: "radio",
          label: this.languageWords.name,
          value: "name",
          checked: true,
        },
        {
          name: "sortType",
          type: "radio",
          label: this.languageWords.category,
          value: "category",
        },
        {
          name: "sortType",
          type: "radio",
          label: this.languageWords.payMethod,
          value: "methodPay",
        },
        {
          name: "sortType",
          type: "radio",
          label: this.languageWords.fristPayDate,
          value: "fristPayDate",
        },
        {
          name: "sortType",
          type: "radio",
          label: this.languageWords.numberPays,
          value: "numberOfPay",
        },
        {
          name: "sortType",
          type: "radio",
          label: this.languageWords.lastPayDate,
          value: "lastPayDate",
        },
      ],
    });

    await alert.present();
  }

  async deleteWarning() {
    const alert = await this.alertController.create({
      header: this.languageWords.del + " ? ",
      buttons: [
        {
          text: this.languageWords.cancel,
          role: "cancel",
          handler: () => {
            this.selectedId = null;
          },
        },
        {
          text: this.languageWords.ok,
          handler: () => {
            this.expensesService.delete(this.selectedId);
            this.selectedId = null;
          },
        },
      ],
    });

    const pr = await alert.present();
  }
}
