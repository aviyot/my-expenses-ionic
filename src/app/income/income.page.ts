import { Component,OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ModalController } from "@ionic/angular";
import { Income } from "../models/income.model";
import { IncomesService } from "../services/incomes/incomes.service";
import { SelectOpthionService } from "../services/select-opthion/select-opthion.service";

@Component({
  selector: 'app-income',
  templateUrl: './income.page.html',
  styleUrls: ['./income.page.scss'],
})
export class IncomePage implements OnInit {
 newIncomeType = new FormControl();
  fc = new FormControl(); 
  incomeGroup = new FormGroup({
    amount :new FormControl('',Validators.required),
    from : new FormControl('',Validators.required),
    incomeType :new FormControl(),
    startDate : new FormControl(),
  });
  incomes: Income[] = [];
  incomeTypes:string[] = [];
  newAdd = false;
  addNewIncomeType = false;
  formIsValid = false;
  totalIncomes = 0;
  selectedIncomeId: number;
  constructor(
    private router: Router,
    public modalController: ModalController,
    private incomesService: IncomesService,
    private selectOpthion : SelectOpthionService
  ) {}

  ngOnInit() {
    this.incomesService.income$.subscribe((income) => {

      this.totalIncomes += income.amount;
    });
    this.incomesService.loadIncomesLocal().then((incomes) => {
      if(incomes){
      this.incomes = incomes;
      this.totalIncomes = this.incomesService.calcTotalIncomes(this.incomes);
      }
    });
    this.selectOpthion.incomeTypes.subscribe((incomeTypes)=>{
         this.incomeTypes = incomeTypes;
    })

    this.selectOpthion.loadSelectOpthion("incomeTypes");
  }
  closeModal() {
    //this.modalController.dismiss();
    this.router.navigate(['/','home']);
    this.addNewIncomeType = false;
  }

  onSave() {
    if(this.incomeGroup.valid) {
    const {
      type,amount,from,startDate
    } = this.incomeGroup.value
    this.incomesService.incomeSet({
      id: new Date().getTime(),
      type,
      amount,
      from,
      startDate
    });
    this.incomes = [
      ...this.incomes,
      {
        id: new Date().getTime(),
        type,
        amount,
        from,
        startDate
      },
    ];
    this.newAdd = false;
    this.resetForm();
  }
  else {
    this.formIsValid = true;

  }
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
  openAddForm() {
    this.newAdd = !this.newAdd;
    if(!this.newAdd)
       this.formIsValid = false;

  }
  ngOnDestroy() {
    this.incomesService.saveIncomesLocal(this.incomes);
  }

  resetForm(){
    this.incomeGroup.reset();
    this.formIsValid = false;
    this.addNewIncomeType = false;

  }

  clickOp(val){
    if(this.incomeGroup.get('incomeType').value == "new_type") {
      this.addNewIncomeType = true;
      console.log("add new");
   /*  this.incomeTypes = [...this.incomeTypes ,"type10"]
    this.incomeGroup.patchValue({incomeType:"type10"}) */
    }
  }

  onAddNewIncomeType(){
    this.incomeTypes = [...this.incomeTypes ,this.newIncomeType.value];
    this.incomeGroup.patchValue({incomeType:this.newIncomeType.value}) 
    this.newIncomeType.reset();
    this.addNewIncomeType = false;
  }

  onFocus(){
    console.log("input focus");
    this.fc.setValue("new value");
  }

  showSelectOpthion(selectName){
  this.selectOpthion.createSelectOpthionModal(selectName).then(()=>{
    this.selectOpthion.selectOpthionModal.onDidDismiss().then((data:string) => {
      switch (selectName) {
        case "incomeTypes": 
        selectName = "incomeType";
         break;
      }
      console.log(selectName);
    this.incomeGroup.patchValue({
        [selectName]: data["data"]["value"],
      }); 
    });

  });
}

}
