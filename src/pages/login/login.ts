import {Component} from '@angular/core';
import {NavController, ToastController, AlertController} from 'ionic-angular';
import {GlobalService} from "../../providers/GlobalService";
import {BeforeSignUpPage} from "../before-sign-up/before-sign-up";
import {HomepagePage} from "../homepage/homepage";

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {


  registerCredentials = {username: '', password: ''};

  constructor(public navCtrl: NavController, public globalService: GlobalService, public toastCtrl: ToastController
    , public alertCtrl: AlertController) {

  }


  createAccount() {
    this.navCtrl.push(BeforeSignUpPage)
  }

  login() {
    let loginObject = {
      username:this.registerCredentials.username,
      password:this.registerCredentials.password,
      gcm_regid: this.globalService.deviceToken
    }
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

  forgetPassword() {
    let alert = this.alertCtrl.create({
      title: this.globalService.language == 'en' ? 'Forget Password' : 'استرجاع كلمة المرور',
      inputs: [
        {
          name: 'email',
          placeholder: this.globalService.language == 'en' ? 'E-Mail' : 'البريد الالكترونى'
        }
      ],
      buttons: [
        {
          text: this.globalService.language == 'en' ? 'Cancel' : 'الغاء',
          role: 'cancel',
          handler: data => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: this.globalService.language == 'en' ? 'Send' : 'ارسال',
          role: 'cancel',
          handler: data => {
            // console.log(data.email);
            this.doForget(data.email);
          }
        }
      ]
    });
    alert.present();
  }

  doForget(email: string) {
    this.globalService.forgetPassword(email)
      .subscribe((data) => {
        console.log(data);
        if (data != null) {
          if (data.error != null) {
            let toast = this.toastCtrl.create({
              message: data.error,
              duration: 4000,
            });
            toast.present();
          } else {
            let toast = this.toastCtrl.create({
              message: this.globalService.language == "en" ? "Password reset successfully, Please check your email." : "تمت اعادة كلمة السر بنجاح برجاء تفقد بريدك الالكترونى",
              duration: 4000,
            });
            toast.present();
          }
        }
      });
  }

}
