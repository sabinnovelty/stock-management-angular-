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

    // for category list
    categoryList = [];

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

    this.inventoryService.getCategory()
      .subscribe(response => {
        this.categoryList = response.data;
        console.log('category response', response.data);
      })
  }

  onSubmit(form: NgForm) {
    console.log(form, 'form');
    this.addSales = form.value;
    console.log(this.addSales)
    this.inventoryService.addSales(this.addSales)
      .subscribe(response => {
        console.log(response, 'response after adding sales')
        this.router.navigateByUrl('/dashboard/sales');

      })
  }

}
