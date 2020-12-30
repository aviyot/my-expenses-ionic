import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { BehaviorSubject } from "rxjs";
import { Storage } from "@ionic/storage";
import { OpthionEditSettingsComponent } from "src/app/opthion-edit-settings/opthion-edit-settings.component";
import { ModalController } from "@ionic/angular";


@Injectable({
  providedIn: "root",
})
export class SelectOpthionService {

  private _categories: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);
  private _paymentMethods: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);

  private _payees: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    []
  );

  private _incomeTypes : BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]); 

  selectOpthionModal: any;

  constructor(
    private storage: Storage,
    private modalController: ModalController
  ) {}
 
  get categories(): Observable<string[]> {
    return this._categories.asObservable();
  }
  get payees(): Observable<string[]> {
    return this._payees.asObservable();
  }

  get paymentMethods(): Observable<string[]> {
    return this._paymentMethods.asObservable();
  }

  get incomeTypes():Observable<string[]>{
    return this._incomeTypes.asObservable();
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
      case "incomeTypes":
        this._incomeTypes.next(selectOpthions);
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
    return this.storage.set(selectOpthionKey, newSelectOpthions).then(() => {
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

  async createSelectOpthionModal(selectName:string) {
    this.selectOpthionModal = await this.modalController.create({
      component: OpthionEditSettingsComponent,
      componentProps: {
        selectName: selectName,
      },
    });
    return await this.selectOpthionModal.present();
  }
}
