import { Component, OnInit } from "@angular/core";
import { ModalController } from '@ionic/angular';
import { Expense } from '../models/expense.model';
import { ExpensesService } from "../services/expenses/expenses.service";
import { LanguageService } from "../services/language/language.service";
import { Storage } from "@ionic/storage";


interface sortType {
  label: string;
  value: string;
}

@Component({
  selector: "app-sort-modal",
  templateUrl: "./sort-modal.component.html",
  styleUrls: ["./sort-modal.component.scss"],
})
export class SortModalComponent implements OnInit {
  selectedLanguage: string;
  sortTypes: sortType[];
  lng: any;
 expenses:Expense[];
  selectedSortType="name";
  sortType="acs";
  save=false;
 
  constructor(
    private languageServ: LanguageService,
    private expensesService: ExpensesService,
    public modalController: ModalController,
    private storage:Storage

  ) {}

  ngOnInit() {
    this.expensesService.expenses.subscribe((expenses)=>{
      this.expenses = expenses;
    })
    this.languageServ.selectedLanguage.subscribe((lng: any) => {
      this.lng = lng;
      // const {name,amount,category,payMethod,fristPayDate,numberPays,lastPayDate,sortBy} = lng;
      this.sortTypes = [
        { label: lng.name, value: "name" },
        { label: lng.amount, value: "amount" },
        { label: lng.category, value: "category" },
        { label: lng.payMethod, value: "methodPay" },
        { label: lng.fristPayDate, value: "fristPayDate" },
        { label: lng.numberPays, value: "numberOfPay" },
        { label: lng.lastPayDate, value: "lastPayDate" },
      ];
    });
  }



  sort() {
    //console.log(this.selectedSortType,this.save,this.sortType);
  this.expenses = this.expensesService.sortExpenses(
      [...this.expenses],
      this.selectedSortType,this.sortType
    );

    this.expensesService.setExpenses(this.expenses);
    if(this.save){
      this.storage.set("expenses",this.expenses)
    }


    this.modalController.dismiss();
  }

  closeModal(){
    this.modalController.dismiss();
  }



}
