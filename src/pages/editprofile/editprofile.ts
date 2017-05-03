import { Component } from '@angular/core';
import {NavController, NavParams, ToastController, AlertController, LoadingController} from 'ionic-angular';
import {AdvancedSearchPage} from "../advanced-search/advanced-search";
import {Camera ,PayPal, PayPalPayment, PayPalConfiguration} from "ionic-native";
import {GlobalService} from "../../providers/GlobalService";
import {MapsPage} from "../maps-page/mapspage";
/*
  Generated class for the Editprofile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html'
})
export class EditprofilePage {
  public username: string;
  public name:string;
  public namear:string;
  public mobile:string;
  public email: string;
  public password: string;
  public tel: string;
  public whatsapp: string;
  public address: string;
  public accounts;
  public base64Image: string = "";
  public base64: string = "";
  public user;
  public edituser= {
    companyid:"",
    email:"",
    username:"",
    name:"",
    namear:"",
    password:"",
    mobile:"",
    tel:"",
    image:"",
    whatsapp:"",
    address:"",
    map:"",
    details_ar:"",
    details_en:"",
    memberid:""
  };

  accountSW = 'Account';
  public addworkerpay;
  countryid: string = "";
  specialityid: string = "";
  companyname: string = "";
  public memberid:string;
  public countries;
  public prime;
  public silver;
  public gold;
  public price;
  public companyid;
  public details_ar;
  public details_en;
  public image;
  public map;
  public postmember;
  constructor(public navCtrl: NavController,public globalService: GlobalService, public toastCtrl: ToastController,
              public alertCtrl: AlertController, public navParams: NavParams, public loadingCtrl:LoadingController) {
    this.user = this.globalService.user;
    this.memberid = this.user.memberid;
    console.log("hello2",this.user.subscriptions);
    console.log("hello3",this.user);

  }
  payselvier(pricesilver : any , membershipid){
    console.log(pricesilver);
    console.log(membershipid);
    PayPal.init({
      "PayPalEnvironmentProduction": "AWz-wazfpHwtFhlUjdexcZFEsows_LuXy6i1XjEy1Z40SAisL2W6lscFACK-bWemSfs46Z9tpoNqQw4Z",
      "PayPalEnvironmentSandbox": "AWz-wazfpHwtFhlUjdexcZFEsows_LuXy6i1XjEy1Z40SAisL2W6lscFACK-bWemSfs46Z9tpoNqQw4Z"

    }).then(() => {
      console.log("test2");
      PayPal.prepareToRender('PayPalEnvironmentProduction', new PayPalConfiguration({
      })).then(() => {
        let payment = new PayPalPayment(pricesilver,'USD', 'Description', 'sale');
        PayPal.renderSinglePaymentUI(payment).then(() => {
          let toast = this.toastCtrl.create({
            message: "payed success and your account is upgraded",
            duration: 4000,
          });
          toast.present();
          this.globalService.setMember(membershipid).subscribe(
            data => {
              this.postmember = data;
              console.log(this.postmember);
            }
          )
        }, () => {
          let toast = this.toastCtrl.create({
            message: "you don't pay , please pay",
            duration: 4000,
          });
          toast.present();

          // Error or render dialog closed without being successful
        });
      }, () => {
        console.log("payment failed configuration ");
        let toast = this.toastCtrl.create({
          message: "payment failed configuration",
          duration: 4000,
        });
        toast.present();
        // Error in configuration
      });
    }, () => {
      console.log("payment failed PayPal isn't supported ");
      let toast = this.toastCtrl.create({
        message: "payment failed PayPal isn't supported",
        duration: 4000,
      });
      toast.present();
      // Error in initialization, maybe PayPal isn't supported or something else
    });

  }
  paygold(pricegold : any , membershipid){
    console.log(pricegold);
    PayPal.init({
      "PayPalEnvironmentProduction": "AWz-wazfpHwtFhlUjdexcZFEsows_LuXy6i1XjEy1Z40SAisL2W6lscFACK-bWemSfs46Z9tpoNqQw4Z",
      "PayPalEnvironmentSandbox": "AWz-wazfpHwtFhlUjdexcZFEsows_LuXy6i1XjEy1Z40SAisL2W6lscFACK-bWemSfs46Z9tpoNqQw4Z"

    }).then(() => {
      console.log("test2");
      PayPal.prepareToRender('PayPalEnvironmentProduction', new PayPalConfiguration({
      })).then(() => {
        let payment = new PayPalPayment(pricegold,'USD', 'Description', 'sale');
        PayPal.renderSinglePaymentUI(payment).then(() => {
          let toast = this.toastCtrl.create({
            message: "payed success and your account is upgraded",
            duration: 4000,
          });
          toast.present();
          this.globalService.setMember(membershipid).subscribe(
            data => {
              this.postmember = data;
              console.log(this.postmember);
            }
          )
        }, () => {
          let toast = this.toastCtrl.create({
            message: "you don't pay , please pay",
            duration: 4000,
          });
          toast.present();
          // Error or render dialog closed without being successful
        });
      }, () => {
        console.log("payment failed configuration ");
        let toast = this.toastCtrl.create({
          message: "payment failed configuration",
          duration: 4000,
        });
        toast.present();
        // Error in configuration
      });
    }, () => {
      console.log("payment failed PayPal isn't supported ");
      let toast = this.toastCtrl.create({
        message: "payment failed PayPal isn't supported",
        duration: 4000,
      });
      toast.present();
      // Error in initialization, maybe PayPal isn't supported or something else
    });

  }
  payWorker(){
    console.log(this.addworkerpay);
    console.log(this.memberid);
    PayPal.init({
      "PayPalEnvironmentProduction": "AWz-wazfpHwtFhlUjdexcZFEsows_LuXy6i1XjEy1Z40SAisL2W6lscFACK-bWemSfs46Z9tpoNqQw4Z",
      "PayPalEnvironmentSandbox": "AWz-wazfpHwtFhlUjdexcZFEsows_LuXy6i1XjEy1Z40SAisL2W6lscFACK-bWemSfs46Z9tpoNqQw4Z"

    }).then(() => {
      console.log("test2");
      PayPal.prepareToRender('PayPalEnvironmentProduction', new PayPalConfiguration({
      })).then(() => {
        let payment = new PayPalPayment(this.addworkerpay,'USD', 'Description', 'sale');
        PayPal.renderSinglePaymentUI(payment).then(() => {
          let toast = this.toastCtrl.create({
            message: "payed success and you can add worker now",
            duration: 4000,
          });
          toast.present();
          this.globalService.setworkerMember().subscribe(
            data => {
              this.postmember = data;
              console.log(this.postmember);
            }
          )
        }, () => {
          let toast = this.toastCtrl.create({
            message: "you don't pay , please pay",
            duration: 4000,
          });
          toast.present();
          // Error or render dialog closed without being successful
        });
      }, () => {
        console.log("payment failed configuration ");
        let toast = this.toastCtrl.create({
          message: "payment failed configuration",
          duration: 4000,
        });
        toast.present();
        // Error in configuration
      });
    }, () => {
      console.log("payment failed PayPal isn't supported ");
      let toast = this.toastCtrl.create({
        message: "payment failed PayPal isn't supported",
        duration: 4000,
      });
      toast.present();
      // Error in initialization, maybe PayPal isn't supported or something else
    });

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
    this.getAcount();
    this.getprime();
    this.getsilver();
    this.getgold();
    this.getpay();
    // this.Specialities();
    // this.country();
  }

  getpay(){
    this.globalService.getworkerpay().subscribe(
      data =>{
        this.addworkerpay = data.member_cost;
        console.log( this.addworkerpay);
      }
    )
  }

  ionViewDidEnter() {
    if (this.globalService.myAddress != "") {
      this.user.address = this.globalService.myAddress;
      this.user.map = this.globalService.myMapsLat+','+this.globalService.myMapsLng;
      console.log("ionview did enter and i changed address to: " + this.user.address + " " + this.user.map);
      this.globalService.myAddress = "";
      this.globalService.myMapsLat = 0;
      this.globalService.myMapsLng = 0;
    }
  }
  getprime(){
    this.globalService.getPrime().subscribe(
      data => {
        this.prime = data ;
      }
    )
  }

  getsilver(){
    this.globalService.getSilver().subscribe(
      data => {
        this.silver = data ;
      }
    )
  }
  getgold(){
    this.globalService.getGold().subscribe(
      data => {
        this.gold = data ;
      }
    )
  }
  gotoSearch(){
    this.navCtrl.push(AdvancedSearchPage)
  }

  getAcount(){
    this.globalService.getAccounts().subscribe(
      data => {
        this.accounts = data;
        console.log(this.accounts);
        console.log('incoming account');
      }
    )
  }
  // updateNormalUserData
  public postuser;
  public postcompany;
  updatePersonProfile(){
    this.memberid = this.user.memberid;
    this.username = this.user.username;
    this.name = this.user.name;
    this.email = this.user.email;
    this.password = this.user.password;
    this.mobile = this.user.mobile;
  
  console.log(this.memberid);
    let success = this.loadingCtrl.create({});
    success.present();
    this.globalService.updateNormalUserData(this.memberid , this.username , this.name, this.email, this.password , this.mobile,this.base64 == "" ? "" : this.base64).subscribe(
      data => {
        success.dismissAll();
        this.postuser = data;
        console.log("the image64", " " ,this.base64 == "" ? "" : this.base64);
        console.log(this.postuser);
        let str = data.error;
        if (data == null){
          let toast = this.toastCtrl.create({
            message: str,
            duration: 4000,
          });
          toast.present();
        }
        else {
          this.globalService.setUser(data);
          let toast = this.toastCtrl.create({
            message: this.globalService.language == 'en' ? 'User data updated successfully!' : 'تم تعديل البيانات بنجاح',
            duration: 4000,
          });
          toast.present();
        }
      });
  }
  updateCompanyProfile(){
    this.companyid = this.user.companyid;
    this.username = this.user.username;
    this.name = this.user.name;
    this.namear = this.user.namear;
    this.email = this.user.email;
    this.password = this.user.password;
    this.mobile = this.user.mobile;
    this.image = this.user.image;
    this.tel = this.user.tel;
    this.map = this.user.map;
    this.address = this.user.address;
    this.details_ar = this.user.details_ar;
    this.details_en = this.user.details_en;
    this.whatsapp = this.user.whatsapp;
    let success = this.loadingCtrl.create({});
    success.present();
    this.globalService.updateProfileData(this.companyid,this.username,this.name,this.namear,this.email,this.password,this.whatsapp,this.mobile,this.tel,this.address,this.map,this.details_ar,this.details_en,this.base64 == "" ? "" : this.base64).subscribe(
      data => {
        success.dismissAll();
        this.postuser = data;
        console.log(this.postuser);
        let str = data.error;
        if (data == null){
          let toast = this.toastCtrl.create({
            message: str,
            duration: 4000,
          });
          toast.present();
        }
        else {
          this.globalService.setUser(data);
          let toast = this.toastCtrl.create({
            message: this.globalService.language == 'en' ? 'User data updated successfully!' : 'تم تعديل البيانات بنجاح',
            duration: 4000,
          });
          toast.present();
        }
      });
  }



  openMap(){
    this.navCtrl.push(MapsPage);
  }

  GalleryOrCamera() {
    let confirm = this.alertCtrl.create({
      title:  'Choose method',
      message: 'Choose picture from gallery or camera ?',
      buttons: [
        {
          text: 'Gallery',
          handler: () => {
            this.pickPicture();
          }
        },
        {
          text: 'Camera',
          handler: () => {
            this.takePicture();
          }
        }
      ]
    });
    confirm.present();
  }


  pickPicture() {
    //noinspection TypeScriptUnresolvedVariable
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64 = imageData;
      console.log(this.base64);
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.edituser.image = this.base64Image;
    }, (err) => {
      console.log(err);
    });
  }

  takePicture() {
    //noinspection TypeScriptUnresolvedVariable
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      correctOrientation:true,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64 = imageData;
      console.log(this.base64);
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.edituser.image = this.base64Image;
    }, (err) => {
      console.log(err);
    });
  }

}
