import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import languages, { Entries } from "../../../assets/languages/languages";

@Injectable({
  providedIn: "root",
})
export class LanguageService {
  languages = languages;
  private _selectedLanguage: BehaviorSubject<any> = new BehaviorSubject(
    this.languages["hebrew"]
  );
  public selectedLanguage: Observable<Entries> =
    this._selectedLanguage.asObservable();

  constructor() {}
  changeLang(language: string) {
    this._selectedLanguage.next(this.languages[language]);
  }
}
