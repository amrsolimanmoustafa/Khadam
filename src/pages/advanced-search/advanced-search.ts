import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController, ToastController} from 'ionic-angular';
import {GlobalService} from "../../providers/GlobalService";
import {SearchResult} from "../search-result/searchresult";

/*
 Generated class for the AdvancedSearch page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-advanced-search',
  templateUrl: 'advanced-search.html'
})
export class AdvancedSearchPage {
  public countryid: string = "";
  public countries;
  public nationalityid: string = "";
  public residenceid: string = "";
  public nationalities;
  public residence;
  public occupationid: string = "";
  public occupations;
  public religionid: string = "";
  public religions;
  public maritalid: string = "";
  public maritals;
  public ageid: string = "";
  public ages;

  public sex = "";
  public recent = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public globalService: GlobalService,
              public loadingCtrl: LoadingController
    , public toastCtrl: ToastController) {

  }

  // selectOptions = {
  //   interface:
  // };

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdvancedSearchPage');
    this.getAllFilters();
  }


  getAllFilters() {
    this.globalService.getAllFilters().subscribe(
      data => {
        this.countries = data.country;
        this.religions = data.religion;
        this.maritals = data.status;
        this.occupations = data.occupation;
        this.nationalities = data.nationality;
        this.residence = data.residence;
        this.ages = data.ages;
        console.log(data)
      }
    );
  }

  search() {
    let wholeobj = {
      countryid: this.countryid,
      occupationid: this.occupationid,
      nationalityid: this.nationalityid,
      residenceid: this.residenceid,
      religionid: this.religionid,
      status: this.maritalid,
      recent: this.recent,
      agesid: this.ageid,
      gender: this.sex
    };

    console.log(wholeobj);
    this.navCtrl.push(SearchResult, {
      search: wholeobj
    });
  }

}
