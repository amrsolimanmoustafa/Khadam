import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {GlobalService} from "../../providers/GlobalService";
import {HomepagePage} from "../homepage/homepage";

/*
 Generated class for the UserSignUp page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-user-sign-up',
  templateUrl: 'user-sign-up.html'
})
export class UserSignUpPage {
  username: string = "";
  email: string = "";
  password: string = "";
  mobile: string;
  countryid: string = "";
  public countries;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
              public globalService: GlobalService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserSignUpPage');
    this.country();
  }

  country() {
    this.globalService.getCountriesID().subscribe(
      data => {
        this.countries = data;
        console.log(this.countries)
      }
    )
  }

  signup() {
    this.globalService.postPersonSignUp(this.username, this.email, this.password, this.mobile, this.countryid).subscribe((response => {
      console.log(response);
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
      username: this.username,
      password: this.password,
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
          this.navCtrl.setRoot(HomepagePage);
        }
      }
    }))
  }
}
