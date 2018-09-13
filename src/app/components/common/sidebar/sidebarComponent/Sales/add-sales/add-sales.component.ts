import { Component, OnInit } from '@angular/core';
import { SalesModel } from '../../../../../../model/salesModel';
import { NgForm } from '@angular/forms';
import { InventoryService } from '../../../../../../services/inventoryService';
import { Router } from '@angular/router';

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

  constructor(
    private inventoryService: InventoryService,
    private router: Router
  ) { }

  ngOnInit() {
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

  onSubmit(form: NgForm) {
    console.log(form.value, 'form');
    this.addSales.productName = form.value.productName;
    // this.addSales.category = this.categoryObject.category;
    this.addSales.date = form.value.date;
    // this.addSales.rate = this.productObject.sellingPrice;
    this.addSales.quantity = form.value.quantity;
    this.addSales.total = form.value.total;

    console.log(this.addSales, 'sales details')
    this.inventoryService.addSales(this.addSales)
      .subscribe(response => {
        console.log(response, 'response after adding sales')
        this.router.navigateByUrl('/dashboard/salesDetails');

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
