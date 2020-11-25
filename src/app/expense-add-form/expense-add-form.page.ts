import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ExpensesService } from "../services/expenses/expenses.service";
import { Router, ActivatedRoute } from "@angular/router";
import { formatDate } from "@angular/common";
import { PopoverController, ToastController } from "@ionic/angular";
import { OpthionEditSettingsComponent } from "../opthion-edit-settings/opthion-edit-settings.component";
import { LanguageService } from "../services/language/language.service";
import { Expense } from "../models/expense.model";

@Component({
  selector: "app-expense-add-form",
  templateUrl: "./expense-add-form.page.html",
  styleUrls: ["./expense-add-form.page.scss"],
})
export class ExpenseAddFormPage implements OnInit {
  id: string = null;
  expense:Expense;
  selectedExpense: Expense;
  expenses:Expense[];
  editMode: boolean = false;
  form: FormGroup;
  title: string = "Add new Expense";
  categories: string[];
  paymentMethods: string[];
  isAddCategory = false;
  newCategory = "new cat";
  newPaymentMethod = "new pay";
  isAddPaymentMethod = false;
  languageWords = null;
  constructor(
    private expensesService: ExpensesService,
    private router: Router,
    private route: ActivatedRoute,
    public popoverController: PopoverController,
    public toastController: ToastController,
    private languageServ: LanguageService
  ) {
/*     this.selectedExpense = this.router.getCurrentNavigation().extras.state.selectedExpense;
    console.log(this.selectedExpense); */
  }

  ngOnInit() {
    this.expensesService.expenses.subscribe((expenses:Expense[])=>{
this.expenses = expenses;
    })
    this.expensesService.categories.subscribe((categories: string[]) => {
      this.categories = categories;
    });
    this.expensesService.paymentMethods.subscribe((paymentMethods) => {
      this.paymentMethods = paymentMethods;
    });

    this.languageServ.selectedLanguage.subscribe((languageWords) => {
      this.languageWords = languageWords;
    });
    /* this.expensesService.dataChanged.subscribe((val) => {
      this.categories = this.expensesService.categories;
      this.paymentMethods = this.expensesService.paymentMethods;
    });
    this.expensesService.localCategoriesLoaded.subscribe((val) => {
      if (val) {
        this.categories = this.expensesService.categories;
      }
    }); */

    /*  this.expensesService.localPaymentMethodsLoaded.subscribe((val) => {
      if (val) {
        this.paymentMethods = this.expensesService.paymentMethods;
      }
    });
 */
    this.id = this.route.snapshot.paramMap.get("id");
    let name = null,
      amount = null,
      category = null,
      methodPay = null,
      freqPay = null,
      benef = null,
      commitDate = null,
      fristPayDate = null,
      numberOfPay = null;

    if (this.id !== null) {
      this.title = "Edit expense";
      this.editMode = true;

      ({
        name,
        amount,
        category,
        methodPay,
        freqPay,
        benef,
        commitDate,
        fristPayDate,
        numberOfPay,
      } = this.expenses.find((expense=>(expense.id === +this.id))));
    } else {
      this.editMode = false;
    }
    this.form = new FormGroup({
      name: new FormControl(name, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      amount: new FormControl(amount, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      category: new FormControl(category, {
        updateOn: "blur",
      }),
      methodPay: new FormControl(methodPay, {
        updateOn: "blur",
      }),
      freqPay: new FormControl(freqPay, { updateOn: "blur" }),
      benef: new FormControl(benef, { updateOn: "blur" }),
      commitDate: new FormControl(commitDate, {
        updateOn: "blur",
      }),
      fristPayDate: new FormControl(fristPayDate, {
        updateOn: "blur",
      }),
      numberOfPay: new FormControl(numberOfPay, {
        updateOn: "blur",
      }),
    });
  }

  onUpdate() {
    this.expensesService.updateExpense(+this.id, this.form.value,this.expenses);
    this.router.navigate(["/", "home"]);
  }

  onAdd() {
    if (this.form.valid) {
     
      this.expensesService.addNewExpense(this.form.value,this.expenses);
      this.form.reset();
      // this.router.navigate(["/", "home"]);
      this.presentToastDataAdded();
    } else {
      this.presentToast();
      //alert("enter requided data(amount,category");
    }
  }
  onDelete() {
    this.expensesService.removeExpense(+this.id,this.expenses);
  }
  onBack() {
    this.router.navigate(["/", "home"]);
  }
/* 
  addCategory() {
    this.expensesService.addNewCategory(this.newCategory,this.categories).then(()=>{
      this.isAddCategory = true;
    })
  
  }

  addPaymentMethod() {
    this.expensesService.addNewPaymentMethod(this.newPaymentMethod,this.paymentMethods).then(()=>{
      this.isAddPaymentMethod = true;
    })
   
  }

  saveCategory() {
    this.expensesService.categories.
    this.categories.push(this.newCategory);
    this.expensesService.category = this.newCategory;
    this.expensesService.saveLocalCategories();
    this.isAddCategory = false;
    this.form.controls["category"].setValue(this.newCategory);
  }

  savePaymentMethod() {
    this.paymentMethods.push(this.newPaymentMethod);
    this.expensesService.paymentMethod = this.newPaymentMethod;
    this.expensesService.saveLocalPaymentMethods();
    this.isAddPaymentMethod = false;
    this.form.controls["methodPay"].setValue(this.newPaymentMethod);
  } */

  onInputCategory(val) {
    this.newCategory = val.target.value;
  }

  onInputPaymentMethod(val) {
    this.newPaymentMethod = val.target.value;
  }
  async onSettingClick(ev: any) {
    const popover = await this.popoverController.create({
      component: OpthionEditSettingsComponent,
      cssClass: "my-custom-class",
      event: ev,
      translucent: true,
    });
    return await popover.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.languageWords.enterRequired,
      duration: 2000,
      color: "warning",
    });
    toast.present();
  }
  async presentToastDataAdded() {
    const toast = await this.toastController.create({
      message: this.languageWords.dataAdded,
      duration: 1000,
      color: "success",
    });
    toast.present();
  }
}
