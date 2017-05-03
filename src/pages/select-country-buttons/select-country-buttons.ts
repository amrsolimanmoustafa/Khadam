import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {GlobalService} from "../../providers/GlobalService";
import {HomepagePage} from "../homepage/homepage";

/*
 Generated class for the SelectCountry page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
declare var google: any;

@Component({
  selector: 'page-select-country-buttons',
  templateUrl: 'select-country-buttons.html'
})

export class SelectCountryButtonsPage {
  countryid: string = "";
  public countries;
  geocoder = new google.maps.Geocoder();
  public mygeocountry;
  countriesEN;
  firstime = true;

  constructor(public toastCtrl: ToastController, public navParams: NavParams, public globalService: GlobalService, public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log(this.globalService.myLat);
    if (this.globalService.myLat != 27) {
      this.globalService.getCountry().then(data => {
        console.log('SELECTCTRY;data from get country ist: ');
        console.log(data);
        if (data == null || data == '') { // no data  = first time!
          this.firstime = true;
          console.log('My lat is : ' + this.globalService.myLat);
          this.geoCodeIT(new google.maps.LatLng(this.globalService.myLat, this.globalService.myLng));
        } else { //there's data and maybe user wants to change the country
          this.mygeocountry = null
        }
      });
    } else {
      // let toast = this.toastCtrl.create({
      //   message: this.globalService.language == 'en' ? "Couldn't find your location, Please choose your country" : 'لم يتم العثور على موقعك, برجاء تحديد دولتك',
      //   duration: 4000,
      // });
      // toast.present();
    }
    this.country();
  }

  geoCodeIT(latlng) {
    this.geocoder.geocode({'location': latlng}, (results, status) => {
      console.log(status);
      console.log(results);
      if (status == 'OK') {
        if (results[0]) {
          let size = results[0].address_components.length;
          console.log('lenght is ' + size);
          this.mygeocountry = results[0].address_components[size - 1].long_name;
          this.globalService.getCountriesIDEN().subscribe(
            data => {
              this.countriesEN = data;
              console.log(this.countries);
              let countrycode = this.countriesEN.filter((obj) => {
                  if (this.mygeocountry == obj.countryname) {
                    console.log(this.mygeocountry + ' = ' + obj.countryname);
                    return obj.countryid
                  }
                }
              );
              this.globalService.setCountry(countrycode[0].countryid);
              console.log(countrycode[0].countryid);
            });
          if (this.firstime)
            setTimeout(() => {
              this.navCtrl.setRoot(HomepagePage);
            }, 1500);
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  }

  setCountry(countryid) {
    this.globalService.countryID = countryid;
    console.log(this.globalService.countryID );
    this.globalService.setCountry(countryid);
    this.globalService.getCountry().then(data => {
      console.log('iSet countryid: ' + data);
    });
    this.navCtrl.setRoot(HomepagePage);
  }


  country() {
    this.globalService.getCountriesID().subscribe(
      data => {
        this.countries = data;
        console.log(this.countries)
      }
    );
  }
}
