import { Component, Input, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { LanguageService } from "../services/language/language.service";
import { SharedService } from "../services/shared/shared.service";
import { SelectOpthionService } from "../services/select-opthion/select-opthion.service";

@Component({
  selector: "app-opthion-edit-settings",
  templateUrl: "./opthion-edit-settings.component.html",
  styleUrls: ["./opthion-edit-settings.component.scss"],
})
export class OpthionEditSettingsComponent implements OnInit {
  @Input() selectName: string;
  selectOpthions: string[] = [];
  title: string;
  newOpthion = new FormControl("", [Validators.required]);
  selectedOpthion = null;
  itemSelected: boolean = false;
  languageWords: any;
  constructor(
    private languageServ: LanguageService,
    private sharedService: SharedService,
    private selectOpthionService: SelectOpthionService
  ) {}

  ngOnInit() {
    this.languageServ.selectedLanguage.subscribe((languageWords) => {
      this.languageWords = languageWords;

      this.selectOpthionService[this.selectName].subscribe((selectOpthions) => {
        this.selectOpthions = selectOpthions;
        switch (this.selectName) {
          case "categories":
            this.title = this.languageWords[this.selectName];
            break;
          case "paymentMethods":
            this.title = this.languageWords[this.selectName];
            break;
          case "payees":
            this.title = this.languageWords[this.selectName];
            break;
          case "incomeTypes":
            this.title = this.languageWords[this.selectName];
            break;
          default:
            this.title = "Edit Opthions";
        }
      });
    });
  }

  removeOpthion() {
    this.selectOpthionService.removeSelectOpthion(
      this.selectName,
      this.selectedOpthion,
      this.selectOpthions
    );

    this.selectedOpthion = null;
    this.itemSelected = false;
  }

  onSelectOpthion(val) {
    if (this.itemSelected) {
      this.selectedOpthion = null;
      this.itemSelected = false;
    } else {
      this.selectedOpthion = val;
      this.itemSelected = true;
    }
  }

  addNewOpthion() {
    let valueExit = this.selectOpthions.includes(this.newOpthion.value);

    if (this.selectOpthions.length === 0) valueExit = false;

    if (!valueExit) {
      this.selectOpthionService.addNewSelectOpthion(
        this.newOpthion.value,
        this.selectName,
        this.selectOpthions
      );

      this.selectedOpthion = this.newOpthion.value;
      this.itemSelected = true;
    }
    this.newOpthion.reset();
  }

  closeModal() {
    this.sharedService.closeModal({
      selectName: this.selectName,
      value: this.newOpthion.value,
    });
  }

  selectOpthion() {
    this.sharedService.closeModal({
      selectName: this.selectName,
      value: this.selectedOpthion,
    });
  }
}
