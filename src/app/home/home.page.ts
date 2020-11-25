import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { ExpensesService } from "../services/expenses/expenses.service";
import { Expense } from "../models/expense.model";
import { Router } from "@angular/router";
import {
  AlertController,
  ModalController,
  PopoverController,
} from "@ionic/angular";
import { LanguageService } from "../services/language/language.service";
import { SortModalComponent } from "../sort-modal/sort-modal.component";
import { FilterExpensesComponent } from "../filter-expenses/filter-expenses.component";
import { IncomeComponent } from "../income/income.component";
import { IncomesService } from "../services/incomes/incomes.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  expenses: Expense[] = [];
  totalExpenses: number = 0;
  income = 0;
  selectedId: number = null;
  showDetails: boolean = false;
  languageWords: any;
  selectedSortType: string;
  selectedTotalAmount = 0;
  selectedArr: number[] = [];
  multiypleSelect = false;
  savings = 0;
  ev: any;
  expandToolbar = false;

  constructor(
    private expensesService: ExpensesService,
    private router: Router,
    public alertController: AlertController,
    private languageServ: LanguageService,
    public modalController: ModalController,
    public popoverController: PopoverController,
    private incomesService: IncomesService
  ) {}

  ngOnInit() {
    this.expensesService.expenses.subscribe((expenses) => {
      this.expenses = expenses;
      this.expensesService.calcTotalExpenses(this.expenses);
    });

    this.expensesService.totalExpenses.subscribe((totalExpenses) => {
      this.totalExpenses = totalExpenses;
    });

    this.incomesService.loadIncomesLocal().then((incomes) => {
      this.income = this.incomesService.calcTotalIncomes(incomes);
      this.savings =  this.income - this.totalExpenses;
    });

    this.incomesService.incomeAction$.subscribe((action: string) => {
      if (action === "delete") {
        this.incomesService.loadIncomesLocal().then((incomes) => {
          this.income = this.incomesService.calcTotalIncomes(incomes);
          this.savings = this.totalExpenses - this.income;
        });
      }
    });
    this.incomesService.income$.subscribe((income) => {
      this.income += income.amount;
      this.savings = this.income - this.totalExpenses ;
      console.log(this.savings);
    });
    this.expensesService.expensesSorted.subscribe((val) => {
      this.expenses = this.expensesService.filteredExpenses;
    });

    /*    this.expensesService.dataChanged.subscribe(() => {
      this.expensesService.calcTotalExpenses(this.expenses);
    });

    this.expensesService.dataLoaded.subscribe((val) => {
      if (val) {
        this.expenses = this.expensesService.expenses;
        //this.expenses = this.expensesService.filterDateExpenses(this.expenses, new Date(2022,1,1).getTime(),new Date(2024,5,1).getTime())
        this.expensesService.calcTotalExpenses(this.expenses);
      }
    });

    this.expensesService.dataChanged.subscribe(() => {
      this.expenses = this.expensesService.expenses;
    }); */

    this.languageServ.selectedLanguage.subscribe((languageWords) => {
      this.languageWords = languageWords;
    });

    /*     this.expensesService.loadLocalIncomesTotalAmount().then((val) => {
      if (val) {
        this.income$.next(val);
      } else {
        this.expensesService
          .saveLoacalIncomesTotalAmount(this.income)
          .then((val) => {
            this.income$.next(val);
          });
      }
    }); */
  }

  ionViewDidEnter() {
    this.expandToolbar = false;
  }

  onSelectExpense(expenseId:number) {
    if (this.multiypleSelect){
      if (this.selectedArr.includes(expenseId)) {
        this.selectedArr = this.selectedArr.filter(
          (item) => item !== expenseId
        );
        this.selectedTotalAmount -= this.expenses.find((ex) => {
          return ex.id === expenseId;
        }).amount;
      } else {
        this.selectedArr = [...this.selectedArr, expenseId];
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
  onSelectOp(op: string) {
    switch (op) {
      case "edit":
        this.onEdit();
        break;
      case "delete":
        this.onDelete();
        break;
    }
  }
  actionRespone(actionType: any) {
    let { action, ev } = actionType;
    if (!ev) {
      action = actionType;
    }

    switch (action) {
      case "add":
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
      case "filter":
        this.showFilter(ev);
        break;
      case "income":
        this.editIncome();
        break;
    }
  }

  onAdd() {
    this.router.navigate(["/", "expense-add-form"]);
    this.expensesService.dataChanged.next(true);
    this.selectedId = null;
  }

  onEdit() {
    const selectedExpense: Expense = this.expenses.find(
      (val) => val.id === this.selectedId
    );
    this.router.navigate(
      ["/", "expense-add-form", "edit", selectedExpense.id],
      { state: { selectedExpense: selectedExpense } }
    );
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

  selectMultiplt(isMultiyplySelect) {
    if (!isMultiyplySelect) {
      this.multiypleSelect = false;
      let ar = [];
      this.selectedArr = ar;
      this.selectedId = null;
      this.selectedTotalAmount = 0;
    } else {
      this.selectedId = null;
      this.multiypleSelect = true;
    }
  }

  async showModalSort() {
    const modal = await this.modalController.create({
      component: SortModalComponent,
      cssClass: "sort-modal",
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
            this.expensesService.removeExpense(this.selectedId, this.expenses);
            this.selectedId = null;
          },
        },
      ],
    });

    const pr = await alert.present();
  }

  async showFilter(ev) {
    const popover = await this.popoverController.create({
      component: FilterExpensesComponent,
      cssClass: "my-custom-class",
      translucent: true,
      event: ev,
    });
    return await popover.present();
  }

  async editIncome() {
    const incomeModal = await this.modalController.create({
      component: IncomeComponent,
    });
    return await incomeModal.present();
  }
}
