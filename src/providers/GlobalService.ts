import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import {TranslateService} from "ng2-translate";
import {Storage} from '@ionic/storage';
import {Platform} from "ionic-angular";


/**
 * Created by zaki on 1/24/17.
 */

@Injectable()
export class GlobalService {
  public loggedIn: boolean = false;
  public workerid;
  public myLat = 27;
  public myLng = 27;
  public myMapsLat;
  public myMapsLng;
  public compID;
  public deviceToken;
  public maplat;
  public maplng;
  myAddress = "";
  private home_page: any = "http://alkhadam.net/ws/allworkers/";
  private worker_details_en_url: any = "http://alkhadam.net/ws/en/single/worker/";
  private worker_details_ar_url: any = "http://alkhadam.net/ws/ar/single/worker/";
  private loginURL: string = "http://alkhadam.net/ws/login";
  private forgetPasswordURL: string = "http://alkhadam.net/ws/forgetpassword";
  private personSignUpURL: string = "http://alkhadam.net/ws/signup/person";
  private country_combo_en: string = "http://alkhadam.net/ws/en/country";
  private country_combo_ar: string = "http://alkhadam.net/ws/ar/country";
  private specialityURL_en: string = "http://alkhadam.net/ws/en/specialty";
  private specialityURL_ar: string = "http://alkhadam.net/ws/ar/specialty";
  private occupationURL_en: string = "http://alkhadam.net/ws/en/occupation";
  private occupationURL_ar: string = "http://alkhadam.net/ws/ar/occupation";
  private nationalitiesURL_en: string = "http://alkhadam.net/ws/en/nationality";
  private nationalitiesURL_ar: string = "http://alkhadam.net/ws/ar/nationality";
  private religionsURL_en: string = "http://alkhadam.net/ws/en/religion";
  private religionsURL_ar: string = "http://alkhadam.net/ws/ar/religion";
  private allFiltersURL_en: string = "http://alkhadam.net/ws/en/filters";
  private allFiltersURL_ar: string = "http://alkhadam.net/ws/ar/filters";
  private searchURL: string = "http://alkhadam.net/ws/filters/en";
  private searchCompanyBySpecialityURL: string = "http://alkhadam.net/wsrv/en/company/";
  private addWorkerURL: string = "http://alkhadam.net/ws/add/worker";
  private editWorkerURL: string = "http://alkhadam.net/ws/edit/worker";
  private deleteWorkerURL: string = "  http://alkhadam.net/ws/delete/worker";
  private myWorkersURL_ar: string = "http://alkhadam.net/ws/ar/myworkers";
  private myWorkersURL_en: string = "http://alkhadam.net/ws/en/myworkers";
  private myOrdersURL_en: string = "http://alkhadam.net/ws/en/myorders";
  private OrdersURL_en: string = "http://alkhadam.net/ws/en/orders";
  private myOrdersURL_ar: string = "http://alkhadam.net/ws/ar/myorders";
  private OrdersURL_ar: string = "http://alkhadam.net/ws/ar/orders";
  private myWishList_ar: string = "http://alkhadam.net/ws/ar/mywishlist";
  private myWishList_en: string = "http://alkhadam.net/ws/en/mywishlist";
  private getWorkersByCountryURL_en = "http://alkhadam.net/ws/en/workers/country/";
  private getWorkersByCountryURL_ar = "http://alkhadam.net/ws/ar/workers/country/";
  private companyDetailsURL: string = "http://alkhadam.net/ws/single/company/";
  private maritalURL_en: string = "http://alkhadam.net/ws/en/status";
  private maritalURL_ar: string = "http://alkhadam.net/ws/ar/status";
  private companysignupURL: string = "http://alkhadam.net/ws/signup/company";
  private upgradeAccount: string = "http://alkhadam.net/ws/memberships";
  private updateProfile: string = "http://alkhadam.net/ws/setuserinfo";
  private editProfilePerson: string = "http://alkhadam.net/ws/setpersoninfo";
  private addtocart_url: string = "http://alkhadam.net/ws/add/wishlist";
  private deleteFromCart_url: string = "http://alkhadam.net/ws/delete/mywishlist";
  private estkdam_en_url: string = "http://alkhadam.net/ws/en/workers/location/";
  private estkdam_ar_url: string = "http://alkhadam.net/ws/ar/workers/location/";
  private clean_en_url: string = "http://alkhadam.net/ws/en/workers/location/";
  private clean_ar_url: string = "http://alkhadam.net/ws/ar/workers/location/";
  private clean_estkdam_ar_url: string = "http://alkhadam.net/ws/ar/workers/country/"; //http://alkhadam.net/ws/en/flag/64
  private clean_estkdam_en_url: string = "http://alkhadam.net/ws/en/workers/country/";
  private flag_url: string = "http://alkhadam.net/ws/ar/flag/";
  private flag_location_url: string = "http://alkhadam.net/ws/en/flag/";
  private membershipPrime: string = "http://alkhadam.net/ws/single/membership/1";
  private membershipSilver: string = "http://alkhadam.net/ws/single/membership/2";
  private membershipGold: string = "http://alkhadam.net/ws/single/membership/3";
  private setmembership: string = "http://alkhadam.net/ws/set/membership";
  private setmember: string = "http://alkhadam.net/ws/set/member";
  private orderForm_url: string = "http://alkhadam.net/ws/booking";
  private companyWorkers_en_url: string = "http://alkhadam.net/ws/en/workers/company/";
  private companyWorkers_ar_url: string = "http://alkhadam.net/ws/ar/workers/company/";
  private aboutUs_en_url: string = "http://alkhadam.net/ws/en/aboutus";
  private aboutUs_ar_url: string = "http://alkhadam.net/ws/ar/aboutus";
  private contactUs_en_Url: string = "http://alkhadam.net/ws/send/contactus";
  private contactUs_Url: string = "http://alkhadam.net/ws/ar/contact/";
  private news_en_Url: string = "http://alkhadam.net/ws/en/allnews";
  private news_ar_Url: string = "http://alkhadam.net/ws/ar/allnews";
  private singleNews_en_Url: string = "http://alkhadam.net/ws/en/single/news/";
  private singleNews_ar_Url: string = "http://alkhadam.net/ws/ar/single/news/";
  private order_servant_url: string = "http://alkhadam.net/ws/recruitment";
  private banars_url: string = "http://alkhadam.net/ws/en/ads/1";
  private banars_clean_url: string = "http://alkhadam.net/ws/en/ads/2";
  private order_instruction_en_url: string = "http://alkhadam.net/ws/en/recruitment";
  private order_instruction_ar_url: string = "http://alkhadam.net/ws/en/recruitment";
  private addworker_paypal_url: string = "http://alkhadam.net/ws/paypal";
  headers = new Headers({'Content-Type': 'application/json'});
  options = new RequestOptions({headers: this.headers, method: "post"});
  public language = 'en';
  public user: any;
  public newsID: any;
  public countryID;
  constructor(private http: Http, public translate: TranslateService, public storage: Storage,
              public platform: Platform) {
  }
  getworkerpay(){
    return this.http.get(this.addworker_paypal_url).map(res => res.json());
  }
  getbanar(){
    return this.http.get(this.banars_url).map(res => res.json());
  }
  getbanar2(){
    return this.http.get(this.banars_clean_url).map(res => res.json());
  }
  getContact(){
    console.log(this.myLat,this.myLng);
    return this.http.get(this.contactUs_Url + this.myLat + "/" + this.myLng).map(res => res.json());
  }
  contactUs(name, email, mobile, message): any {
    let body = JSON.stringify({
      "name": name,
      "email": email,
      "mobile": mobile,
      "message": message
    });
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, method: "post"});
    return this.http.post(this.contactUs_en_Url, body, options)
      .map(res => res.json());
  }
  setMember(membershipid){
    let body = JSON.stringify({
      "companyid": this.user.memberid || this.user.companyid,
      "membershipid": membershipid

    });
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, method: "post"});
    return this.http.post(this.setmembership, body, options)
      .map(res => res.json());
  }
  setworkerMember(){
    let body = JSON.stringify({
      "memberid": this.user.memberid,
    });
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, method: "post"});
    return this.http.post(this.setmember, body, options)
      .map(res => res.json());
  }
  orderServant( occupationid, nationalityid, religionid, marital_statusid, gender, agesid, typeid , specialtyid): any {
    let body = JSON.stringify({
      "companyid": this.user.memberid || this.user.companyid,
      "occupationid": occupationid,
      "nationalityid": nationalityid,
      "religionid": religionid,
      "marital_statusid": marital_statusid,
      "gender": gender,
      "agesid": agesid,
      "typeid": typeid,
      "specialtyid" : specialtyid
    });
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, method: "post"});
    return this.http.post(this.order_servant_url, body, options)
      .map(res => res.json());
  }

  orderInst() {
    return this.http.get(this.language == 'en' ? this.order_instruction_en_url : this.order_instruction_ar_url).map(res => res.json());

  }

  about() {
    return this.http.get(this.language == 'en' ? this.aboutUs_en_url : this.aboutUs_ar_url).map(res => res.json());
  }

  singlenews() {
    return this.http.get(this.language == 'en' ? this.singleNews_en_Url + this.newsID : this.singleNews_ar_Url + this.newsID).map(res => res.json());
  }

  getPrime() {
    return this.http.get(this.membershipPrime).map(res => res.json());
  }

  getSilver() {
    return this.http.get(this.membershipSilver).map(res => res.json());
  }

  getGold() {
    return this.http.get(this.membershipGold).map(res => res.json());
  }

  getNews() {
    return this.http.get(this.language == 'en' ? this.news_en_Url : this.news_ar_Url).map(res => res.json());
  }

  getEstkdamWorkers() {
    console.log(this.language == 'en' ? this.estkdam_en_url + this.myLat + "/" + this.myLng + "/" + 2 : this.estkdam_ar_url + this.myLat + "/" + this.myLng + "/" + 2);
    return this.http.get(this.language == 'en' ? this.estkdam_en_url + this.myLat + "/" + this.myLng + "/" + 2 : this.estkdam_ar_url + this.myLat + "/" + this.myLng + "/" + 2).map(res => res.json());
  }

  getCompanyWorker() {
    return this.http.get(this.language == 'en' ? this.companyWorkers_en_url + this.compID : this.companyWorkers_ar_url + this.compID).map(res => res.json());
  }

  getflags() {
    return this.http.get(this.flag_location_url + this.myLat + "/" + this.myLng).map(res => res.json());
  }
  countryflag(countryid){
    console.log("countryid i want", countryid);
    return this.http.get(this.flag_url + countryid).map(res => res.json());
  }
  getCleanWorkers() {
    console.log(this.myLat);
    console.log(this.myLng);
    console.log(this.language == 'en' ? this.clean_en_url + this.myLat + "/" + this.myLng + "/" + 4 : this.clean_ar_url + this.myLat + "/" + this.myLng + "/" + 4);
    return this.http.get(this.language == 'en' ? this.clean_en_url + this.myLat + "/" + this.myLng + "/" + 4 : this.clean_ar_url + this.myLat + "/" + this.myLng + "/" + 4).map(res => res.json());
  }

  getCleanWorkersByCountry(amount,countryid) {
    console.log('cleanworkers id from globalservices');
    console.log(this.language == 'en' ? this.clean_estkdam_en_url + countryid + "/" + 1 + "/"+ amount +"/"+ 5 : this.clean_estkdam_ar_url + countryid + "/" + 1 + "/" + amount+ "/" +5);
    return this.http.get(this.language == 'en' ? this.clean_estkdam_en_url + countryid + "/" + 1 + "/" + amount+ "/" + 5 : this.clean_estkdam_ar_url + countryid + "/" + 1 + "/" + amount +"/"+ 5).map(res => res.json());
  }

  getEstkdamWorkersByCountry(amount,countryid) {
    console.log('cleanworkers id from globalservices');
    console.log(this.countryid);
    console.log(this.language == 'en' ? this.clean_estkdam_en_url + countryid + "/" + 2 + "/"+ amount +"/"+ 5 : this.clean_estkdam_ar_url + countryid + "/" + 2 + "/" + amount+"/" + 5);
    return this.http.get(this.language == 'en' ? this.clean_estkdam_en_url + countryid + "/" + 2 +"/"+ amount +"/" +5 : this.clean_estkdam_ar_url + countryid + "/" + 2 + "/" +amount + "/" + 5).map(res => res.json());
  }

  getAllFilters(): any {
    return this.http.get(this.language == 'en' ? this.allFiltersURL_en : this.allFiltersURL_ar).map(res => res.json());
  }

  getOccupationsID() {
    return this.http.get(this.language == 'en' ? this.occupationURL_en : this.occupationURL_ar).map(res => res.json());
  }


  getCompanyDetails(companyID): any {
    //TODO ask for en/ar API ?
    return this.http.get(this.language == 'en' ? this.companyDetailsURL + companyID :
      this.companyDetailsURL + companyID).map(res => res.json());
  }

  getCompanyBySpeciality(countryID, specialityID): any {
    //TODO ask for en/ar api ?
    if (countryID == null || countryID == '') {
      return this.http.get(this.language == 'en' ? this.searchCompanyBySpecialityURL + '176' + '/' + specialityID :
        this.searchCompanyBySpecialityURL + '176' + '/' + specialityID).map(res => res.json());
    } else {
      return this.http.get(this.language == 'en' ? this.searchCompanyBySpecialityURL + countryID + '/' + specialityID :
        this.searchCompanyBySpecialityURL + countryID + '/' + specialityID).map(res => res.json());
    }
  }

  getSpecialitiesID() {
    return this.http.get(this.language == 'en' ? this.specialityURL_en : this.specialityURL_ar).map(res => res.json());
  }

  getMaritalID() {
    return this.http.get(this.language == 'en' ? this.maritalURL_en : this.maritalURL_ar).map(res => res.json());
  }

  getCountriesID() {
    return this.http.get(this.language == 'en' ? this.country_combo_en : this.country_combo_ar).map(res => res.json());
  }
  getCountriesIDEN() {
    return this.http.get(this.country_combo_en).map(res => res.json());
  }

  getNationalitiesID() {
    return this.http.get(this.language == 'en' ? this.nationalitiesURL_en : this.nationalitiesURL_ar).map(res => res.json());
  }

  getReligionsID() {
    return this.http.get(this.language == 'en' ? this.religionsURL_en : this.religionsURL_ar).map(res => res.json());
  }

  getFunctionExample(): any {
    return this.http.get("www.google.com/APIcallLINK").map(res => res.json());
  }

  getAllWorkers() {
    return this.http.get(this.home_page).map(res => res.json());
  }

  getWorkersByCountry(countryid): any {
    return this.http.get(this.language == 'en' ? this.getWorkersByCountryURL_en + countryid : this.getWorkersByCountryURL_ar + countryid).map(res => res.json());
  }

  getWorkerDetails() {
    return this.http.get(this.language == 'en' ? this.worker_details_en_url + this.workerid : this.worker_details_ar_url + this.workerid).map(res => res.json());
  }

  getAccounts() {
    return this.http.get(this.upgradeAccount).map(res => res.json());
  }

  /*search(countryid: string, occupationid: string, nationalityid: string, religionid: string, status: string, gender: string, recent: string, agesid: string): any {
   /!*  let body = JSON.stringify({
   "countryid": countryid,
   "occupationid": occupationid,
   "nationalityid": nationalityid,
   "religionid": religionid,
   "status": status,
   "recent": recent,
   "agesid": agesid,
   "gender": gender
   });*!/
   }*/

  updateNormalUserData(memberid: string ,username: string, name: string, email: string, password: string, mobile: string, image: string): any {
    let body = JSON.stringify(
      {
        "memberid":this.user.memberid,
        "username": username,
        "name": name,
        "email": email,
        "password": password,
        "mobile": mobile,
        "image": image
      }
    )
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, method: "post"});
    return this.http.post(this.editProfilePerson, body, options)
      .map(res => res.json());
  }

  updateProfileData(companyid: string ,username: string,name: string,namear: string, email: string , password: string,whatsapp: string,mobile: string,tel: string,address: string,map: string,details_ar: string,details_en: string,image: string): any {
    let body = JSON.stringify(
      {
        "companyid": companyid,
        "username": username,
        "name": name,
        "namear": namear,
        "email": email,
        "password": password,
        "whatsapp": whatsapp,
        "mobile" : mobile,
        "tel": tel,
        "address": address,
        "map": map,
        "details_ar": details_ar,
        "details_en": details_en,
        "image": image
      }
    )
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, method: "post"});
    return this.http.post(this.updateProfile, body, options)
      .map(res => res.json());
  }

  getFavorites(): any {
    //TODO ask for en/ar API ?
    let body = JSON.stringify({
      "companyid": this.user.memberid || this.user.companyid,
    });
    console.log(body);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, method: "post"});
    return this.http.post(this.language == 'en' ? this.myWishList_en :
      this.myWishList_ar, body, options)
      .map(res => res.json());
  }

  deleteWorker(workerid): any {

    let body = JSON.stringify({
      "companyid": this.user.memberid || this.user.companyid,
      "workerid": workerid,
    });
    console.log(body);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, method: "post"});
    return this.http.post(this.deleteWorkerURL, body, options)
      .map(res => res.json());
  }

  editWorker(body): any {
    console.log(body);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, method: "post"});
    return this.http.post(this.editWorkerURL, body, options)
      .map(res => res.json());
  }

  addWorker(body): any {
    console.log(body);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, method: "post"});
    return this.http.post(this.addWorkerURL, body, options)
      .map(res => res.json());
  }

  searchWorkers(body): any {
    console.log(body);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, method: "post"});
    return this.http.post(this.searchURL, body, options)
      .map(res => res.json());
  }

  getMyOrders(companyid): any {
    let body = JSON.stringify({
      "companyid": this.user.memberid || this.user.companyid,
    });
    console.log(body);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, method: "post"});
    return this.http.post(this.language == 'en' ? this.myOrdersURL_en : this.myOrdersURL_ar, body, options)
      .map(res => res.json());
  }
  getOrders(companyid,workerid): any {
    let body = JSON.stringify({
      "companyid": this.user.memberid || this.user.companyid,
      "workerid":workerid
    });
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, method: "post"});
    return this.http.post(this.language == 'en' ? this.OrdersURL_en : this.OrdersURL_ar, body, options)
      .map(res => res.json());
  }
  getMyWorkers(companyid): any {
    let body = JSON.stringify({
      "companyid": this.user.memberid || this.user.companyid,
    });
    console.log(body);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, method: "post"});
    return this.http.post(this.language == 'en' ? this.myWorkersURL_en : this.myWorkersURL_ar, body, options)
      .map(res => res.json());
  }

  postFunctionExample(username: string, email: string, password: string, phone: string, image: string): any {
    let body = JSON.stringify({
      "userid": 1,
      "email": email,
      "password": password,
      "image": image,
      "username": username,
      "phone": phone
    });
    console.log(body);
    console.log(image);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, method: "post"});
    return this.http.post("www.google.com/APIcallLINK", body, options)
      .map(res => res.json());
  }

  postPersonSignUp(username: string, email: string, password: string, mobile: string, countryid: string) {
    let body = JSON.stringify({
      "username": username,
      "email": email,
      "password": password,
      "mobile": mobile,
      "countryid": countryid,
      "gcm_regid": this.deviceToken
    });
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, method: "post"});
    return this.http.post(this.personSignUpURL, body, options)
      .map(res => res.json());
  }

  postOrder(companyid,username: string, email: string, mobile: string, message: string, workerid: string) {
    let body = JSON.stringify({
      "companyid": companyid ,
      "username": username,
      "email": email,
      "mobile": mobile,
      "message": message,
      "workerid": workerid
    });
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, method: "post"});
    return this.http.post(this.orderForm_url, body, options)
      .map(res => res.json());
  }

  companySignUp(username: string, email: string, password: string, mobile: string, countryid: string, companyname: string, specialityid) {
    let body = JSON.stringify({
      "username": username,
      "email": email,
      "password": password,
      "mobile": mobile,
      "countryid": countryid,
      "name": companyname,
      "specialtyid": specialityid,
      "gcm_regid": this.deviceToken
    });
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, method: "post"});
    return this.http.post(this.companysignupURL, body, options)
      .map(res => res.json());
  }

  Login(loginObject) {
    console.log(loginObject);
    return this.http.post(this.loginURL, loginObject, this.options)
      .map(res => res.json());
  }


  setUser(user: any) {
    this.loggedIn = true;
    this.storage.set("USERKey", JSON.stringify(user));
    this.user = user;
    console.log(user);
  }

  getUser() {
    return this.storage.get("USERKey");
  }

  forgetPassword(email) {
    return this.http.post(this.forgetPasswordURL, JSON.stringify({'email': email}), this.options)
      .map(res => res.json());
  }

  logout() {
    this.loggedIn = false;
    this.storage.set("USERKey", null);
  }

  public countryid;
  countryname;

  setCountry(countryid) {
    this.countryid = countryid;
    this.storage.set("COUNTRYID", countryid);
  }

  getCountry() {
    return this.storage.get("COUNTRYID");
  }


  setDefaultLang(language) {
    this.language = language;
    this.storage.set("LANGKey", language);
    language == 'en' ? this.english() : this.arabic();
  }

  english() {
    this.language = 'en';
    this.translate.use('en');
    this.platform.setDir('ltr', true);
  }

  arabic() {
    this.language = 'ar';
    this.translate.use('ar');
    this.platform.setDir('rtl', true);
  }

  getDefaultLang() {
    return this.storage.get("LANGKey");
  }

  addToCart(servantID): any {
    let body = JSON.stringify({"workerid": servantID, "quantity": 1, "companyid": this.user.memberid || this.user.companyid});
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, method: "post"});
    console.log(body);
    return this.http.post(this.addtocart_url, body, options)
      .map(res => res.json());
  }

  removeFromCart(wishlistid): any {
    let body = JSON.stringify({"companyid": this.user.memberid || this.user.companyid, "wishlistid": wishlistid});
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, method: "post"});
    console.log(body);
    return this.http.post(this.deleteFromCart_url, body, options)
      .map(res => res.json());
  }
}
