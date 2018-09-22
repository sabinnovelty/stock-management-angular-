import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { config } from '../config';
import { HttpClient } from './httpService';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



const API_BASE_URL = config.apiBaseUrl.development
@Injectable()
export class MailService {
    constructor(
        private http: HttpClient
    ) { }

    mailService(mail: any) {
        console.log(mail,"mail inserveri")
        return this.http.post(API_BASE_URL + "/api/mail/send", mail)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: Response) => Observable.throw(error.json()))
    }

}
