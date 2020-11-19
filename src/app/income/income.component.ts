import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ModalController } from "@ionic/angular";
import { Income } from "../models/income.model";
import { ExpensesService } from "../services/expenses/expenses.service";
import { IncomesService } from "../services/incomes/incomes.service";

@Component({
  selector: "app-income",
  templateUrl: "./income.component.html",
  styleUrls: ["./income.component.scss"],
})
export class IncomeComponent implements OnInit, OnDestroy {
  amount = new FormControl();
  incomeType = new FormControl();
  startDate = new FormControl(new Date());
  from = new FormControl();
  incomes: Income[] = [];
  totalIncomes = 0;
  selectedIncomeId: number;
  constructor(
    public modalController: ModalController,
    private incomesService: IncomesService
  ) {}

  ngOnInit() {
    this.incomesService.income$.subscribe((income) => {
      console.log("ngOnInit", this.totalIncomes);

      this.totalIncomes += income.amount;
    });
    this.incomesService.loadIncomesLocal().then((incomes) => {
      this.incomes = incomes;
      this.totalIncomes = this.incomesService.calcTotalIncomes(this.incomes);
    });
  }
  closeModal() {
    this.modalController.dismiss();
  }

  onSave() {
    this.incomesService.incomeSet({
      id: Math.floor(Math.random() * 100),
      type: this.incomeType.value,
      amount: this.amount.value,
      from: this.from.value,
      startDate: this.startDate.value,
    });
    this.incomes = [
      ...this.incomes,
      {
        id: Math.floor(Math.random() * 100),
        type: this.incomeType.value,
        amount: this.amount.value,
        from: this.from.value,
        startDate: this.startDate.value,
      },
    ];
  }

  onSelectIncome(selectedIncomeId) {
    if (!this.selectedIncomeId) this.selectedIncomeId = selectedIncomeId;
    else this.selectedIncomeId = null;
  }

  onDelete() {
    this.totalIncomes -= this.incomes.find(income=>(income.id === this.selectedIncomeId)).amount
    this.incomes = this.incomes.filter((income) => {
      return income.id != this.selectedIncomeId;
    });
    this.selectedIncomeId = null;
    this.incomesService.saveIncomesLocal(this.incomes).then(()=>{
      this.incomesService.incomeAction("delete");

    });

  }
  ngOnDestroy() {
    this.incomesService.saveIncomesLocal(this.incomes);
  }
}
