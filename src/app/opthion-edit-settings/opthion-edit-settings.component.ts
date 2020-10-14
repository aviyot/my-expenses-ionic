import { Component, OnInit , } from "@angular/core";
import { ExpensesService } from "../services/expenses/expenses.service";
import {FormControl, Validators } from "@angular/forms";


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
  selectedVlaue = "";
  constructor(private expensesService: ExpensesService) {}

  ngOnInit() {
    this.categories = this.expensesService.categories;
    this.paymentMethods = this.expensesService.paymentMethods;

    this.expensesService.dataChanged.subscribe(val=>{
      this.categories = this.expensesService.categories;
      this.paymentMethods = this.expensesService.paymentMethods;
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
  }

  onRemoveNewItem(){
    if(this.opthions.editCat)
       this.removeCatgory(this.selectedVlaue)
    if(this.opthions.editPay)
       this.removePayMethod(this.selectedVlaue);
  }
  removeCatgory(val){
    this.categories = this.expensesService.removeCategory(val)
  }
  removePayMethod(val){
    this.paymentMethods = this.expensesService.removePayMethod(val);
  }

  onSelectCatgory(val){
      this.selectedVlaue = val;
  }

  onSelectPayMethod(val){
        this.selectedVlaue = val ;
  }

  onAddNewItem() {
    if(this.opthions.editCat && this.category.valid)
       this.addNewCategory()
    if(this.opthions.editPay && this.payMethod.valid)
       this.addNewPayMethod();
  }
  addNewCategory(){
    this.expensesService.category = this.category.value;
    this.category.reset();
  }
  addNewPayMethod(){
    this.expensesService.paymentMethod = this.payMethod.value;
    this.payMethod.reset();
  }

  onFocus() {
console.log("focus")
  }

  onBlur(){
    console.log("blur")

  }
}
