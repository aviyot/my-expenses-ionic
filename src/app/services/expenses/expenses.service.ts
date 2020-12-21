import { Injectable } from "@angular/core";
import { Expense } from "../../models/expense.model";
import { Storage } from "@ionic/storage";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ExpensesService {

  private _expenses: Subject<Expense[]> = new BehaviorSubject<Expense[]>([]);
  private _categories: Subject<string[]> = new BehaviorSubject<string[]>([]);
  private _paymentMethods: Subject<string[]> = new BehaviorSubject<string[]>(
    []
  );

  private _filteredExpenses: Expense[] = [];
  private _incomesTotalAmount: number = 9000;
  private _totalExpenses = new BehaviorSubject<number>(0);

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

  get expenses(): Observable<Expense[]> {
    return this._expenses.asObservable();
  }

  get categories(): Observable<string[]> {
    return this._categories.asObservable();
  }

  get paymentMethods(): Observable<string[]> {
    return this._paymentMethods.asObservable();
  }

  get totalExpenses(): Observable<number> {
    return this._totalExpenses.asObservable();
  }

  setExpenses(expenses: Expense[]) {
    this._expenses.next(expenses);
  }

  loadLocalExpenses() {
    const intialExpenes: Expense[] = [];

    this.storage.get("expenses").then((expenses) => {
      if (expenses) {
        this._expenses.next([...intialExpenes, ...expenses]);
      }
    });
  }

  loadLocalCategories() {
    this.storage.get("categories").then((categories: string[]) => {
      if (categories) {
        this._categories.next(categories);
      }
    });
  }

  loadLocalPaymentMethods() {
    this.storage.get("paymentMethods").then((paymentMethods) => {
      if (paymentMethods) {
        this._paymentMethods.next(paymentMethods);
      }
    });
  }

  loadLocalIncomesTotalAmount(): Promise<any> {
    return this.storage.get("incomesTotalAmount");
  }

  addNewExpense(newExpense: Expense, expenses: Expense[]) {
 
    const newExpenses = [...expenses, newExpense];

    this.storage
      .set("expenses", newExpenses)
      .then(() => {
        this._expenses.next(newExpenses);
      })
      .catch((err) => {
        throw Error(err);
      });
  }

  updateExpense(id: number, updatedExpense: Expense, expenses: Expense[]) {
    const updatedExpenses: Expense[] = [
      ...expenses.filter((item) => item.id !== id),
      { ...updatedExpense, id: id },
    ];
    this.storage
      .set("expenses", updatedExpenses)
      .then(() => {
        this._expenses.next(updatedExpenses);
      })
      .catch((err) => {
        throw Error(err);
      });
  }

  removeExpense(id: number, expenses: Expense[]) {
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    this.storage
      .set("expenses", newExpenses)
      .then(() => {
        this._expenses.next(newExpenses);
      })
      .catch((err) => {
        throw Error(err);
      });
  }

  removeCategory(categoryName: string, categories: string[]) {
    const newCategories = categories.filter((item) => item !== categoryName);
    return this.storage.set("categories", newCategories).then(() => {
      this._categories.next(newCategories);
    });
  }

  removePayMethod(payMethodName: string, paymentMethods: string[]) {
    const newpaymentMethods = paymentMethods.filter(
      (item) => item !== payMethodName
    );
    return this.storage.set("paymentMethods", newpaymentMethods).then(() => {
      this._paymentMethods.next(newpaymentMethods);
    });
  }

  addNewCategory(newCategory: string, categories: string[]): Promise<any> {
    const newCategories = [...categories, newCategory];
    return this.storage.set("categories", newCategories).then(() => {
      this._categories.next(newCategories);
    });
  }

  addNewPaymentMethod(
    newPaymentMethod: string,
    paymentMethods: string[]
  ): Promise<any> {
    const newPaymentMethods = [...paymentMethods, newPaymentMethod];

    return this.storage.set("paymentMethods", newPaymentMethods).then(() => {
      this._paymentMethods.next(newPaymentMethods);
    });
  }


  get filteredExpenses() {
    return [...this._filteredExpenses];
  }

  set filteredExpenses(val: Expense[]) {
    this._filteredExpenses = [...val];
    this.expensesSorted.next(true);
  }

  calcTotalExpenses(expenses: Expense[]): void {
    const totalAmount = expenses.reduce((total: number, val: Expense) => {
      return total + val.amount*val.freqPay;
    }, 0);
    this._totalExpenses.next(totalAmount);
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
 
    let ascendingSort = expenses.sort((a, b) => {
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
      } 
      if (sortBy === "amount"){
        if (a.amount*a.freqPay > b.amount*b.freqPay) return -1;
        if (a.amount*a.freqPay  < b.amount*b.freqPay ) return 1;
        return 0;
      }
      else {
        if (a[sortBy] > b[sortBy]) return -1;
        if (a[sortBy] < b[sortBy]) return 1;
        return 0;
      }
    })
    
    if (sortType === "acs")
       return ascendingSort;
    else 
       return ascendingSort.reverse();

  
  }

  filterDateExpenses(
    dataArray: Expense[],
    startDate: number,
    endDate: number
  ): Expense[] {
    return dataArray.filter((expense) => {
      if (expense.numberOfPay)
        return (
          this.calcLastPayDate(expense.fristPayDate, expense.numberOfPay) >
            startDate &&
          this.calcLastPayDate(expense.fristPayDate, expense.numberOfPay) <
            endDate
        );
      else return false;
  
    });
  }
}
