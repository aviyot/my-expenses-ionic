import { Component, Input, OnInit } from "@angular/core";
import { ExpensesService } from "../services/expenses/expenses.service";
import { FormControl, Validators } from "@angular/forms";
import { LanguageService } from "../services/language/language.service";
import { SharedService } from "../services/shared/shared.service";

@Component({
  selector: "app-opthion-edit-settings",
  templateUrl: "./opthion-edit-settings.component.html",
  styleUrls: ["./opthion-edit-settings.component.scss"],
})
export class OpthionEditSettingsComponent implements OnInit {
  @Input() selectName: string;
  selectOpthions: string[] = [];
  title: string;
  newOpthion = new FormControl("", [Validators.required]);
  selectedOpthion = null;
  itemSelected: boolean = false;
  languageWords: any;
  constructor(
    private expensesService: ExpensesService,
    private languageServ: LanguageService,
    private sharedService : SharedService
  ) {}

  ngOnInit() {
    if (this.selectName === "category") {
      this.expensesService.categories.subscribe((categories) => {
        this.selectOpthions = categories;
        this.title = "Edit Expenses Category";
      });
    }
    if (this.selectName === "payMethod") {
      this.expensesService.paymentMethods.subscribe((paymentMethods) => {
        this.selectOpthions = paymentMethods;
        this.title = "Edit Pay Methods ";
      });
    }
    /* this.expensesService.dataChanged.subscribe(val=>{
      this.categories = this.expensesService.categories;
      this.paymentMethods = this.expensesService.paymentMethods;
    }) */
    this.languageServ.selectedLanguage.subscribe((languageWords) => {
      this.languageWords = languageWords;
    });
  }

  removeOpthion() {
    if (this.selectName === "category") {
      this.expensesService.removeCategory(
        this.selectedOpthion,
        this.selectOpthions
      );
    }

    if (this.selectName === "payMethod") {
      this.expensesService.removePayMethod(
        this.selectedOpthion,
        this.selectOpthions
      );
    }
    this.selectedOpthion = null;
    this.itemSelected = false;
  }

  onSelectOpthion(val) {
    if(this.itemSelected) {
      this.selectedOpthion = null;
      this.itemSelected = false;
    } 
    else {
    this.selectedOpthion = val;
    this.itemSelected = true;
    }
  }

  addNewOpthion() {
    let valueExit = this.selectOpthions.includes(this.newOpthion.value);
 

    if(this.selectOpthions.length === 0)
        valueExit = false;

    if (!valueExit) {
      if (this.selectName === "category") {
        this.expensesService
          .addNewCategory(this.newOpthion.value, this.selectOpthions)
          .then(() => {});
      }

      if (this.selectName === "payMethod") {
        this.expensesService
          .addNewPaymentMethod(this.newOpthion.value, this.selectOpthions)
          .then(() => {});
      }

      this.selectedOpthion = this.newOpthion.value;
      this.itemSelected = true;
    }
    this.newOpthion.reset();
  }

  closeModal(){
    this.sharedService.closeModal({
      selectName:this.selectName,
      value:this.newOpthion.value
    });
  }

  selectOpthion(){
    this.sharedService.closeModal({
      selectName:this.selectName,
      value:this.selectedOpthion
    });
  }
}
