import { Component } from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController, ToastController} from 'ionic-angular';
import {GlobalService} from "../../providers/GlobalService";
import {googlemaps} from 'googlemaps';
import {MapsPage} from "../maps-page/mapspage";
declare var google: any;

/*
  Generated class for the Dashboard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  public map: google.maps.Map;
public  lat = 0.0;
 public lng = 0.0;
public name:string = "";
  public email : string = "";
  public mobile : string = "";
  public message : string = "";
  public cont;
  public latlog;
  destination;
  constructor(public navCtrl: NavController, public loadingCtrl:LoadingController, public toastCtrl:ToastController,public navParams: NavParams, public  globalservice:GlobalService, public alertCtrl:AlertController)
  {
    this.ionViewCanEnter();
    this.globalservice.getContact().subscribe(
      data => {
        this.cont = data;
        console.log(this.cont);
      }
    )

  }
  ionViewCanEnter(){
    return this.globalservice.getContact().subscribe(
      data => {
        console.log(data);
        this.latlog = data[0];
        this.lat = Number.parseFloat(this.latlog['latitude']);
        this.lng = Number.parseFloat(this.latlog['longitude']);
        console.log(this.latlog['latitude']);
        console.log(this.latlog['longitude']);
        return false;
      },
      err => {
        console.log(err);
      }
    )
/*    this.globalservice.getContact().subscribe(
      data => {
        console.log(data);
        this.latlog = data[0];
        console.log(this.latlog);
        this.lat = this.latlog['latitude'];
        this.lng = this.latlog['longitude'];
        console.log(this.latlog['latitude']);
        console.log(this.latlog['longitude']);
      }
    )*/
  }
  gotomap() {
    console.log("shgdhasjds");
    this.navCtrl.push(MapsPage);
  }
  getcontact(){
    this.globalservice.getContact().subscribe(
      data => {
        this.cont = data;
        console.log(this.cont);
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad contact');
/*    this.globalservice.getContact().subscribe(
      data => {
        console.log(data);
        this.latlog = data[0];
        console.log(this.latlog);
        this.lat = this.latlog['latitude'];
        this.lng = this.latlog['longitude'];
        console.log(this.latlog['latitude']);
        console.log(this.latlog['longitude']);
      }
    )*/
  }
sendMessage(){
    if(this.name.trim() == '' || this.email.trim() == '' || this.mobile.trim() == '' || this.message.trim() == ''){
      this.showErrAlert();
    }
    else {
      let loader = this.loadingCtrl.create({});
      loader.present();
      this.globalservice.contactUs(this.name , this.email , this.mobile , this.message).subscribe(
        data => {
          console.log(data);
          loader.dismissAll();
          if (data.error !=null){
            let toast = this.toastCtrl.create({
              message: data.error,
              duration: 4000,
            });
            toast.present();
          }
          else {
            let toast = this.toastCtrl.create({
              message: this.globalservice.language == 'en' ? 'sent' : 'تم الارسال',
              duration: 4000,
            });
            toast.present();
            this.navCtrl.popToRoot();
          }
        }
      )
    }
}
showErrAlert(){
  let alert = this.alertCtrl.create({
    title: this.globalservice.language == 'en' ? 'Error': 'خطا',
    subTitle: this.globalservice.language == 'en' ? 'please enter all fields correctly' : 'برجاء ادخال جميع البيانات صحيحة ',
    buttons: [this.globalservice.language == 'en' ? 'ok' : 'حسنا' ]
  });
  alert.present();
}
}
