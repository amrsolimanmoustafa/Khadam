import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {ChooseLanguage} from '../pages/choose-language/choose-language';
import {HomepagePage} from "../pages/homepage/homepage";
import {ServantDetailsPage} from "../pages/servant-details/servant-details";
import {TranslateModule, TranslateStaticLoader, TranslateLoader} from "ng2-translate";
import {Http} from "@angular/http";
import {GlobalService} from "../providers/GlobalService";
import {AdvancedSearchPage} from "../pages/advanced-search/advanced-search";
import {EditprofilePage} from "../pages/editprofile/editprofile";
import {LoginPage} from "../pages/login/login";
import { IonicStorageModule } from '@ionic/storage';
import {BeforeSignUpPage} from "../pages/before-sign-up/before-sign-up";
import {UserSignUpPage} from "../pages/user-sign-up/user-sign-up";
import {CompanySignUpPage} from "../pages/company-sign-up/company-sign-up";
import {SearchResult} from "../pages/search-result/searchresult";
import {MapsPage} from "../pages/maps-page/mapspage";
import {EstkdamPage} from "../pages/estkdam-page/estkdam-page";
import {CompanyDetailsPage} from "../pages/company-details/company-details";
import {PlainMap} from "../pages/plain-map/plainmap";
import {FullImagePage} from "../pages/full-image/full-image";
import {DashboardPage} from "../pages/dashboard/dashboard";
import {MyworkersPage} from "../pages/myworkers/myworkers";
import {MyordersPage} from "../pages/myorders/myorders";
import {OrdersPage} from "../pages/orders/orders";
import {AddworkerPage} from "../pages/addworker/addworker";
import {ContactPage} from "../pages/contact/contact";
import {AboutPage} from "../pages/about/about";
import {NewsPage} from "../pages/news/news";
import {EditWorkerPage} from "../pages/editworker/editworker";
import {SingleNewsPage} from "../pages/single-news/single-news";
import {FavoritesPage} from "../pages/favorites/favorites";
import {OrderServantPage} from "../pages/order-servant/order-servant";
import {SelectCountryButtonsPage} from "../pages/select-country-buttons/select-country-buttons";
export function TranslateLoaderFactory(http: any) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}
@NgModule({
  declarations: [
    MyApp,
    ChooseLanguage,
    HomepagePage,
    ServantDetailsPage,
    AdvancedSearchPage,
    EditprofilePage,
    LoginPage,
    BeforeSignUpPage,
    UserSignUpPage,
    CompanySignUpPage,
    MapsPage,
    SearchResult,
    EstkdamPage,
    CompanyDetailsPage,
    PlainMap,
    FullImagePage,
    DashboardPage,
    MyworkersPage,
    MyordersPage,
    OrdersPage,
    AddworkerPage,
    ContactPage,
    AboutPage,
    NewsPage,
    EditWorkerPage,
    SingleNewsPage,
    FavoritesPage,
    OrderServantPage,
    SelectCountryButtonsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: TranslateLoaderFactory,
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChooseLanguage,
    HomepagePage,
    ServantDetailsPage,
    AdvancedSearchPage,
    EditprofilePage,
    LoginPage,
    BeforeSignUpPage,
    UserSignUpPage,
    CompanySignUpPage,
    MapsPage,
    SearchResult,
    EstkdamPage,
    CompanyDetailsPage,
    PlainMap,
    FullImagePage,
    DashboardPage,
    MyworkersPage,
    MyordersPage,
    OrdersPage,
    AddworkerPage,
    ContactPage,
    AboutPage,
    NewsPage,
    EditWorkerPage,
    SingleNewsPage,
    FavoritesPage,
    OrderServantPage,
    SelectCountryButtonsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, GlobalService]
})
export class AppModule {
}
