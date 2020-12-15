import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ExpensesService } from "../services/expenses/expenses.service";
import { Router, ActivatedRoute } from "@angular/router";
import {
  AlertController,
  PopoverController,
  ToastController,
} from "@ionic/angular";
import { OpthionEditSettingsComponent } from "../opthion-edit-settings/opthion-edit-settings.component";
import { LanguageService } from "../services/language/language.service";
import { Expense } from "../models/expense.model";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-expense-add-form",
  templateUrl: "./expense-add-form.page.html",
  styleUrls: ["./expense-add-form.page.scss"],
})
export class ExpenseAddFormPage implements OnInit {
  intialExpenses: Expense = new Expense(
    new Date().getTime(),
    null,
    null,
    null,
    null,
    1,
    null,
    new Date(),
    new Date(),
    1
  );
  selectedId: string = null;
  expense: Expense;
  selectedExpense: Expense;
  expenses: Expense[];
  editMode: boolean = false;
  form: FormGroup;
  title: string = "Add New Expense";
  categories: string[];
  paymentMethods: string[];
  isAddCategory = false;
  newCategory = "new cat";
  newPaymentMethod = "new pay";
  isAddPaymentMethod = false;
  languageWords = null;
  defaultMethodPay: string;
  defaultCategory: string;
  payMethodCustomAlertOptions: any = {
    header: "Select Pay Method",
    buttons: [
      { text: "Delete", role: "destructive" },
      { text: "Share" },
      { text: "Play" },
      { text: "Favorite" },
      { text: "Cancel", role: "cancel" },
    ],
  };
  categoryCustomAlertOptions: any = {
    header: "Select Category",
    buttons: [
      { text: "Delete", role: "destructive" },
      { text: "Share" },
      { text: "Play" },
      { text: "Favorite" },
      { text: "Cancel", role: "cancel" },
    ],
  };
  constructor(
    private expensesService: ExpensesService,
    private router: Router,
    private route: ActivatedRoute,
    public modalController: PopoverController,
    public toastController: ToastController,
    private languageServ: LanguageService,
    private storage: Storage,
    private alertController: AlertController
  ) {
    /*     this.selectedExpense = this.router.getCurrentNavigation().extras.state.selectedExpense;
    console.log(this.selectedExpense); */
  }

  ngOnInit() {
    this.createForm();

    this.expensesService.expenses.subscribe((expenses: Expense[]) => {
      this.expenses = expenses;
      this.getExpenseId();
    });
    this.expensesService.categories.subscribe((categories: string[]) => {
      this.categories = categories;
      this.defaultCategory = this.categories[0];
      this.intialExpenses = {
        ...this.intialExpenses,
        category: this.defaultCategory,
      };
    });
    this.expensesService.paymentMethods.subscribe((paymentMethods) => {
      this.paymentMethods = paymentMethods;
      this.defaultMethodPay = this.paymentMethods[0];
      this.intialExpenses = {
        ...this.intialExpenses,
        methodPay: this.defaultMethodPay,
      };
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

    /* let name = null,
      amount = null,
      category = null,
      methodPay = null,
      freqPay = 1,
      benef = null,
      commitDate = new Date(),
      fristPayDate = new Date(),
      numberOfPay = 1;
 */
  }
  createForm() {
    this.form = new FormGroup({
      name: new FormControl("", {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      amount: new FormControl("", {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      category: new FormControl("", {
        updateOn: "blur",
      }),
      methodPay: new FormControl("", {
        updateOn: "blur",
      }),
      freqPay: new FormControl("", { updateOn: "blur" }),
      benef: new FormControl("", { updateOn: "blur" }),
      commitDate: new FormControl("", {
        updateOn: "blur",
      }),
      fristPayDate: new FormControl("", {
        updateOn: "blur",
      }),
      numberOfPay: new FormControl("", {
        updateOn: "blur",
      }),
    });
  }

  getExpenseId() {
    this.selectedId = this.route.snapshot.paramMap.get("id");
    if (this.selectedId) {
      this.title = "Edit expense";
      this.editMode = true;
      const {
        name,
        amount,
        category,
        methodPay,
        freqPay,
        benef,
        commitDate,
        fristPayDate,
        numberOfPay,
      } = this.expenses.find((expense) => expense.id === +this.selectedId);
      this.form.setValue({
        name: name,
        amount: amount,
        category: category,
        methodPay: methodPay,
        freqPay: freqPay,
        benef: benef,
        commitDate: commitDate,
        fristPayDate: fristPayDate,
        numberOfPay: numberOfPay,
      });
    } else {
      this.editMode = false;
      const {
        name,
        amount,
        category,
        methodPay,
        freqPay,
        benef,
        commitDate,
        fristPayDate,
        numberOfPay,
      } = this.intialExpenses;
      this.form.setValue({
        name: name,
        amount: amount,
        category: category,
        methodPay: methodPay,
        freqPay: freqPay,
        benef: benef,
        commitDate: commitDate,
        fristPayDate: fristPayDate,
        numberOfPay: numberOfPay,
      });
    }
  }

  onUpdate() {
    this.expensesService.updateExpense(
      +this.selectedId,
      this.form.value,
      this.expenses
    );
    this.router.navigate(["/", "home"]);
  }

  onAdd(muliplay: boolean) {
    if (this.form.valid) {
      this.expensesService.addNewExpense(
        { ...this.form.value, id: new Date().getTime() },
        this.expenses
      );
      this.form.reset();
      // this.router.navigate(["/", "home"]);
      this.presentToastDataAdded().then(() => {
        if (!muliplay) this.router.navigate(["/", "home"]);
      });
    } else {
      this.presentToast();
      //alert("enter requided data(amount,category");
    }
  }
  onDelete() {
    this.expensesService.removeExpense(+this.selectedId, this.expenses);
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
  async onSettingClick(selectName:string) {
    const modal = await this.modalController.create({
      component: OpthionEditSettingsComponent,
      componentProps : {
        selectName:selectName
      },
      translucent: true,
    });
    return await modal.present();
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

  async editOpthions(opthion: string) {
    let header = opthion;
    if (opthion === "cat") {
      header = "Add new category";
    }
    if (opthion === "pay") {
      header = "Add new pay method";
    }

    const editOpthionsAlertController = await this.alertController
      .create({
        header,
        inputs:[
          {
            name:'newOpthion',
            type:"text",
            placeholder:"Type new opthion",

          }
        ],
        buttons:[
          {
            text:'Cancel',
            role:'cancel'
          },
          {
            text:'Add',
            role:'ok',
            handler:(inputs)=>{

              if (opthion === "cat") {
                this.expensesService.addNewCategory(inputs.newOpthion,this.categories);
                
              }
              if (opthion === "pay") {
                this.expensesService.addNewPaymentMethod(inputs.newOpthion,this.paymentMethods);
                this.newPaymentMethod = inputs.newOpthion;
              
              }
            }
          }
        ]
      })

      editOpthionsAlertController.present();
    
  }
  onFocus(ev){
   // alert("hhh");
    console.log(ev);
  }
}
