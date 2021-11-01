import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { LanguageService } from "../services/language/language.service";

@Component({
  selector: "app-app-menu",
  templateUrl: "./app-menu.component.html",
  styleUrls: ["./app-menu.component.scss"],
})
export class AppMenuComponent implements OnInit {
  languageWords: any;
  sb: Subscription = new Subscription();
  languageMenuOpen: boolean;
  constructor(private languageServ: LanguageService) {}

  ngOnInit() {
    this.sb = this.languageServ.selectedLanguage.subscribe((words: any) => {
      this.languageWords = words;
    });
  }

  openLanguageMenu() {
    this.languageMenuOpen = !this.languageMenuOpen;
  }
  onMenuClose() {
    this.languageMenuOpen = false;
  }

  onClick1() {
    this.languageServ.changeLang("english");
  }
  onClick2() {
    this.languageServ.changeLang("hebrew");
  }
  ngOnDestroy() {
    console.log("un");
    this.sb.unsubscribe();
  }
}
