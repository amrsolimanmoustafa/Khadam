import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {GlobalService} from "../../providers/GlobalService";

/*
  Generated class for the Dashboard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
public about:string = "";
public title: string = "";
public text: string = "";
  constructor(public navCtrl: NavController, public globalService: GlobalService ,public navParams: NavParams) {
  this.aboutus();
  }
  aboutus(){
    this.globalService.about().subscribe(
      data => {
        this.about = data;
        console.log(this.about)
        this.title = data.title;
        this.text = data.text;
      }
    )
  }
}
