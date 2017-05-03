import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {GlobalService} from "../../providers/GlobalService";

/*
  Generated class for the SingleNews page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-single-news',
  templateUrl: 'single-news.html'
})
export class SingleNewsPage {
public singleNews;
  constructor(public navCtrl: NavController, public navParams: NavParams, public globalservice : GlobalService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SingleNewsPage');
    this.getSingleNews();
  }
getSingleNews(){
    this.globalservice.singlenews().subscribe(
      data => {
        this.singleNews = data;
        console.log(this.singleNews);
      }
    )
}
}
