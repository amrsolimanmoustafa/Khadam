import {Component, OnInit} from '@angular/core';
import {NavController, LoadingController} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {Geolocation} from "ionic-native";
import {Observable} from "rxjs";
import {GlobalService} from "../../providers/GlobalService";
import {googlemaps} from 'googlemaps';
declare var google: any;

@Component({
  selector: 'maps-page',
  templateUrl: 'mapspage.html'
})


export class MapsPage implements OnInit {

  public destination: string = "";
  public lat;
  public lng;
  public isMapIdle: boolean;
  public map: google.maps.Map;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public alertCtrl: AlertController,
              public globalService: GlobalService) {


  }

  //
  ngOnInit() {
    this.map = this.createMap();
    this.addMapEventListeners();
    this.getCurrentLocation().subscribe(location => {
      this.map.panTo(location);
      this.showPickupMarker(location);
    });
  }

  saveAddress() {
    let confirm = this.alertCtrl.create({
      title: this.globalService.language == 'en' ? 'Use this address ?' : 'استخدام هذا العنوان ؟',
      message: this.destination,
      buttons: [
        {
          text: this.globalService.language == 'en' ? 'No' : 'لا',
          handler: () => {
          }
        },
        {
          text: this.globalService.language == 'en' ? 'Yes' : 'نعم',

          handler: () => {
            this.globalService.myAddress = this.destination;
            this.globalService.myMapsLat = this.lat;
            this.globalService.myMapsLng = this.lng;
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }

  createMap() {
    let mapEle = document.getElementById('map');
    let map = new google.maps.Map(mapEle, {
      center: {
        "lat": 25.295142,
        "lng": 51.539365
      },
      zoom: 19
    });
    google.maps.event.addListenerOnce(map, 'idle', () => {
      mapEle.classList.add('show-map');
    });
    return map;
  }

  addMapEventListeners() {
    google.maps.event.addListener(this.map, 'click', (e)=> {
      console.log(e);
      this.isMapIdle = false;
      console.log('click');
      this.showPickupMarker(e.latLng);
    });
  }

  geocoder = new google.maps.Geocoder();
  infow = new google.maps.InfoWindow();

  geoCodeIT(latlng) {
    this.geocoder.geocode({'location': latlng}, (results, status) => {
      console.log(status);
      console.log(results);
      if (status == 'OK') {
        if (results[0]) {
          this.destination = results[0].formatted_address;
          this.lat = results[0].geometry.location.lat();
          this.lng = results[0].geometry.location.lng();
          console.log(this.lat + ' ' + this.lng);
          console.log(this.destination);
          this.showBalloon();
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  }


  // sudo ionic plugin add cordova-plugin-geolocation

  getCurrentLocation(): any {
    let options = {timeout: 10000, enableHighAccuracy: true};
    let loading = this.loadingCtrl.create({
      content: 'Locating...'
    });
    loading.present();
    let locationObs = Observable.create(observable => {
      Geolocation.getCurrentPosition(options).then(resp => {
          let lat = resp.coords.latitude;
          let lng = resp.coords.longitude;
          let location = new google.maps.LatLng(lat, lng);
          //3ak ?
          this.showPickupMarker(location);
          this.map.panTo(location);
          //EO3
          observable.next(location);
          loading.dismiss();
        }, (err) => {
          console.log('Gelocation err: ' + err);
          loading.dismiss();
        }
      )
    });
    return locationObs;
  }

  private popup: google.maps.InfoWindow;

  showBalloon() {
    this.popup = new google.maps.InfoWindow({
      content: (this.destination)
    });
    this.popup.open(this.map, this.pickupMarker);
    google.maps.event.addListener(this.pickupMarker, 'click', () => {
      this.popup.open(this.map, this.pickupMarker);
    });
  }

  // centerLocation(location) :any{
  //   this.removePickupMarker();
  //   if (location) {
  //     this.map.panTo(location)
  //   } else {
  //     this.getCurrentLocation().subscribe(currentLocation => {
  //       this.map.panTo(currentLocation);
  //     })
  //   }
  // }

  private pickupMarker: google.maps.Marker;

  showPickupMarker(latlng) {
    this.geoCodeIT(latlng);
    this.removePickupMarker();
    this.pickupMarker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.BOUNCE,
      position: latlng
    });
    setTimeout(() => {
      this.pickupMarker.setAnimation(null);
    }, 750);
  }

  removePickupMarker() {
    if (this.pickupMarker) {
      this.infow.close();
      this.pickupMarker.setMap(null);
      this.pickupMarker = null;
    }
  }

}
