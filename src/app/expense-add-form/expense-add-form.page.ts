import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ExpensesService } from "../services/expenses/expenses.service";
import { Expense } from "../models/expense.model";
import { Router, ActivatedRoute } from "@angular/router";
import { formatDate } from "@angular/common";
import { PopoverController } from "@ionic/angular";
import { OpthionEditSettingsComponent } from "../opthion-edit-settings/opthion-edit-settings.component";

@Component({
  selector: "app-expense-add-form",
  templateUrl: "./expense-add-form.page.html",
  styleUrls: ["./expense-add-form.page.scss"],
})
export class ExpenseAddFormPage implements OnInit {
  id: string = null;
  editMode: boolean = false;
  form: FormGroup;
  title: string = "Add new Expense";
  categories: string[];
  paymentMethods: string[];
  isAddCategory = false;
  newCategory = "new cat";
  newPaymentMethod = "new pay";
  isAddPaymentMethod = false;

  constructor(
    private expensesService: ExpensesService,
    private router: Router,
    private route: ActivatedRoute,
    public popoverController: PopoverController
  ) {}

  ngOnInit() {
    this.expensesService.dataChanged.subscribe((val) => {
      this.categories = this.expensesService.categories;
      this.paymentMethods = this.expensesService.paymentMethods;
    });
    this.expensesService.localCategoriesLoaded.subscribe((val) => {
      if (val) {
        this.categories = this.expensesService.categories;
      }
    });

    this.expensesService.localPaymentMethodsLoaded.subscribe((val) => {
      if (val) {
        this.paymentMethods = this.expensesService.paymentMethods;
      }
    });

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
      } = this.expensesService.expenses.filter(
        (expense) => expense.id === +this.id
      )[0]);
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
      commitDate: new FormControl(
        formatDate(commitDate, "yyyy-MM-ddTHH:mm", "en"),
        {
          updateOn: "blur",
        }
      ),
      fristPayDate: new FormControl(
        formatDate(fristPayDate, "yyyy-MM-dd", "en"),
        {
          updateOn: "blur",
        }
      ),
      numberOfPay: new FormControl(numberOfPay, {
        updateOn: "blur",
      }),
    });
  }

  onUpdate() {
    this.expensesService.update(+this.id, this.form.value);
    this.router.navigate(["/", "home"]);
  }

  onAdd() {
    if (this.form.valid) {
      this.expensesService.addNew(this.form.value);
      this.form.reset();
      this.router.navigate(["/", "home"]);
    } else {
      alert("enter requided data(amount,category");
    }
  }
  onDelete() {
    this.expensesService.delete(+this.id);
  }
  onBack() {
    this.router.navigate(["/", "home"]);
  }

  addCategory() {
    this.isAddCategory = true;
  }

  addPaymentMethod() {
    this.isAddPaymentMethod = true;
  }

  saveCategory() {
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
  }

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
}
