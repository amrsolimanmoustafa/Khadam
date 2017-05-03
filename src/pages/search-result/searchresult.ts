import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, ToastController} from 'ionic-angular';
import {ServantDetailsPage} from "../servant-details/servant-details";
import {GlobalService} from "../../providers/GlobalService";
import {AdvancedSearchPage} from "../advanced-search/advanced-search";
import {LoginPage} from "../login/login";
import {HomepagePage} from "../homepage/homepage";

/*
 Generated class for the Homepage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'search-result',
  templateUrl: 'searchresult.html'
})
export class SearchResult {
  public workers;
  public bannar;
  public searchObject;

  constructor(public navCtrl: NavController, public navParams: NavParams, public globalservice: GlobalService,
              public toastCtrl: ToastController, public alertCtrl: AlertController) {
    this.searchObject = navParams.get('search');
    console.log(this.searchObject);
  }

  ionViewDidLoad() {
    this.searchWorkers();
    this.getban();
    console.log('ionViewDidLoad SearchResult');
  }

  gotoSearch() {
    this.navCtrl.push(AdvancedSearchPage)
  }
  getban(){
    this.globalservice.getbanar().subscribe(
      data =>{
        this.bannar = data;
        console.log(this.bannar)
      }
    )
  }

  searchWorkers(): any {
    // countryid: this.countryid,
    //   occupationid: this.occupationid,
    //   nationalityid: this.nationalityid,
    //   religionid: this.religionid,
    //   status: this.maritalid,
    //   recent: this.recent,
    //   agesid: this.ageid,
    //   gender: this.sex
    console.log(this.searchObject);
    console.log(this.searchObject.status);
    this.globalservice.searchWorkers(this.searchObject
      // this.searchObject.countryid,
      // this.searchObject.occupationid,
      // this.searchObject.nationalityid,
      // this.searchObject.religionid,
      // this.searchObject.status,
      // this.searchObject.gender,
      // this.searchObject.recent,
      // this.searchObject.ageid
    ).subscribe(data => {
      console.log(data);
      if (data.error == null || data.error == '') {
          this.workers = data;
        console.log("sdashgdsajds");
        console.log(this.workers);
      }else{
        this.showConfirm();
      }
    }, (err => {
      console.log(err);
    }));
  }


  gotoDetails(workerid: string) {
    this.globalservice.workerid = workerid;
    console.log(workerid);
    this.navCtrl.push(ServantDetailsPage)
  }

  getWorkersByCountry() {
    this.globalservice.getCountry().then(countryid => {
      console.log(countryid);
      this.globalservice.getWorkersByCountry(countryid).subscribe(
        data => {
          this.workers = data;
          if (data.length == 0) {
            this.showConfirm();
          }
          console.log(this.workers)
        }
      );
    });
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: this.globalservice.language == "en" ? 'No results were found.' : 'لم يتم العثور على اى نتائج',
      message: this.globalservice.language == "en" ? 'Would you like to search again?' : 'هل تريد البحث مجدداً؟',
      buttons: [
        {
          text: this.globalservice.language == "en" ? 'No' : 'لا',
          handler: () => {
            this.navCtrl.setRoot(HomepagePage);
          }
        },
        {
          text: this.globalservice.language == "en" ? 'Yes' : 'نعم',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }

  getAllWorkers() {
    this.globalservice.getAllWorkers().subscribe(
      data => {
        this.workers = data;
        console.log(this.workers)
      }
    );
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
}
