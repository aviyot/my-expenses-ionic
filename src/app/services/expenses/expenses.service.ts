import { Injectable } from "@angular/core";
import { Expense } from "src/app/models/expense.model";
import { Storage } from "@ionic/storage";
import { BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ExpensesService {
  private _expenses: Expense[] = [];
  private _categories: string[] = [];
  private _paymentMethods: string[] = [];
  private _filteredExpenses:Expense[] = [];
  private _incomesTotalAmount:number = 9000;

  public totalExpenses = new BehaviorSubject<number>(0);
  public dataLoaded = new BehaviorSubject<boolean>(false);
  public localCategoriesLoaded = new BehaviorSubject(false);
  public localPaymentMethodsLoaded = new BehaviorSubject(false);
  public dataChanged = new BehaviorSubject(false);
  public expensesSorted = new BehaviorSubject(false);


  constructor(private storage: Storage) {
    this.loadLocalExpenses();
    this.loadLocalCategories();
    this.loadLocalPaymentMethods();
  }

  get expenses(): Expense[] {
    return [...this._expenses];
  }
  set expenses(expenses: Expense[]) {
    this._expenses = [...expenses];
    this.dataChanged.next(true);
  }
  set expense(value: Expense) {
    this._expenses = [...this._expenses, value];
    this.saveLocalExpenses();
  }

  delete(id: number) {
    this._expenses = this._expenses.filter((expense) => expense.id !== id);
    this.calcTotalExpenses(this._expenses);
    this.dataChanged.next(true);
    this.saveLocalExpenses();
  }

  get categories(): string[] {
    return [...this._categories];
  }

  set category(value: string) {
    this._categories = [...this._categories, value];
    this.saveLocalCategories();
    this.dataChanged.next(true);
  }

  removeCategory(val) {
    this._categories = this._categories.filter((item) => item !== val);
    this.saveLocalCategories();
    this.dataChanged.next(true);
    return this.categories;
  }

  set paymentMethod(value: string) {
    this._paymentMethods = [...this._paymentMethods, value];
    this.saveLocalPaymentMethods();
    this.dataChanged.next(true);
  }
  get paymentMethods(): string[] {
    return [...this._paymentMethods];
  }
  removePayMethod(val) {
    this._paymentMethods = this._paymentMethods.filter((item) => item !== val);
    this.saveLocalPaymentMethods();
    this.dataChanged.next(true);

    return this.paymentMethods;
  }
get filteredExpenses(){
  return [...this._filteredExpenses];
}

set filteredExpenses(val:Expense[]){
   this._filteredExpenses = [...val];
   this.expensesSorted.next(true);
}

  update(id: number, updateExpense: Expense) {
    this._expenses = [
      ...this._expenses.filter((item) => item.id !== id),
      { ...updateExpense, id: id },
    ];
    this.saveLocalExpenses();
    this.dataChanged.next(true);
  }

  addNew(expense: Expense) {
    let expenseWithId = { ...expense, id: Date.now() };
    this._expenses = [...this._expenses, expenseWithId];
    this.calcTotalExpenses(this._expenses);
    this.saveLocalExpenses();
    this.dataChanged.next(true);
  }

  calcTotalExpenses(expenses: Expense[]): void {
    return this.totalExpenses.next(
      expenses.reduce((total: number, val: Expense) => {
        return total + val.amount;
      }, 0)
    );
  }

  async saveLocal(value: any, key: string): Promise<any> {
    await this.storage.set(key, value);
  }

  saveLocalExpenses() {
    this.storage.set("expenses", this._expenses);
  }

  saveLocalCategories() {
    this.storage.set("categories", this._categories);
  }

  saveLocalPaymentMethods() {
    this.storage.set("paymentMethods", this._paymentMethods);
  }

  saveLoacalIncomesTotalAmount(val){
    return this.storage.set('incomesTotalAmount',val);
  }

  loadLocalExpenses() {
    this.storage.get("expenses").then((val) => {
      if (val) {
        this._expenses = val;
        this.dataLoaded.next(true);
      } else {
        this.storage.set("expenses", this._expenses);
      }
    });
  }

  loadLocalCategories() {
    this.storage.get("categories").then((val: string[]) => {
      if (val) {
        this._categories = val;
        this.localCategoriesLoaded.next(true);
      } else {
        this.storage.set("categories", this._categories);
      }
    });
  }

  loadLocalPaymentMethods() {
    this.storage.get("paymentMethods").then((val) => {
      if (val) {
        this._paymentMethods = val;
        this.localPaymentMethodsLoaded.next(true);
      } else {
        this.storage.set("paymentMethods", this._paymentMethods);
      }
    });
  }

  loadLocalIncomesTotalAmount():Promise<any>{
    return this.storage.get("incomesTotalAmount");
  }

  calcLastPayDate(fristPayDate, numberOfPay: number): number {
    let fd = new Date(fristPayDate);
    return new Date(fd.setMonth(fd.getMonth() + numberOfPay)).getTime();
  }

  sortExpenses(
    expenses: Expense[],
    sortBy: string,
    sortType?: string
  ): Expense[] {
    if (sortType === "acs") {
      return [
        ...expenses.sort((a, b) => {
          if (sortBy === "fristPayDate") {
            if (new Date(a[sortBy]).getTime() > new Date(b[sortBy]).getTime())
              return -1;
            if (new Date(a[sortBy]).getTime() < new Date(b[sortBy]).getTime())
              return 1;
            return 0;
          }
          if (sortBy === "lastPayDate" && a.fristPayDate && a.numberOfPay) {
            if (
              this.calcLastPayDate(a.fristPayDate, a.numberOfPay) >
              this.calcLastPayDate(b.fristPayDate, b.numberOfPay)
            )
              return -1;
            if (
              this.calcLastPayDate(a.fristPayDate, a.numberOfPay) <
              this.calcLastPayDate(b.fristPayDate, b.numberOfPay)
            )
              return 1;
            return 0;
          } else {
            if (a[sortBy] > b[sortBy]) return -1;
            if (a[sortBy] < b[sortBy]) return 1;
            return 0;
          }
        }),
      ];
    } else {
      return [
        ...expenses.sort((a, b) => {
          if (sortBy === "fristPayDate") {
            if (new Date(a[sortBy]).getTime() < new Date(b[sortBy]).getTime())
              return -1;
            if (new Date(a[sortBy]).getTime() > new Date(b[sortBy]).getTime())
              return 1;
            return 0;
          }
          if (sortBy === "lastPayDate" && a.fristPayDate && a.numberOfPay) {
            if (
              this.calcLastPayDate(a.fristPayDate, a.numberOfPay) <
              this.calcLastPayDate(b.fristPayDate, b.numberOfPay)
            )
              return -1;
            if (
              this.calcLastPayDate(a.fristPayDate, a.numberOfPay) >
              this.calcLastPayDate(b.fristPayDate, b.numberOfPay)
            )
              return 1;
            return 0;
          } else {
            if (a[sortBy] < b[sortBy]) return -1;
            if (a[sortBy] > b[sortBy]) return 1;
            return 0;
          }
        }),
      ];
    }
  }

  filterDateExpenses(
    dataArray: Expense[],
    startDate: number,
    endDate: number
  ): Expense[] {
  
      return dataArray.filter((expense) => {
        if(expense.numberOfPay)
        return (
          this.calcLastPayDate(expense.fristPayDate, expense.numberOfPay) > startDate &&
          this.calcLastPayDate(expense.fristPayDate, expense.numberOfPay) <
            endDate
        );
        else
          return false
        /* if (expense.numberOfPay)
          return (
            this.calcLastPayDate(expense.fristPayDate, expense.numberOfPay) > startDate &&
            this.calcLastPayDate(expense.fristPayDate, expense.numberOfPay) <
              endDate
          );
        else return true; */
      });
    }
}
