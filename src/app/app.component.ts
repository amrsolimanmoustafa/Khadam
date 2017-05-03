import {Component, ViewChild} from '@angular/core';
import {Nav, Platform, AlertController, MenuController, LoadingController, ToastController,
  ModalController, ActionSheetController
} from 'ionic-angular';
import {IonicApp, IonicModule} from 'ionic-angular';
import {StatusBar, Splashscreen, Push} from 'ionic-native';
import {ChooseLanguage} from '../pages/choose-language/choose-language';
import {HomepagePage} from "../pages/homepage/homepage";
import {EditprofilePage} from "../pages/editprofile/editprofile";
import {TranslateService} from "ng2-translate";
import {GlobalService} from "../providers/GlobalService";
import {LoginPage} from "../pages/login/login";
import {BeforeSignUpPage} from "../pages/before-sign-up/before-sign-up";
import {EstkdamPage} from "../pages/estkdam-page/estkdam-page";
import {DashboardPage} from "../pages/dashboard/dashboard";
import {ContactPage} from "../pages/contact/contact";
import {AboutPage} from "../pages/about/about";
import {NewsPage} from "../pages/news/news";
import {Geolocation} from "ionic-native";
import {OrderServantPage} from "../pages/order-servant/order-servant";
import {SelectCountryButtonsPage} from "../pages/select-country-buttons/select-country-buttons";
import {OrdersPage} from "../pages/orders/orders";

declare var google: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = ChooseLanguage;
  isLeft = true;
  pages: Array<{title: string, icon: string, component: any}>;
  pagesLogged: Array<{title: string, icon: string, component: any}>;
  public flag;
  public flagepicpath;
  public countryname;
  public user;
  public worker;

  constructor(public platform: Platform, public translate: TranslateService, public loadingCtrl: LoadingController,
              public globalService: GlobalService,
              public alertCtrl: AlertController, private toastCtrl: ToastController, public menuCtrl: MenuController,
              public modalCtrl: ModalController, public actionSheetCtrl: ActionSheetController) {
    this.initializeApp();
    this.pages = [
      {title: 'Home', icon: 'home', component: HomepagePage},
      {title: 'News', icon: 'book', component: NewsPage},
      {title: 'Sign-In', icon: 'log-in', component: LoginPage},
      {title: 'Sign-Up', icon: 'person-add', component: BeforeSignUpPage},
      {title: 'Language', icon: 'text', component: ChooseLanguage},
      {title: 'About Us', icon: 'ios-contacts', component: AboutPage},
      {title: 'Contact Us', icon: 'ios-create', component: ContactPage},
      {title: 'Countries', icon: 'globe', component: SelectCountryButtonsPage},
    ];

    // used for an example of ngFor and navigation when logged in
    this.pagesLogged = [
      {title: 'Home', icon: 'home', component: HomepagePage},
      {title: 'News', icon: 'book', component: NewsPage},
      {title: 'My account', icon: 'log-out', component: DashboardPage},
      {title: 'Order Servant', icon: 'person', component: OrderServantPage},
      {title: 'Language', icon: 'text', component: ChooseLanguage},
      {title: 'Countries', icon: 'globe', component: SelectCountryButtonsPage},
      {title: 'About Us', icon: 'ios-contacts', component: AboutPage},
      {title: 'Contact Us', icon: 'ios-create', component: ContactPage},
      {title: 'Sign-Out', icon: 'log-out', component: EditprofilePage}
    ];
    translate.onLangChange.subscribe(data => {
      // console.log(data);
      if (data.lang == 'ar') {
        this.isLeft = false;
      } else {
        this.isLeft = true;
      }
    });
  }

  hideSplashScreen() {
    if (navigator && Splashscreen) {
      setTimeout(() => {
        Splashscreen.hide();
      }, 100);
    }
  }

  initializeApp() {

    this.platform.ready().then(() => {

      this.hideSplashScreen();


      StatusBar.backgroundColorByHexString('#4a284d');
      // ok, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      let push = Push.init({
        android: {
          senderID: "628730003333"
        },
        ios: {
          alert: "true",
          badge: false,
          sound: "true"
        },
        windows: {}
      });

      push.on('registration', (data) => {
        console.log("device token ->", data.registrationId);
        this.globalService.deviceToken = data.registrationId;
        //TODO - send device token to server
      });

      push.on('notification', (data) => {
        console.log('message', data);

        console.log('workerid', data.additionalData.workerid);
        console.log('message', data.message);

                let self = this;
        //if user using app and push notification comes
        if (data.additionalData.foreground) {
          // if application open, show popup
          let confirmAlert = this.alertCtrl.create({
            title: data.title,
            message: data.message,
            buttons: [{
              text: this.globalService.language == 'en' ? 'Ignore' : 'تجاهل',
              role: 'cancel'
            }, {
              text: this.globalService.language == 'en' ? 'Orders' : 'الطلبات',
              handler: () => {
                //TODO: Your logic here. khaled - change it to driver component if its not working
                // self.nav.push(historyPage, {message: data.message});
                if(data.additionalData.workerid != 0){
                  self.nav.push(OrdersPage,{
                    worker : data.additionalData.workerid
                  });
                  // this.showAlert(data);
                  console.log(data);
                }else {
                  self.nav.push(HomepagePage);
                }

                // this.showAlertzard(data.message);
              }
            }]
          });
          confirmAlert.present();
        } else {
          //if user NOT using app and push notification comes
          //TODO: Your logic on click of push notification directly. khaled - change it to driver component if its not working
          self.nav.push(HomepagePage);
          console.log("Push notification clicked");
        }
      });
      push.on('error', (e) => {
        console.log(e.message);
      });

    });

  }

  pushCompanies(specialityid) {
    console.log(specialityid);
    this.nav.push(EstkdamPage, {
      specialityid: specialityid,
    });
  }

  shownGroup = null;

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  };

  isGroupShown(group) {
    return this.shownGroup === group;
  };


  showAlert() {
    let alert = this.alertCtrl.create({
      title: this.globalService.language == 'en' ? 'Logged out' : 'تسجيل الخروج',
      subTitle: this.globalService.language == 'en' ? 'Logged out successfully!' : 'تم تسجيل الخروج بنجاح!',
      buttons: [this.globalService.language == 'en' ? 'OK' : 'حسناً']
    });
    alert.present();
  }

  openPage(page) {
    if (this.globalService.loggedIn) {
      this.user = this.globalService.user.username;
      console.log(this.user)
    }
    if (page.title == 'Sign-Out') {
      this.globalService.logout();
      this.showAlert();
      if (this.nav.getActive().component != page.component) {
        this.nav.setRoot(HomepagePage);
      }
    } else if (page.title == 'Home') {
      console.log('Setting root');
      this.nav.setRoot(HomepagePage);
    } else {
      this.nav.push(page.component);
    }
  }

  // openPage(page) {
  //   // Reset the content nav to have just this page
  //   // we wouldn't want the back button to show in this scenario
  //   this.nav.setRoot(page.component);
  // }
}
