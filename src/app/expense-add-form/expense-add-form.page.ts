import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ExpensesService } from "../services/expenses/expenses.service";
import { SelectOpthionService } from "../services/select-opthion/select-opthion.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { LanguageService } from "../services/language/language.service";
import { Expense } from "../models/expense.model";

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
  payees: string[];
  isAddCategory = false;
  newCategory = "new cat";
  newPaymentMethod = "new pay";
  isAddPaymentMethod = false;
  languageWords = null;
  defaultMethodPay: string;
  defaultCategory: string;
  modal = null;

  constructor(
    private expensesService: ExpensesService,
    private router: Router,
    private route: ActivatedRoute,
    public toastController: ToastController,
    private languageServ: LanguageService,
    private selectOpthion: SelectOpthionService
  ) {}

  ngOnInit() {
    this.createForm();
    this.expensesService.expenses.subscribe((expenses: Expense[]) => {
      this.expenses = expenses;
      this.getExpenseId();
    });
    this.selectOpthion.categories.subscribe((categories: string[]) => {
      this.categories = categories;
    });
    this.selectOpthion.paymentMethods.subscribe((paymentMethods) => {
      this.paymentMethods = paymentMethods;
    });

    this.selectOpthion.payees.subscribe((payees) => {
      this.payees = payees;
    });
    this.languageServ.selectedLanguage.subscribe((languageWords) => {
      this.languageWords = languageWords;
    });

    this.selectOpthion.loadSelectOpthion("categories");
    this.selectOpthion.loadSelectOpthion("paymentMethods");
    this.selectOpthion.loadSelectOpthion("payees");
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
      this.form.patchValue({
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
      this.form.patchValue({
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
      this.presentToastDataAdded().then(() => {
        if (!muliplay) this.router.navigate(["/", "home"]);
      });
    } else {
      this.presentToast();
    }
  }
  onDelete() {
    this.expensesService.removeExpense(+this.selectedId, this.expenses);
  }
  onBack() {
    this.router.navigate(["/", "home"]);
  }

  onInputCategory(val) {
    this.newCategory = val.target.value;
  }

  onInputPaymentMethod(val) {
    this.newPaymentMethod = val.target.value;
  }
  async onSettingClick(selectName: string) {
    this.selectOpthion.createSelectOpthionModal(selectName).then(() => {
      this.selectOpthion.selectOpthionModal
        .onDidDismiss()
        .then((data: string) => {
          switch (selectName) {
            case "categories":
              selectName = "category";
              break;
            case "paymentMethods":
              selectName = "methodPay";
              break;
            case "payees":
              selectName = "benef";
              break;
          }
          this.form.patchValue({
            [selectName]: data["data"]["value"],
          });
        });
    });
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
