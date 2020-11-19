import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Storage } from "@ionic/storage";
import { Income } from "src/app/models/income.model";

@Injectable({
  providedIn: "root",
})
export class IncomesService {
  private _income$: Subject<Income> = new Subject<Income>();
  private _incomeAction$ = new Subject<any>();
  private _income: Income;
  private _incomes: Income[] = [];

  constructor(private storage: Storage) {
  this.loadIncomesLocal().then((incomes: Income[]) => {
      if(incomes)
        this._incomes = incomes;
    });
 /*    this._income$.subscribe((val: Income) => {
      console.log("frist Val",val);
      this._income = val;
      this._incomes = [...this._incomes, val];
      this.storage.set("incomes", this._incomes);
    }); */
  }

  incomeAction(action:string){
      if(action === "delete")
       this._incomeAction$.next("delete");
  }

  incomeSet(income:Income){
      this._income$.next(income);
  }
  
  get income$(): Observable<Income> {
    return this._income$.asObservable()
  }

  get incomeAction$():Observable<any>{
    return this._incomeAction$.asObservable();
  }
  get incomes(): Income[] {
    return [...this._incomes];
  }
  set incomes(income:Income[]){
    this._incomes = [...income];
  }

  saveIncomesLocal(incomes:Income[]){
    return this.storage.set("incomes",incomes);
  }

  loadIncomesLocal():Promise<Income[]>{
    return this.storage.get("incomes");
  }

  calcTotalIncomes(incomes:Income[]):number {
    return incomes.reduce((total: number, val: Income) => {
      return total + val.amount;
    }, 0)
  }
}
