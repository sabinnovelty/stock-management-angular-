import { Component, OnInit } from '@angular/core';
import { SalesModel } from '../../../../../../model/salesModel';
import { NgForm } from '@angular/forms';
import { InventoryService } from '../../../../../../services/inventoryService';
import { Router } from '@angular/router';
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
    productById = [];
    productObject = {};

    // for category
    categoryList = [];
    categoryObject = {};
    totalRate:Number=0;
    quantity:any
    salesAddedMessage:string;
    salesMessageFlag:boolean;

  constructor(
    private inventoryService: InventoryService,
    private router: Router
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

    // this.inventoryService.getCategory()
    //   .subscribe(response => {
    //     this.categoryList = response.data;
    //     console.log('category response', response.data);
    //   })
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
        this.salesAddedMessage=response.message;
        this.salesMessageFlag=true;
      })
  }

  getCategory(data) {
    console.log(data, 'asdas');
    this.inventoryService.fetchCategoryByInventoryId(data.viewModel)
      .subscribe(response => {
        this.categoryObject = Object.assign(response.data, this.categoryObject);
        console.log(this.categoryObject, 'object after category assigned');
        console.log(response, 'fetch category by inventory id');
      })

    this.inventoryService.fetchProductById(data.viewModel)
      .subscribe(response => {
        this.productObject = Object.assign(response.data, this.productObject);
        console.log(this.productObject, 'product object');
        console.log(response, 'fetch product by id');
      })
    }

}
