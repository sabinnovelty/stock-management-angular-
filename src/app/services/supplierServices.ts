import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { config } from '../config';
import { HttpClient } from './httpService';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



const API_BASE_URL = config.apiBaseUrl.development
@Injectable()
export class SupplierService {
    constructor(
        private http: HttpClient
    ) { }

    addSupplierInfo(supplier: any) {
        return this.http.post(API_BASE_URL + "/api/supplier", supplier)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: Response) => Observable.throw(error.json()))
    }

    fetchSupplier(){
        return this.http.get(API_BASE_URL+"/api/supplier")
        .map((res:Response)=>res.json())
        .catch((err:Response)=>Observable.throw(err.json()))
    }

    deleteSupplier(supplierId){
        return this.http.delete(API_BASE_URL+"/api/supplier/"+supplierId)
        .map((res:Response)=>res.json())
        .catch((err:Response)=>Observable.throw(err.json()))
    }

    updateSupplier(supplier){
        return this.http.put(API_BASE_URL+"/api/supplier",supplier)
        .map((res:Response)=>res.json())
    }
}
