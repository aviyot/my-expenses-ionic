import { Component, OnInit } from "@angular/core";
import { ModalController } from '@ionic/angular';
import { ExpensesService } from "../services/expenses/expenses.service";
import { LanguageService } from "../services/language/language.service";

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
 
  selectedSortType="name";
  sortType="acs";
  save=false;
  constructor(
    private languageServ: LanguageService,
    private expensesService: ExpensesService,
    public modalController: ModalController

  ) {}

  ngOnInit() {
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
    this.expensesService.expenses = this.expensesService.sortExpenses(
      [...this.expensesService.expenses],
      this.selectedSortType,this.sortType
    );
    if(this.save){
        this.expensesService.saveLocalExpenses();
    }


    this.modalController.dismiss();
  }

  closeModal(){
    this.modalController.dismiss();
  }



}
