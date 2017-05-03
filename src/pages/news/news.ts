import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {GlobalService} from "../../providers/GlobalService";
import {SingleNewsPage} from "../single-news/single-news";

/*
  Generated class for the Dashboard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsPage {
public news;
  constructor(public navCtrl: NavController, public globalservice : GlobalService,public navParams: NavParams) {
  this.getnews();
  }
getnews() {
  this.globalservice.getNews().subscribe(
    data => {
      this.news = data;
      console.log(this.news);
    });
}
gotservant(newsid:any){
this.globalservice.newsID = newsid;
this.navCtrl.push(SingleNewsPage);
}
}
