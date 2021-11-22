import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
} from "@angular/core";
import { Router } from "@angular/router";
import { Entries } from "src/assets/languages/languages";
import { Expense } from "../models/expense.model";
import { ExpenseHeader } from "../models/expenseHeader.model";
import { LanguageService } from "../services/language/language.service";

@Component({
  selector: "app-expenses",
  templateUrl: "./expenses.component.html",
  styleUrls: ["./expenses.component.scss"],
})
export class ExpensesComponent implements OnChanges, OnInit {
  @Output() select: EventEmitter<number> = new EventEmitter();
  @Output() selectedOp: EventEmitter<string> = new EventEmitter(null);
  @Input() expenses: Expense[] = [];
  @Input() showDetails: boolean = false;
  @Input() selectedId: number = null;
  @Input() selectedSortType: string;
  colDiv: number;
  @Input() selectedArr: number[] = [];
  @Input() multiypleSelect = false;
  expenseHeader: ExpenseHeader;
  languageWords: Entries;

  constructor(private router: Router, private languageServ: LanguageService) {}

  ngOnInit() {
    this.languageServ.selectedLanguage.subscribe((languageWords: Entries) => {
      this.languageWords = languageWords;

      this.expenseHeader = {
        id: {
          headerName: this.languageWords.id,
          display: true,
        },

        name: {
          headerName: this.languageWords.name,
          display: true,
        },

        amount: {
          headerName: this.languageWords.amount,
          display: true,
        },
        category: {
          headerName: this.languageWords.category,
          display: true,
        },

        methodPay: {
          headerName: this.languageWords.methodPay,
          display: true,
        },

        freqPay: {
          headerName: this.languageWords.freqPay,
          display: true,
        },

        benef: {
          headerName: this.languageWords.benef,
          display: true,
        },

        commitDate: {
          headerName: this.languageWords.commitDate,
          display: true,
        },

        fristPayDate: {
          headerName: this.languageWords.fristPayDate,
          display: true,
        },

        numberOfPay: {
          headerName: this.languageWords.numberOfPay,
          display: true,
        },
      };
    });
  }
  ngOnChanges() {
    if (this.selectedSortType) {
      this.colDiv = 0;
    } else {
      this.colDiv = 2;
    }
  }
  onSelect(selectedId: number) {
    this.select.emit(selectedId);
  }

  onEdit(ev) {
    this.selectedOp.emit("edit");
    ev.stopPropagation();

    /*    this.router.navigate(["/", "expense-add-form", "edit", this.selectedId]);
    this.selectedId = null; */
  }
  onDelete(ev) {
    this.selectedOp.emit("delete");
    ev.stopPropagation();
  }

  isItemInclude(id: number): boolean {
    return this.selectedArr.includes(id);
  }
}
