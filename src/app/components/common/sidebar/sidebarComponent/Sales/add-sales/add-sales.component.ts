import { Component, OnInit } from '@angular/core';
import { SalesModel } from '../../../../../../model/salesModel';
import { NgForm } from '@angular/forms';
import { InventoryService } from '../../../../../../services/inventoryService';
// import * as moment from 'moment';

@Component({
  selector: 'app-add-sales',
  templateUrl: './add-sales.component.html',
  styleUrls: ['./add-sales.component.css']
})
export class AddSalesComponent implements OnInit {

  addSales: SalesModel = new SalesModel();

    // for product list
    productList = [];
    categoryList=[];
    totalRate:Number=0;
    quantity:any

  constructor(
    private inventoryService: InventoryService
  ) { }

  ngOnInit() {
    this.inventoryService.getCategory()
    .subscribe(
      result=>this.categoryList=result.data
    )
    this.inventoryService.fetchAllProduct()
    .subscribe(response => {
      this.productList = response.data;
      console.log(this.productList, 'fetched all inventory')
    })
  }
  getQuantity(event){
    console.log(event.target.value,"quantyity")
    this.quantity=event.target.value;
  }
  calculateRate(event){
    console.log("keyup venet")
      if(this.addSales.quantity!==null){
       console.log(this.quantity,event.target.value,"vau")
        this.totalRate=parseInt(this.quantity) * parseInt(event.target.value);
      }
  }

  onSubmit(form: NgForm) {
    console.log(this.addSales, 'form');
    this.addSales = form.value;
    console.log(this.addSales,"submit")
    this.inventoryService.addSales(this.addSales)
      .subscribe(response => {
        console.log(response, 'response after adding sales')
      })
  }

}
