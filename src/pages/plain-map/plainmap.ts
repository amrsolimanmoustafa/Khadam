import {Component, OnInit, Input} from '@angular/core';
import {NavController, LoadingController} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {GlobalService} from "../../providers/GlobalService";
import {googlemaps} from 'googlemaps';
declare var google: any;


@Component({
  selector: 'plain-map',
  templateUrl: 'plainmap.html'
})


export class PlainMap implements OnInit {

  public destination: string = "";
  public map: google.maps.Map;
  @Input() lat = 1.65165; //default value initiation
  @Input() lng = 15.696963600000004; //default value initiation

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public alertCtrl: AlertController,
              public globalService: GlobalService) {
this.lat = this.globalService.maplat;
this.lng = this.globalService.maplng;

  }
  ngOnInit(): void {
    if (this.lat == null || this.lat == 0 ){
/*      let confirm = this.alertCtrl.create({
        title:  'No location',
        message: 'Location was not found',
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              //do nothing
            }
          }
        ]
      });
      confirm.present();*/
    }
    this.map = this.createMap();
    this.showPickupMarker(new google.maps.LatLng(this.lat, this.lng));
    console.log('creating map with lat: ' + this.lat + ', and lng: ' + this.lng);
  }
  createMap() {
    console.log('creating maps');
    let mapEle = document.getElementById('map');
    let map = new google.maps.Map(mapEle, {
      center: {
        "lat": this.lat,
        "lng": this.lng
      },
      zoom: 19
    });

    google.maps.event.addListenerOnce(map, 'idle', () => {
      mapEle.classList.add('show-map');
    });
    console.log('ED map');

    return map;
  }

  private pickupMarker: google.maps.Marker;

  showPickupMarker(latlng) {
    console.log('showing marker');

    this.geoCodeIT(latlng);
    this.pickupMarker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.BOUNCE,
      position: latlng
    });
    setTimeout(() => {
      this.pickupMarker.setAnimation(null);
    }, 750);
    console.log('marker done');

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

  private popup: google.maps.InfoWindow;
  showBalloon() {
    this.popup = new google.maps.InfoWindow({
      content: (this.destination)
    });
    this.popup.open(this.map, this.pickupMarker);
    // google.maps.event.addListener(this.pickupMarker, 'click', () => {
    //   this.popup.open(this.map, this.pickupMarker);
    // });
  }

}
