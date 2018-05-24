import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { config } from '../config';
import { HttpClient } from './httpService';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



const API_BASE_URL = config.apiBaseUrl.development
@Injectable()
export class ProductService {
    constructor(
        private http: HttpClient
    ) { console.log(API_BASE_URL)}

    ngOnInit(){

    }

    addProduct(product:any){
        console.log(product,"add product service");
        return this.http.post(API_BASE_URL+"/api/inventory/create",product)
        .map((res:Response)=>res.json())
        .catch((err:Response)=>Observable.throw(err.json()))
    }
}
