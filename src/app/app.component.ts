import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LanguageService } from './services/language/language.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  selectedLanguageWords = null;
  title="";
  sb:Subscription = new Subscription();
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private languageServ : LanguageService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  
  ngOnInit(){
   this.sb = this.languageServ.selectedLanguage.subscribe((words:any)=>{
         this.selectedLanguageWords  = {...words};
         const {title} = this.selectedLanguageWords;
         this.title = title;
    })
  }

  onClick1(){
    this.languageServ.changeLang("english");
  }
  onClick2(){
    this.languageServ.changeLang("hebrew");
  }
  ngOnDestroy(){
    console.log("un");
    this.sb.unsubscribe();
  }
}
