import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { ExpensesService } from "../services/expenses/expenses.service";
import { Expense } from "../models/expense.model";
import { Router } from "@angular/router";
import { AlertController, ModalController } from "@ionic/angular";
import { LanguageService } from "../services/language/language.service";
import { SortModalComponent } from '../sort-modal/sort-modal.component';

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
    private languageServ: LanguageService,
    public modalController: ModalController
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
  onSelectOp(op:string){
     switch(op){
      case "edit":
        this.onEdit();
        break;
      case "delete":
        this.onDelete()
        break;
     }
  }
  actionRespone(actionType:string){

    switch(actionType) {
      case "add" :
        this.onAdd();
        break;
   
      case "detial":
        this.showDetail();
        break;
      case "sort":
        this.showModalSort();
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

  

  async showModalSort(){
    const modal = await this.modalController.create({
      component: SortModalComponent,
      cssClass: 'sort-modal'
    });
    return await modal.present();
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
