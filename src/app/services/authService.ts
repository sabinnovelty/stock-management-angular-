import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { config } from '../config';
import { HttpClient } from './httpService';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

declare var app: any;

const API_BASE_URL = config.apiBaseUrl.development
@Injectable()
export class AuthenticationService {
  constructor(
    private http: HttpClient
  ) {
      console.log(API_BASE_URL,"url")
   }

  login(model: any) {
    const credentials = {
      email: model.email,
      password: model.password
    };
    console.log(credentials,"userinfo")
    // credentials.password = this.base64utility.encodeBase64(model.password);
    // decode the encode the password  and put in credential password
    return this.http.post(API_BASE_URL+"/api/auth/login", credentials)
      .map((response: Response) => {
          return response.json();
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('loggedInUser');
  }
}
