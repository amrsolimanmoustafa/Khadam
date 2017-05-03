import {Component} from '@angular/core';

import {NavController, LoadingController} from 'ionic-angular';
import {GlobalService} from "../../providers/GlobalService";
import {HomepagePage} from "../homepage/homepage";
import {TranslateService} from "ng2-translate";
import {SelectCountryButtonsPage} from "../select-country-buttons/select-country-buttons";
declare var google: any;

@Component({
  selector: 'choose-language',
  templateUrl: 'choose-language.html'
})
export class ChooseLanguage {
  comment: string = "";
  zip: string = "";
  address: string = "";
  lat: number = 0;
  lng: number = 0;

  constructor(public navCtrl: NavController, public globalService: GlobalService, public loadingCtrl: LoadingController
    , public translate: TranslateService,) {


    if (globalService.user == null) {
      let loader = this.loadingCtrl.create({});
      loader.present();
      this.globalService.getUser()
        .then(
          data => {
            let user = JSON.parse(data);
            // console.log(data);
            if (JSON.stringify(user) != "" && data != null) {
              this.globalService.setUser(user);
              this.globalService.loggedIn = true;
              this.navCtrl.setRoot(ChooseLanguage);
            }
            this.defLanguage();
            loader.dismissAll();
          }
        );
    }
  }


  defLanguage() {
    this.globalService.getDefaultLang()
      .then(
        data => {
          if (data == "ar") {
            this.globalService.arabic();
            // console.log("Lang is ar: " + data);
          } else if (data == "en") {
            this.globalService.english();
            // console.log("Lang is en: " + data);
          } else {
            this.globalService.setDefaultLang('en');
            // console.log("Lang is nothing setting it to english by default: " + data);
          }
        }
      );
  }


  setLanguage(language) {
    this.globalService.setDefaultLang(language);
    this.globalService.getCountry().then(data => {
      console.log('CHOOSELANG;data from get country ist: ');
      console.log(data);
      if (data == null || data == '') {
        this.navCtrl.setRoot(SelectCountryButtonsPage);
      } else {
        this.navCtrl.setRoot(HomepagePage);
      }
    });
  }
}
