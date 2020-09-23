import { Injectable } from "@angular/core";
import { Expense } from "src/app/models/expense.model";
import { Storage } from "@ionic/storage";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ExpensesService {
  private _selectedExpense: number = null;
  private _categories: string[] = ["food", "clothing", "car"];
  private _paymentMethods: string[] = ["cash", "cash credit", "credit"];
  public totalExpenses = new BehaviorSubject<number>(0);
  public dataLoaded = new BehaviorSubject<boolean>(false);
  public localCategoriesLoaded = new BehaviorSubject(false);
  public localPaymentMethodsLoaded = new BehaviorSubject(false);

  private _expenses: Expense[] = [];

  constructor(private storage: Storage) {
    this.loadLocalExpenses();
    this.loadLocalCategories();
    this.loadLocalPaymentMethods();
  }

  get expenses(): Expense[] {
    return [...this._expenses];
  }

  set expense(value: Expense) {
    this._expenses.push(value);
    this.calcTotalExpenses();
  }

  delete(key: number) {
    this._expenses.splice(key, 1);
    this.calcTotalExpenses();
    this.saveLocalExpenses();
  }

  get selectedExpense(): number {
    return this._selectedExpense;
  }

  set selectedExpense(value: number) {
    this._selectedExpense = value;
  }

  get categories(): string[] {
    return [...this._categories];
  }

  set category(value: string) {
    this._categories.push(value);
  }
set paymentMethod(value:string){
  this._paymentMethods.push(value);
}
  get paymentMethods(): string[] {
    return [...this._paymentMethods];
  }

  update(id: number, expense: Expense) {
    this._expenses[id] = expense;
    this.calcTotalExpenses();
    this.saveLocalExpenses();
  }

  addNew(expense: Expense) {
    this.expense = expense;
    this.saveLocalExpenses();
  }

  calcTotalExpenses(): void {
    this.totalExpenses.next(
      this.expenses.reduce((total, val) => {
        return total + val.amount;
      }, 0)
    );
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

  loadLocalExpenses() {
    this.storage.get("expenses").then((val) => {
      if (val) {
        this._expenses = val;
        this.calcTotalExpenses();
        this.dataLoaded.next(true);
      } else {
        this.storage.set("expenses", this._expenses);
      }
    });
  }

  loadLocalCategories() {
    this.storage.get("categories").then((val:string[]) => {
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
}
