import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {UserSignUpPage} from "../user-sign-up/user-sign-up";
import {CompanySignUpPage} from "../company-sign-up/company-sign-up";

/*
  Generated class for the BeforeSignUp page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-before-sign-up',
  templateUrl: 'before-sign-up.html'
})
export class BeforeSignUpPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad BeforeSignUpPage');
  }
  gotoPersonSignup(){
    this.navCtrl.push(UserSignUpPage)
  }
  gotoCompanySignup(){
    this.navCtrl.push(CompanySignUpPage)
  }
}
