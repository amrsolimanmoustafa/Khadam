import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, ToastController} from 'ionic-angular';
import {GlobalService} from "../../providers/GlobalService";
import {AdvancedSearchPage} from "../advanced-search/advanced-search";
import {Camera} from "ionic-native";

/*
 Generated class for the Dashboard page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-addworker',
  templateUrl: 'addworker.html'
})
export class AddworkerPage {
public user;
  constructor(public navCtrl: NavController, public navParams: NavParams, public globalService: GlobalService,
              public alertCtrl: AlertController, public toastCtrl: ToastController) {
    this.getAllFilters();
    this.user = this.globalService.user.companyid || this.globalService.user.memberid;
    console.log(this.user);
  }

  public countryid: string = "";
  public countries;
  public nationalityid: string = "";
  public nationalities;
  public residence;
  public residenceid: string = "";
  public occupationid: string = "";
  public occupations;
  public religionid: string = "";
  public religions;
  public maritalid: string = "";
  public maritals;
  // public ageid: string = "";
  // public ages;
  public birth_date;
  public worker_name_ar;
  public worker_name_en;
  public sex = "";
  public companyid;
  public salary = "100";
  public base64Image: string = "";
  public base64: string = "";
  public base64img2: string = "";
  public base64img3: string = "";
  public image = "";  //Personal Photo
  public image2 = "";  //Full Photo
  public imag3 = ""; //Host Photo - CV ?
  PERSONAL_PHOTO = 1;
  FULL_PHOTO = 2;
  HOST_PHOTO = 3;
  agree = false;

  getAllFilters() {
    this.globalService.getAllFilters().subscribe(
      data => {
        this.countries = data.country;
        this.religions = data.religion;
        this.maritals = data.status;
        this.occupations = data.occupation;
        this.nationalities = data.nationality;
        this.residence = data.residence;
        // this.ages = data.ages;
        console.log(data)
      }
    );
  }

  submitWorker() {
    console.log(this.agree);
    let wholeobj = {
      companyid: this.globalService.user.companyid || this.globalService.user.memberid ,
      countryid: this.countryid,
      occupationid: this.occupationid,
      nationalityid: this.nationalityid,
      residenceid: this.residenceid,
      religionid: this.religionid,
      status: this.maritalid,
      gender: this.sex,
      birth_date: this.birth_date,
      worker_name_ar: this.worker_name_ar,
      worker_name_en: this.worker_name_en,
      salary: this.salary,
      image: this.base64 == "" ? "" : this.base64,
      image2: this.base64img2 == "" ? "" : this.base64img2,
      imag3: this.base64img3 == "" ? "" : this.base64img3,
    };
    this.globalService.addWorker(wholeobj).subscribe(data => {
      console.log(data);
      if (data.error == null || data.error == '') {
        let toast = this.toastCtrl.create({
          message: data.error != null ? data.error : 'Success.',
          duration: 3000
        });
        toast.present();
        this.navCtrl.pop();
      } else {
        let toast = this.toastCtrl.create({
          message: data.error != null ? data.error : 'Error.',
          duration: 3000
        });
        toast.present();
        // this.showConfirm();
      }
    }, (err => {
      console.log(err);
    }));
  }

  // showConfirm() {
  //   let confirm = this.alertCtrl.create({
  //     title: this.globalService.language == "en" ? 'No results were found.' : 'لم يتم العثور على اى نتائج',
  //     message: this.globalService.language == "en" ? 'Would you like to search again?' : 'هل تريد البحث مجدداً؟',
  //     buttons: [
  //       {
  //         text: this.globalService.language == "en" ? 'No' : 'لا',
  //         handler: () => {
  //         }
  //       },
  //       {
  //         text: this.globalService.language == "en" ? 'Yes' : 'نعم',
  //         handler: () => {
  //           this.navCtrl.pop();
  //         }
  //       }
  //     ]
  //   });
  //   confirm.present();
  // }

  GalleryOrCamera(number) {
    let confirm = this.alertCtrl.create({
      title: 'Choose method',
      message: 'Choose picture from gallery or camera ?',
      buttons: [
        {
          text: 'Gallery',
          handler: () => {
            this.pickPicture(number);
          }
        },
        {
          text: 'Camera',
          handler: () => {
            this.takePicture(number);
          }
        }
      ]
    });
    confirm.present();
  }
  showAlert(){

  }
  pickPicture(number) {
    //noinspection TypeScriptUnresolvedVariable
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      // this.base64 = imageData;
      // console.log(this.base64);
      // this.base64Image = "data:image/jpeg;base64," + imageData;
      // this.edituser.image = this.base64Image;

      if (number == this.PERSONAL_PHOTO) {
        this.base64 = imageData;

        this.image = "data:image/jpeg;base64," + imageData;
        if(this.image) {
          let toast = this.toastCtrl.create({
            message: "message successfully uploaded",
            duration: 2000,
          });
          toast.present();
        }
      } else if (number == this.FULL_PHOTO) {
        this.base64img2 = imageData;
        this.image2 = "data:image/jpeg;base64," + imageData;
        if(this.image2) {
          let toast = this.toastCtrl.create({
            message: "message successfully uploaded",
            duration: 2000,
          });
          toast.present();
        }
      } else if (number == this.HOST_PHOTO) {
        this.base64img3 = imageData;
        this.imag3 = "data:image/jpeg;base64," + imageData;
        if(this.imag3) {
          let toast = this.toastCtrl.create({
            message: "message successfully uploaded",
            duration: 2000,
          });
          toast.present();
        }
      }
    }, (err) => {
      console.log(err);
    });
  }

  takePicture(number) {
    //noinspection TypeScriptUnresolvedVariable
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      if (number == this.PERSONAL_PHOTO) {
        this.base64 = imageData;
        this.image = "data:image/jpeg;base64," + imageData;
        if(this.image) {
          let toast = this.toastCtrl.create({
            message: "message successfully uploaded",
            duration: 2000,
          });
          toast.present();
        }
      } else if (number == this.FULL_PHOTO) {
        this.base64img2 = imageData;
        this.image2 = "data:image/jpeg;base64," + imageData;
        if(this.image2) {
          let toast = this.toastCtrl.create({
            message: "message successfully uploaded",
            duration: 2000,
          });
          toast.present();
        }
      } else if (number == this.HOST_PHOTO) {
        this.base64img3 = imageData;
        this.imag3 = "data:image/jpeg;base64," + imageData;
        if(this.imag3) {
          let toast = this.toastCtrl.create({
            message: "message successfully uploaded",
            duration: 2000,
          });
          toast.present();
        }
      }
    }, (err) => {
      console.log(err);
    });
  }


  searchWorkers(): any {
  }

  gotoSearch() {
    this.navCtrl.push(AdvancedSearchPage)
  }

}
