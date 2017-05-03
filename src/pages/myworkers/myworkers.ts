import {Component} from '@angular/core';
import {NavController, NavParams, ToastController, AlertController} from 'ionic-angular';
import {GlobalService} from "../../providers/GlobalService";
import {EditWorkerPage} from "../editworker/editworker";
import {OrdersPage} from "../orders/orders";

/*
 Generated class for the Dashboard page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-myworkers',
  templateUrl: 'myworkers.html'
})
export class MyworkersPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public globalService: GlobalService,
              public toastCtrl: ToastController, public alertCtrl:AlertController) {
    this.getMyWorkers();
  }

  public workers;

  getMyWorkers() {
    this.globalService.getMyWorkers(this.globalService.user.memberid).subscribe((response => {
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
              message: 'Zero workers found.',
              duration: 4000,
            });
            toast.present();
          }
          else {
            this.workers = response;
          }
        }
      }
    }));
  }
  public order;
  getorder(workerid){
    this.navCtrl.push(OrdersPage,{
      worker: workerid
    })
  /*  this.globalService.getOrders(this.globalService.user.companyid,workerid).subscribe(
      data => {
        this.order = data;
        console.log(this.order);
        this.navCtrl.push(OrdersPage,{
          worker: workerid
        })
      }
    )*/
  }
  editWorker(workerobj){
    this.navCtrl.push(EditWorkerPage, {
      worker: workerobj
    });
  }
  deleteWorker(workerobj){
    let confirm = this.alertCtrl.create({
      title:  'Are you sure?',
      message: 'Are you sure you want to delete this worker ?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {

          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.globalService.deleteWorker(workerobj.workerid).subscribe((response => {
              this.workers = this.workers.filter(function (obj) {
                return obj.workerid !== workerobj.workerid;
              });
            }));
          }
        }
      ]
    });
    confirm.present();
  }


}
