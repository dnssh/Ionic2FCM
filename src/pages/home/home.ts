import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpModule, Headers, RequestOptions,Response } from '@angular/http';
import { Http} from '@angular/http';

import { HTTP } from '@ionic-native/http';

import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

declare var FCMPlugin;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  token: any;
  constructor(public navCtrl: NavController, public  http:Http,public storage:Storage) {
    this.token =JSON.stringify(this.storage.get('regid'));
}

/*notify()
{   
this.http.get('http://testaibot.herokuapp.com/firebase',,
  {headers: {'Content-Type': 'application/json'} }   )
.then(data => {
  console.log(data.data);
  alert(data.data);
}).catch(error => {
  alert(error);
});
}*/


notify()
{   

 this.http.get('http://initial99.herokuapp.com/firebase')
// this.http.get('http://testaibot.herokuapp.com/firebase')
.map(res => res.json())
.subscribe(data => {
        alert(data.data);
      });

/*this.http.get('http://testaibot.herokuapp.com/firebase')
.subscribe(data => {
  this.data = data.results;
  resolve(this.data);
}).catch(error => {
  alert(error);
});*/
}


/* let headers = new Headers({ 'Content-Type' : 'application/json'});
let options = new RequestOptions({ headers: headers });
let data = JSON.stringify({
  cardToken: token,
  amount: 500
});
return new Promise((resolve, reject) => {
  this.http.post('url', data, options)
  .toPromise()
  .then((response) =>
  {console.log('API Response : ', response.json());
    resolve(response.json()); })
  .catch((error) =>
  {  console.error('API Error : ', error.status);
    console.error('API Error : ', JSON.stringify(error));
    reject(error.json());
  });
});*/
 savetoken()
 { 
//var token = this.storage.get('regid');
   this.storage.get('regid').then((val)=>{
  var tok=JSON.stringify({id: val});
  //alert(tok);

  var headers = new Headers();
  headers.append("Accept", 'application/json');
  headers.append('Content-Type', 'application/json' );
  let options = new RequestOptions({ headers: headers });
 
  let pos = {id:val}
    
  this.http.post("http://initial99.herokuapp.com/fdb",pos, options)
  //this.http.post('http://initial99.herokuapp.com/fdb',tok,{headers: {'Content-Type': 'application/json'} })
  .map(res => res.json())
        .subscribe(
            data => {alert(data);},
            err => {alert(err);}
        );

  /*.then(data => {alert(JSON.stringify(data));})
  .catch(error => {alert(JSON.stringify(error));});*/
});
}


 temppost() {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
 
    let postParams = {
      title: 'foo',
      body: 'bar',
      userId: 1
    }
    
    this.http.post("http://jsonplaceholder.typicode.com/posts", postParams, options)
      .subscribe(data => {
        console.log(data['_body']);
        alert(data['_body']);
       }, error => {
        console.log(error);
        alert(error);// Error getting the data
      });
  }


test()
{
   this.storage.get('regid').then((val)=>{
  alert(val);}) 
 } 

}
