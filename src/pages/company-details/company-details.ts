import {Component, OnInit} from '@angular/core';
import {
  NavController, NavParams, LoadingController, ModalController, ToastController,
  AlertController
} from 'ionic-angular';
import {AdvancedSearchPage} from "../advanced-search/advanced-search";
import {GlobalService} from "../../providers/GlobalService";
import {FullImagePage} from "../full-image/full-image";
import {SMS} from 'ionic-native';
import {ServantDetailsPage} from "../servant-details/servant-details";
import {LoginPage} from "../login/login";
declare var google: any;

/*
 Generated class for the CompanyDetails page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-company-details',
  templateUrl: 'company-details.html'
})
export class CompanyDetailsPage implements OnInit {
public test;
  companySW = 'Workers';
  public map: google.maps.Map;
  lat = 0.0;
  lng = 0.0;
  destination;
  public companyid;
  public company;
public compworker;
  constructor(public navCtrl: NavController,public toastCtrl: ToastController, public navParams: NavParams,public modalCtrl: ModalController, public globalService: GlobalService,
              public alertCtrl: AlertController,public loadingCtrl: LoadingController) {
    this.company = navParams.get('company');
    console.log(this.company);
    if (this.company.map != null) {
      let fields = this.company.map.split(',');
      this.lat = Number.parseFloat(fields[0]);
      this.lng = Number.parseFloat(fields[1]);
    }
  }

  ngOnInit(): void {
    this.getcompWorker();
  }
  presentProfileModal(workerid) {
    let profileModal = this.modalCtrl.create(FullImagePage, {userId: workerid});
    profileModal.onDidDismiss(data => {
      console.log(data);
    });
    profileModal.present();
  }
  gotoDetails(workerid: string) {
    this.globalService.workerid = workerid;
    console.log(workerid);
    this.navCtrl.push(ServantDetailsPage)
  }
  gotoSearch() {
    this.navCtrl.push(AdvancedSearchPage)
  }
  sendSMS(companymobile : any) {
    console.log(companymobile);
    var options = {
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
        intent: 'INTENT'  // Opens Default sms app
        //intent: '' // Sends sms without opening default sms app
      }
    }
    SMS.send(companymobile, 'Hello world!', options)
      .then(()=> {
        console.log("success");
      }, () => {
        console.log("failed");
      });
  }
  sendsms(companymobile : any) {
  console.log(companymobile);
  var options = {
    replaceLineBreaks: false, // true to replace \n by a new line, false by default
    android: {
      intent: 'INTENT'  // Opens Default sms app
      //intent: '' // Sends sms without opening default sms app
    }
  }
  SMS.send(companymobile, 'Hello world!', options)
    .then(()=> {
      console.log("success");
    }, () => {
      console.log("failed");
    });
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
  getcompWorker(){
    this.globalService.getCompanyWorker().subscribe(
      data => {
        this.compworker = data;
        console.log(this.compworker);
        /*this.test = data['_body'];
        console.log(this.test);*/
      }
    )
  }
}
