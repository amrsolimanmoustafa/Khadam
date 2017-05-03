import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {GlobalService} from "../../providers/GlobalService";

/*
 Generated class for the Dashboard page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-myorders',
  templateUrl: 'myorders.html'
})
export class MyordersPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public globalService: GlobalService,
              public toastCtrl: ToastController) {
    this.getMyOrders();
  }

  public orders;

  getMyOrders() {
    this.globalService.getMyOrders(this.globalService.user.memberid).subscribe((response => {
      console.log(response);
      if (response != null) {
        if (response.error != null) {
          let toast = this.toastCtrl.create({
            message: response.error,
            duration: 4000,
          });
          toast.present();
        } else {
          if (response.length == 0) {
            let toast = this.toastCtrl.create({
              message: 'Zero orders found.',
              duration: 4000,
            });
            toast.present();
          }
          else {
            this.orders = response;
          }
        }
      }
    }));
  }

}
