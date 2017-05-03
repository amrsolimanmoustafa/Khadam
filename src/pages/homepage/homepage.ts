import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, ToastController, LoadingController} from 'ionic-angular';
import {ServantDetailsPage} from "../servant-details/servant-details";
import {GlobalService} from "../../providers/GlobalService";
import {AdvancedSearchPage} from "../advanced-search/advanced-search";
import {SMS} from 'ionic-native';
import {LoginPage} from "../login/login";
import {SelectCountryButtonsPage} from "../select-country-buttons/select-country-buttons";
import {Geolocation} from "ionic-native";
/*
 Generated class for the Homepage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
declare var google: any;


@Component({
  selector: 'page-homepage',
  templateUrl: 'homepage.html'
})

export class HomepagePage {
  public workers;
  public worker;
  public workersEstkdam = [];
  public workersClean;
  public flag;
  public window: any;
  public RC = 'Recruitment';
  public flagepicpath;
  geocoder = new google.maps.Geocoder();
  countryid: string = "";
  public countryflag: string = "";
  public bannar;
  public bannar2;
  currentPage = 0;
  private start:number=1;
  private start2:number = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams, public globalservice: GlobalService,
              public alertCtrl: AlertController, public toastCtrl: ToastController, public loadingCtrl: LoadingController,) {

    Geolocation.getCurrentPosition().then(resp => {
      this.globalservice.myLng = resp.coords.longitude;
      this.globalservice.myLat = resp.coords.latitude;
      this.flags();
    }, (err) => {
      console.log('Geolocation err: ' + err);
      console.log(err);
    });
  }

  flags() {
    this.globalservice.getCountry().then(countryid => {
      if(countryid == null){
        this.globalservice.getflags().subscribe(
          data => {
            this.countryflag = data.picpath;
          }
        )
      }
      else {
        console.log("here");
        this.flagsID();
      }

    })

  }
  flagsID() {
    this.globalservice.getCountry().then(countryid => {
      console.log("catch here" ,countryid);
      this.globalservice.countryflag(countryid).subscribe(
        data => {
          this.flag = data;
          this.countryflag = data.picpath;
          console.log("countryflag",this.countryflag);

        }
      )
    });

  }
  ionViewDidLoad() {
    this.getestkdamWorkers();
    this.getcleanWorkers();
    this.getban();
    this.getban2();
  }


  sendSMS(companymobile: any) {
    var options = {
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
        intent: 'INTENT'  // Opens Default sms app
        //intent: '' // Sends sms without opening default sms app
      }
    };
    SMS.send(companymobile, 'Hello world!', options)
      .then(() => {
        console.log("success");
      }, () => {
        console.log("failed");
      });
  }


  gotoSearch() {
    this.navCtrl.push(AdvancedSearchPage)
  }

  gotoDetails(workerid: string) {
    this.globalservice.workerid = workerid;
    this.navCtrl.push(ServantDetailsPage)
  }


  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: this.globalservice.language == "en" ? 'No results were found.' : 'لم يتم العثور على اى نتائج',
      message: this.globalservice.language == "en" ? 'Would you like to search in another country ?' : 'هل تريد البحث مجدداً فى دولة اخرى ؟',
      buttons: [
        {
          text: this.globalservice.language == "en" ? 'No' : 'لا',
          handler: () => {
          }
        },
        {
          text: this.globalservice.language == "en" ? 'Yes' : 'نعم',
          handler: () => {
            this.navCtrl.push(SelectCountryButtonsPage);
          }
        }
      ]
    });
    confirm.present();
  }

  getestkdamWorkers() {
    this.globalservice.getCountry().then(countryid => {
      console.log('getting workers estkdam by countryid: ' + countryid);
      this.globalservice.getEstkdamWorkersByCountry(this.start2,this.globalservice.countryid == null ? countryid : this.globalservice.countryid).subscribe(
        data => {
          this.workersEstkdam = data;
          console.log("estkdam", this.workersEstkdam);
        }
      );
    });
  }
  public  lastPageReached;
  isLastPageReached():boolean {
    return this.lastPageReached;
  }
  getcleanWorkers(){
    this.globalservice.getCountry().then(countryid => {
      console.log('getting workers clean by countryid: ' + countryid);
      this.globalservice.getCleanWorkersByCountry(this.start,this.globalservice.countryid == null ? countryid : this.globalservice.countryid).subscribe(
        (resultsA) => {
          this.workersClean= resultsA;
          console.log("clean", this.workersClean);
        }
      );
    });
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      let nextpage=this.start++;
      this.globalservice.getCountry().then(countryid => {
        this.globalservice.getCleanWorkersByCountry(nextpage,this.globalservice.countryid == null ? countryid : this.globalservice.countryid).subscribe(
          res => {
              let workersClean = res;
             for(let workerClean of workersClean){
                     //console.log(res);
                    this.workersClean.push(workerClean); 
                }
          }
        )
      })
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 10);
  }
  Infinite(infiniteScroll) {
    setTimeout(() => {
      let nextpage=this.start2++;
      this.globalservice.getCountry().then(countryid => {
        this.globalservice.getEstkdamWorkersByCountry(nextpage,this.globalservice.countryid == null ? countryid : this.globalservice.countryid).subscribe(
          res => {
              let workersEstkdam = res;
             for(let workerEstkdam of workersEstkdam){
                     //console.log(res);
                    this.workersEstkdam.push(workerEstkdam); 
                }
          }
        )
      })
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 10);
  }

  showLoginAlert() {
    let alert = this.alertCtrl.create({
      title: this.globalservice.language == 'en' ? 'Error' : 'خطأ',
      subTitle: this.globalservice.language == 'en' ? 'Please log-in first' : 'برجاء تسجيل الدخول اولاً',
      buttons: [{
        text: this.globalservice.language == 'en' ? 'OK' : 'حسناً',
        handler: () => {
          let foundh = false;
          this.navCtrl.getViews().forEach((object, index) => {
            if (object.component.name == 'signinPage') {
              foundh = true;
              this.navCtrl.popTo(index);
            }
          });
          if (!foundh) {
            this.navCtrl.push(LoginPage);
          }
        }
      }]
    });
    alert.present();
  }
  getban(){
    this.globalservice.getbanar().subscribe(
      data =>{
        this.bannar = data;
      }
    )
  }
  getban2(){
    this.globalservice.getbanar2().subscribe(
      data =>{
        this.bannar2 = data;
      }
    )
  }
  addToCart(workerid) {
    if (this.globalservice.loggedIn) {
      this.globalservice.addToCart(workerid).subscribe((data) => {
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
            message: this.globalservice.language == "en" ? "Item added to your favourite." : "تمت الاضافة الى قائمة المفضلة",
            duration: 4000,
          });
          toast.present();
        }
      })
    } else {
      this.showLoginAlert();
    }
  }


}