import { Component, OnInit , } from "@angular/core";
import { ExpensesService } from "../services/expenses/expenses.service";
import {FormControl, Validators } from "@angular/forms";
import { LanguageService } from '../services/language/language.service';


@Component({
  selector: "app-opthion-edit-settings",
  templateUrl: "./opthion-edit-settings.component.html",
  styleUrls: ["./opthion-edit-settings.component.scss"],
})
export class OpthionEditSettingsComponent implements OnInit {
  opthions = { editMode: true, editCat: false, editPay: false };
  categories: string[];
  paymentMethods: string[];
  category = new FormControl("", [Validators.required]);
  payMethod = new FormControl("", [Validators.required]);
  selectedVlaue = null;
  itemSelected : boolean = false;
  languageWords: any;
  constructor(private expensesService: ExpensesService,private languageServ:LanguageService) {}

  ngOnInit() {
   this.expensesService.categories.subscribe((categories)=>{
      this.categories =  categories;
    });
   this.expensesService.paymentMethods.subscribe((paymentMethods)=>{
    this.paymentMethods = paymentMethods; 
    });

    /* this.expensesService.dataChanged.subscribe(val=>{
      this.categories = this.expensesService.categories;
      this.paymentMethods = this.expensesService.paymentMethods;
    }) */
    this.languageServ.selectedLanguage.subscribe(languageWords => {
      this.languageWords = languageWords;
    })

  }

  onClickCat() {
    this.opthions.editMode = false;
    this.opthions.editCat = true;
  }
  onClickPay() {
    this.opthions.editMode = false;
    this.opthions.editPay = true;
  }

  onBack() {
    this.opthions.editMode = true;
    this.opthions.editPay = false;
    this.opthions.editCat = false;

    this.itemSelected = false;
    this.selectedVlaue = false;

    this.category.reset();
    this.payMethod.reset();
  }

  onRemoveNewItem(){
    if(this.opthions.editCat)
       this.removeCatgory(this.selectedVlaue)
    if(this.opthions.editPay)
       this.removePayMethod(this.selectedVlaue);
  }
  removeCatgory(catgory){
   this.expensesService.removeCategory(catgory,this.categories);
  }
  removePayMethod(payMethod){
  this.expensesService.removePayMethod(payMethod,this.paymentMethods);
  }

  onSelectCatgory(val){
      this.selectedVlaue = val;
      this.itemSelected = true;
  }

  onSelectPayMethod(val){
        this.selectedVlaue = val ;
        this.itemSelected = true;
  }

  onAddNewItem() {
    if(this.opthions.editCat && this.category.valid)
       this.addNewCategory()
    if(this.opthions.editPay && this.payMethod.valid)
       this.addNewPayMethod();
  }
  addNewCategory(){
    this.expensesService.addNewCategory(this.category.value,this.categories).then(()=>{
      this.category.reset();
    });

  }
  addNewPayMethod(){
    this.expensesService.addNewPaymentMethod(this.payMethod.value,this.paymentMethods).then(()=>{
      this.payMethod.reset();
    })

  }


}
