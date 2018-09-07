import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { config } from '../config';
import { HttpClient } from './httpService';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



const API_BASE_URL = config.apiBaseUrl.development
@Injectable()
export class InventoryService {
    constructor(
        private http: HttpClient
    ) { console.log(API_BASE_URL)}

    ngOnInit(){

    }

    fetchAllProduct() {
        return this.http.get(API_BASE_URL + '/api/inventory')
        .map((res: Response) => res.json())
        .catch((err: Response) => Observable.throw(err.json()));
    }

    fetchInventoryReport(){
        return this.http.get(API_BASE_URL + '/api/inventory/report')
        .map((res: Response) => res.json())
        .catch((err: Response) => Observable.throw(err.json()));
    }
 
    fetchTotalNoProduct(){
        return this.http.get(API_BASE_URL+"/api/inventory/totalNoProduct")
        .map((res:Response)=>res.json())
        .catch((err:Response)=>Observable.throw(err.json()))
    }

    fetchTotalInventoryValue(){
        return this.http.get(API_BASE_URL+"/api/inventory/totalInventoryValue")
        .map((res:Response)=>res.json())
        .catch((err:Response)=>Observable.throw(err.json()))
    }

    updateProduct(product:any){
        return this.http.put(API_BASE_URL+"/api/inventory/update",product)
        .map((res:Response)=>res.json())
        .catch((err:Response)=>Observable.throw(err.json()))
    }

    addCategory(category:any){
        let url=API_BASE_URL+"/api/inventory/category";
        return this.http.post(url,{category:category})
        .map((res:Response)=>res.json())
    }

    getCategory(){
        return this.http.get(API_BASE_URL+"/api/inventory/category")
        .map((res:Response)=>res.json())
        .catch((err:Response)=>Observable.throw(err.json()))
    }

    addSales(salesModel) {
        console.log(salesModel, 'asdasdasdas sales model');
        return this.http.post(API_BASE_URL + '/api/inventory/addSales', salesModel)
            .map((res: Response) => res.json())
            .catch((err: Response) => Observable.throw(err.json()))
    }

    fetchSalesReportById(id){
        return this.http.get(API_BASE_URL +"/api/sales/report/"+id)
        .map((res: Response) => res.json())
            .catch((err: Response) => Observable.throw(err.json()))
    }

    fetchSales(){
        return this.http.get(API_BASE_URL +"/api/sales/report")
        .map((res: Response) => res.json())
        .catch((err: Response) => Observable.throw(err.json()))
    }

    fetchInventorySummary(){
        return this.http.get(API_BASE_URL +"/api/inventory/summary/day")
        .map((res: Response) => res.json())
        .catch((err: Response) => Observable.throw(err.json()))
    }
    
    fetchOutOfStockProduct(){
        return this.http.get(API_BASE_URL +"/api/inventory/outOfStock")
        .map((res: Response) => res.json())
        .catch((err: Response) => Observable.throw(err.json()))
    }
    fetchWinterProducts(){
        return this.http.get(API_BASE_URL +"/api/inventory/winterProducts")
        .map((res: Response) => res.json())
        .catch((err: Response) => Observable.throw(err.json()))
    }
    fetchMonthlyProducts(){
        return this.http.get(API_BASE_URL +"/api/sales/monthly")
        .map((res: Response) => res.json())
        .catch((err: Response) => Observable.throw(err.json()))
    }
}
