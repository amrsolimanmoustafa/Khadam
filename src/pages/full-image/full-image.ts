import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {GlobalService} from "../../providers/GlobalService";

/*
  Generated class for the FullImage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-full-image',
  templateUrl: 'full-image.html'
})
export class FullImagePage {

  public worker;
  public companyid;
  public company;
  constructor(public navCtrl: NavController, public globalService:GlobalService,public viewCtrl: ViewController, public navParams: NavParams) {
    console.log('UserId', navParams.get('userId'));
    this.companyid = navParams.get('userId');
    console.log(this.companyid);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
    this.getworker();
    this.getcompany();
  }
getcompany(){
    this.globalService.getCompanyDetails(this.companyid).subscribe(
      data => {
        this.company = data;
        console.log(this.company);
      }
    )
}
  getworker() {
    this.globalService.getWorkerDetails().subscribe(
      data => {
        this.worker = data;
        console.log(this.worker);
      }
    )
  }
  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }


}
