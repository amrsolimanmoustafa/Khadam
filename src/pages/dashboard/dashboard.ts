import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {MyordersPage} from "../myorders/myorders";
import {MyworkersPage} from "../myworkers/myworkers";
import {AddworkerPage} from "../addworker/addworker";
import {EditprofilePage} from "../editprofile/editprofile";
import {FavoritesPage} from "../favorites/favorites";
import {AdvancedSearchPage} from "../advanced-search/advanced-search";
import {GlobalService} from "../../providers/GlobalService";

/*
 Generated class for the Dashboard page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {
public user;
  constructor(public navCtrl: NavController, public globalService: GlobalService ,public navParams: NavParams) {
    this.user = this.globalService.user;
  }
  gotoSearch() {
    this.navCtrl.push(AdvancedSearchPage)
  }

  goTo(page) {
    if (page == 'addworker') {
      this.navCtrl.push(AddworkerPage);
    } else if (page == 'myorders') {
      this.navCtrl.push(MyordersPage);
    } else if (page == 'myworkers') {
      this.navCtrl.push(MyworkersPage);
    } else if (page == 'editprofile') {
      this.navCtrl.push(EditprofilePage);
    }else if (page == 'myfavorites') {
      this.navCtrl.push(FavoritesPage);
    }
  }
}
