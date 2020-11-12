import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ModalController } from "@ionic/angular";
import { Income } from "../models/income.model";

@Component({
  selector: "app-income",
  templateUrl: "./income.component.html",
  styleUrls: ["./income.component.scss"],
})
export class IncomeComponent implements OnInit {
  amount = new FormControl();
  incomeType = new FormControl();
  startDate = new FormControl(new Date());
  from = new FormControl();
  incomes: Income[]=[];
  totalIncomes = 0;
  constructor(public modalController: ModalController) {}

  ngOnInit() {}
  closeModal() {
    this.modalController.dismiss();
  }

  calcTotalIncomes():number{
    return this.incomes.reduce((pre,cur)=>{
      return pre + cur.amount;
    },0)
  }
  onSave() {
    this.incomes = [
      ...this.incomes,
      {
        id: Math.floor(Math.random()*100),
        type: this.incomeType.value,
        amount: this.amount.value,
        from: this.from.value,
        startDate: this.startDate.value,
      },
    ];
    this.totalIncomes = this.calcTotalIncomes();
    console.log( this.totalIncomes);
    //console.log(this.amount.value,this.incomeType.value,this.from.value,this.startDate.value);
  }
}
