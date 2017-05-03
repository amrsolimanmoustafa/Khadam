import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController, ToastController} from 'ionic-angular';
import {GlobalService} from "../../providers/GlobalService";
import {CompanyDetailsPage} from "../company-details/company-details";
import {SMS} from 'ionic-native';
declare var window: any;
/*
 Generated class for the EstkdamPage page.
 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-estkdam',
  templateUrl: 'estkdam-page.html'
})
export class EstkdamPage {
  public specialityid;
  public companies;
  public headerTitle;
  constructor(public navCtrl: NavController, public navParams: NavParams, public globalService: GlobalService,
              public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    this.specialityid = navParams.get('specialityid');
console.log("estkdam page");
    this.getCompanies();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstkdamPage');
  }
 /* sendSMS(companymobile : any) {
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
        alert("success");
      }, () => {
        alert("failed");
      });
  }*/
  sendSMS(companymobile : any){
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
  getCompanies() {
    let loader = this.loadingCtrl.create();
    /*
     loader.present();
     */
    this.globalService.getCountry().then(countryID => {
      console.log(countryID);
      this.globalService.getCompanyBySpeciality(countryID, this.specialityid).subscribe(data => {
        console.log(data);
        this.companies = data;
        loader.dismissAll();
      });
    }, (err => {
      console.log(err);
      let toast = this.toastCtrl.create({
        message: err,
        duration: 3000
      });
      toast.present();
    }));
  }

  pushCompanyDetails(companyid) {
    let company: any;
    let loader = this.loadingCtrl.create();
    this.globalService.compID = companyid;
    /*
     loader.present();
     */
    this.globalService.getCompanyDetails(companyid).subscribe(data => {
      company = data[0];
      loader.dismissAll();
      this.navCtrl.push(CompanyDetailsPage, {
        company: company
      });
    }, (err => {
      console.log(err);
      let toast = this.toastCtrl.create({
        message: err,
        duration: 3000
      });
      toast.present();
    }));

  }

}
