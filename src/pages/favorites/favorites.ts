import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, ToastController, LoadingController} from 'ionic-angular';
import {GlobalService} from "../../providers/GlobalService";
import {ServantDetailsPage} from "../servant-details/servant-details";
import {SMS} from "ionic-native";
import {AdvancedSearchPage} from "../advanced-search/advanced-search";
import {LoginPage} from "../login/login";

/*
 Generated class for the Favorites page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html'
})
export class FavoritesPage {
  public Favorites;

  constructor(public navCtrl: NavController, public navParams: NavParams, public globalService: GlobalService,
              public alertCtrl: AlertController, public toastCtrl:ToastController, public loadingCtrl:LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
    this.getFavorites();
  }

  sendSMS(companymobile: any) {
    console.log(companymobile);
    var options = {
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
        intent: 'INTENT'  // Opens Default sms app
        //intent: '' // Sends sms without opening default sms app
      }
    }
    SMS.send(companymobile, 'Hello world!', options)
      .then(() => {
        alert("success");
      }, () => {
        alert("failed");
      });
  }


  gotoSearch() {
    this.navCtrl.push(AdvancedSearchPage)
  }

  gotoDetails(workerid: string) {
    this.globalService.workerid = workerid;
    console.log(workerid);
    this.navCtrl.push(ServantDetailsPage)
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: this.globalService.language == "en" ? 'No results were found.' : 'لم يتم العثور على اى نتائج',
      message: this.globalService.language == "en" ? 'Would you like to search again?' : 'هل تريد البحث مجدداً؟',
      buttons: [
        {
          text: this.globalService.language == "en" ? 'No' : 'لا',
          handler: () => {
          }
        },
        {
          text: this.globalService.language == "en" ? 'Yes' : 'نعم',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }

  getFavorites() {
    this.globalService.getFavorites().subscribe(data => {
      console.log(data);
      if (data.error){
        let toast = this.toastCtrl.create({
          message: data.error,
          duration: 4000,
        });
        toast.present();
      }else {
        this.Favorites = data;
        console.log(this.Favorites);
      }

      /*if (data.error != null || data.error != "") {
        this.Favorites = data;
        console.log(this.Favorites);
      } else {
        let toast = this.toastCtrl.create({
          message: data.error,
          duration: 4000,
        });
        toast.present();
      }*/
    });
  }
  showLoginAlert() {
    let alert = this.alertCtrl.create({
      title: this.globalService.language == 'en' ? 'Error' : 'خطأ',
      subTitle: this.globalService.language == 'en' ? 'Please log-in first' : 'برجاء تسجيل الدخول اولاً',
      buttons: [{
        text: this.globalService.language == 'en' ? 'OK' : 'حسناً',
        handler: () => {
          let foundh = false;
          this.navCtrl.getViews().forEach((object, index) => {
            if (object.component.name == 'signinPage') {
              console.log('i found signinPage poping to it ? at index: ' + index);
              console.log(this.navCtrl.getViews()[index]);
              foundh = true;
              this.navCtrl.popTo(index);
            }
          });
          if (!foundh) {
            console.log("pushing home page for the first time");
            this.navCtrl.push(LoginPage);
          }
        }
      }]
    });
    alert.present();
  }
  addToCart(workerid) {
    if (this.globalService.loggedIn) {
      this.globalService.addToCart(workerid).subscribe((data) => {
        // console.log(data);
        if (data.error != null) {
          let toast = this.toastCtrl.create({
            message: data.error,
            duration: 4000,
          });
          toast.present();
        }
        else {
          let toast = this.toastCtrl.create({
            message: this.globalService.language == "en" ? "Item added to your favourite." : "تمت الاضافة الى قائمة المفضلة",
            duration: 4000,
          });
          toast.present();
        }
      })
    } else {
      this.showLoginAlert();
    }
  }

  removeFromCart(wishlistid) {
    let loader = this.loadingCtrl.create({
      content: ""
    });
    loader.present();
    this.globalService.removeFromCart(wishlistid).subscribe((data) => {
      // console.log(data);
      if (data.error != null) {
        let toast = this.toastCtrl.create({
          message: data.error,
          duration: 4000,
        });
        toast.present();
      }
      else {
        this.Favorites = this.Favorites.filter(function (obj) {
          return obj.wishlistid !== wishlistid;
        });
        let toast = this.toastCtrl.create({
          message: this.globalService.language == "en" ? "Item removed to your favorites." : "تم الحذف من قائمة المفضلة",
          duration: 4000,
        });
        toast.present();
      }
      loader.dismissAll();
    });
  }

}
