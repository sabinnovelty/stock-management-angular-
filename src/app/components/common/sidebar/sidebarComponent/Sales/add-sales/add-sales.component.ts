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
  productById:any;
  productObject = {};

  // for category
  categoryList = [];
  categoryByProductId = [];
  totalRate: Number = 0;
  quantity: any
  salesAddedMessage: string;
  salesMessageFlag: boolean;

  constructor(
    private inventoryService: InventoryService,
    private router: Router
  ) { }

  ngOnInit() {
    this.inventoryService.getCategory()
      .subscribe(
        result => this.categoryList = result.data
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

  getQuantity(event) {
    console.log(event.target.value, "quantyity")
    this.quantity = event.target.value;
    this.calculateRate(event.target.value)
  }

  calculateRate(quantity) {
      this.totalRate = parseInt(quantity) * parseInt(this.productById.sellingPrice);
    
  }

  onSubmit(f) {
    console.log(f,'f')
    this.addSales.category = this.productById.cid.category;
    this.addSales.rate = this.productById.sellingPrice;
    this.addSales.productName = f.value.productName;
    this.addSales.date = f.value.date;
    this.addSales.quantity = f.value.quantity;
    this.addSales.total = this.totalRate;
    this.addSales.cid=this.productById.cid._id
    console.log(this.addSales, 'addSales');
    this.inventoryService.addSales(this.addSales)
      .subscribe(response => {
        console.log(response, 'response after adding sales')
        this.salesAddedMessage = response.message;
        this.salesMessageFlag = true;
      })
  }

  getCategory(data) {
    // console.log(data, 'asdas');
    // this.categoryByProductId = [];
    // this.productById = [];
    // this.inventoryService.fetchCategoryByInventoryId(data.viewModel)
    //   .subscribe(response => {
    //     this.categoryByProductId.push(response.data)
    //     console.log(response, 'fetch category by inventory id');
    //   })

    this.inventoryService.fetchProductById(data.viewModel)
      .subscribe(response => {
        console.log(response,"response")
        this.productById=response.data
        console.log(this.productById, 'product object');
      })
  }

}
