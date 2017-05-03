import {Component} from '@angular/core';
import {NavController, NavParams, ToastController, LoadingController} from 'ionic-angular';
import {GlobalService} from "../../providers/GlobalService";
import {HomepagePage} from "../homepage/homepage";
import { EditprofilePage} from "../editprofile/editprofile";
/*
 Generated class for the CompanySignUp page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-company-sign-up',
  templateUrl: 'company-sign-up.html',
})
export class CompanySignUpPage {
  username: string = "";
  email: string = "";
  password: string = "";
  mobile: string;
  countryid: string = "";
  specialityid: string = "";
  companyname: string = "";
  public countries;
  public specialities;

  constructor(public navCtrl: NavController,public loadingCtrl:LoadingController , public navParams: NavParams, public globalService: GlobalService
    , public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanySignUpPage');
    this.Specialities();
    this.country();
  }

  Specialities() {
    this.globalService.getSpecialitiesID().subscribe(
      data => {
        this.specialities = data;
        console.log(this.specialities)
      }
    )
  }

  country() {
    this.globalService.getCountriesID().subscribe(
      data => {
        this.countries = data;
        console.log(this.countries)
      }
    )
  }
public loading;
  signUpCompany() {
    this.loading = this.loadingCtrl.create({
      content : "saving ...."
    });
    this.loading.present();
    console.log(this.username, this.email, this.password, this.mobile, this.countryid, this.companyname, this.specialityid);
    this.globalService.companySignUp(this.username, this.email, this.password, this.mobile, this.countryid, this.companyname, this.specialityid).subscribe((response => {
      console.log(response);
      this.loading.dismiss();
      if (response != null) {
        if (response.error != null) {
          let toast = this.toastCtrl.create({
            message: response.error,
            duration: 4000,
          });
          toast.present();
        } else {
          this.login();
        }
      }
      
    }))
  
  }
  login() {
    let loginObject = {
      username:this.username,
      password:this.password,
      gcm_regid: this.globalService.deviceToken
    };
    this.globalService.Login(loginObject).subscribe((response => {
      console.log(response);
      if (response != null) {
        if (response.error != null) {
          let toast = this.toastCtrl.create({
            message: response.error,
            duration: 4000,
          });
          toast.present();
        } else {
          this.globalService.setUser(response);
          this.navCtrl.setRoot(EditprofilePage);
        }
      }
    }))
  }
}
