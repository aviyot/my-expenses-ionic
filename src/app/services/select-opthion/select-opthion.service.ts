import { Injectable } from "@angular/core";
import { Observable} from "rxjs";
import { BehaviorSubject } from "rxjs";
import { Storage } from "@ionic/storage";

class SelectOpthion {
  constructor(private selectName: string, private opthions: string[]) {}
}

@Injectable({
  providedIn: "root",
})
export class SelectOpthionService {
  private _selectOpthions: BehaviorSubject<
    SelectOpthion[]
  > = new BehaviorSubject<SelectOpthion[]>([]);

  private _categories: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);
  private _paymentMethods: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);

  private _payees: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    []
  );

  
  constructor(private storage: Storage) {}

  get selectOpthions(): Observable<SelectOpthion[]> {
    return this._selectOpthions.asObservable();
  }

  get categories(): Observable<string[]> {
    return this._categories.asObservable();
  }
  get payees(): Observable<string[]> {
    return this._payees.asObservable();
  }

  get paymentMethods(): Observable<string[]> {
    return this._paymentMethods.asObservable();
  }

  doNextBySelectOpthions(selectOpthionKey: string, selectOpthions: string[]) {
    switch (selectOpthionKey) {
      case "categories": 
        this._categories.next(selectOpthions);
        break;
      case "paymentMethods":
        this._paymentMethods.next(selectOpthions);
        break;
      case "payees":
        this._payees.next(selectOpthions);
        break;

    }
  }

  loadSelectOpthion(selectOpthionKey: string) {
    this.storage.get(selectOpthionKey).then((selectOpthions: string[]) => {
      if (selectOpthions) {
        this.doNextBySelectOpthions(selectOpthionKey, selectOpthions);
      }
    });
  }

  addNewSelectOpthion(
    newSelectOpthion: string,
    selectOpthionKey: string,
    selectOpthions: string[]
  ): Promise<any> {
    const newSelectOpthions = [...selectOpthions, newSelectOpthion];
    return this.storage.set(selectOpthionKey,newSelectOpthions).then(() => {
      this.doNextBySelectOpthions(selectOpthionKey, newSelectOpthions);
    });
  }

  removeSelectOpthion(
    selectOpthionKey: string,
    selectOpthionName: string,
    selectOpthions: string[]
  ) {
    const newSelectOpthion = selectOpthions.filter(
      (item) => item !== selectOpthionName
    );
    return this.storage.set(selectOpthionKey, newSelectOpthion).then(() => {
      this.doNextBySelectOpthions(selectOpthionKey, newSelectOpthion);
    });
  }
}
