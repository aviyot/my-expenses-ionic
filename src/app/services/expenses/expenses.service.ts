import { Injectable } from "@angular/core";
import { Expense } from "src/app/models/expense.model";
import { Storage } from "@ionic/storage";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ExpensesService {

  private _expenses: Expense[] = [];
  private _categories: string[] = [];
  private _paymentMethods: string[] = [];

  public totalExpenses = new BehaviorSubject<number>(0);
  public dataLoaded = new BehaviorSubject<boolean>(false);
  public localCategoriesLoaded = new BehaviorSubject(false);
  public localPaymentMethodsLoaded = new BehaviorSubject(false);
  public dataChanged = new BehaviorSubject(false);



  constructor(private storage: Storage) {
    this.loadLocalExpenses();
    this.loadLocalCategories();
    this.loadLocalPaymentMethods();
  }

  get expenses(): Expense[] {
    return [...this._expenses];
  }

  set expense(value: Expense) {
    this._expenses = [...this._expenses, value]
    this.calcTotalExpenses();
    this.saveLocalExpenses();

  }

  delete(id: number) {
    this._expenses = this._expenses.filter(expense => expense.id !== id)
    this.dataChanged.next(true);
    this.saveLocalExpenses();
  }

  get categories(): string[] {
    return [...this._categories];
  }

  set category(value: string) {
    this._categories = [...this._categories,value]
    this.saveLocalCategories();
    this.dataChanged.next(true);
  }
 
  removeCategory(val){
    this._categories = this._categories.filter(item => item !== val)
    this.saveLocalCategories();
    this.dataChanged.next(true);
    return this.categories
  }

set paymentMethod(value:string){
  this._paymentMethods = [...this._paymentMethods , value]
  this.saveLocalPaymentMethods();
this.dataChanged.next(true);
}
  get paymentMethods(): string[] {
    return [...this._paymentMethods];
  }
  removePayMethod(val){
this._paymentMethods = this._paymentMethods.filter(item=>item !== val);
this.saveLocalPaymentMethods();
this.dataChanged.next(true);

return this.paymentMethods;
  }

  update(id: number , updateExpense:Expense) {

    this._expenses = [...this._expenses.filter(item => item.id !== id ), {...updateExpense,id:id}]
    this.calcTotalExpenses();
    this.saveLocalExpenses();
    this.dataChanged.next(true);
    
  }

  addNew(expense: Expense) {
    let expenseWithId = {...expense,id:Date.now()};
    this._expenses = [...this._expenses,expenseWithId];
    this.saveLocalExpenses();
    this.dataChanged.next(true);
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
