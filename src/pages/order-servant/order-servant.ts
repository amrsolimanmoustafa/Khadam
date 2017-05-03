import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController, ToastController} from 'ionic-angular';
import {GlobalService} from "../../providers/GlobalService";
import {HomepagePage} from "../homepage/homepage";
/*
  Generated class for the OrderServant page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-order-servant',
  templateUrl: 'order-servant.html'
})
export class OrderServantPage {
  public countryid: string = "";
  public countries;
  public nationalityid: string = "";
  public nationalities;
  public occupationid: string = "";
  public occupations;
  public religionid: string = "";
  public religions;
  public maritalid: string = "";
  public maritals;
  public ageid: string = "";
  public typeid: string="";
  public type;
  public specialtyid: string="";
  public specialty;
  public genderid: string = "";
  public gender;
  public ages;

  public sex = "";
  public recent = "";
public companyid;
  constructor(public navCtrl: NavController, public navParams: NavParams, public globalService: GlobalService,
              public loadingCtrl: LoadingController
    , public toastCtrl: ToastController) {
    if (this.globalService.user.memberid){
      this.companyid = this.globalService.user.memberid;
      console.log(this.companyid);
    }else{
      if (this.globalService.user.companyid){
        this.companyid = this.globalService.user.companyid;
        console.log(this.companyid);
      }
    }

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderServantPage');
    this.getAllFilters();
this.orderinst();
  }
  getAllFilters() {
    this.globalService.getAllFilters().subscribe(
      data => {
        this.religions = data.religion;
        this.maritals = data.status;
        this.occupations = data.occupation;
        this.nationalities = data.nationality;
        this.gender = data.gender;
        this.ages = data.ages;
        this.type = data.type;
        this.specialty = data.specialty;
        console.log(data)
      }
    );
  }
  public object;
  public text;
  orderinst(){
    this.globalService.orderInst().subscribe(
      data => {
        this.text = data.text;
        console.log(this.text);
      }
    )
  }
  order(){
    console.log(this.occupationid);
    this.globalService.orderServant( this.occupationid , this.nationalityid , this.religionid,this.maritalid,this.genderid,this.ageid,this.typeid , this.specialtyid).subscribe(

      data => {
        if (data != null) {
          if (data.error != null) {
            let toast = this.toastCtrl.create({
              message: data.error,
              duration: 4000,
            });
            toast.present();
          } else {
            let toast = this.toastCtrl.create({
              message: "order complete",
              duration: 4000,
            });
            toast.present();
            this.navCtrl.push(HomepagePage);
          }
        }
      }
    )
  }
}
