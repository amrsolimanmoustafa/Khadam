import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {GlobalService} from "../../providers/GlobalService";

/*
  Generated class for the Dashboard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html'
})
export class OrdersPage {
public worker;
public order;
  constructor(public navCtrl: NavController, public navParams: NavParams ,  public globalService: GlobalService) {
    this.worker = navParams.get('worker');
    console.log(this.worker);
    this.getcomporder();
  }
getcomporder(){
    this.globalService.getOrders(this.globalService.user.companyid , this.worker).subscribe(
      data => {
        this.order = data;
        console.log(this.order);
      }
    )
}
}
