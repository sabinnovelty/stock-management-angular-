import { Component, OnInit } from '@angular/core';
import { SalesModel } from '../../../../../../model/salesModel';
import { NgForm } from '@angular/forms';
import { InventoryService } from '../../../../../../services/inventoryService';

@Component({
  selector: 'app-add-sales',
  templateUrl: './add-sales.component.html',
  styleUrls: ['./add-sales.component.css']
})
export class AddSalesComponent implements OnInit {

  addSales: SalesModel = new SalesModel();

    // for product list
    productList = [];

  constructor(
    private inventoryService: InventoryService
  ) { }

  ngOnInit() {
    this.inventoryService.fetchAllProduct()
    .subscribe(response => {
      this.productList = response.data;
      console.log(this.productList, 'fetched all inventory')
    })
  }

  onSubmit(form: NgForm) {
    console.log(form, 'form');
    this.addSales = form.value;
    console.log(this.addSales)
    this.inventoryService.addSales(this.addSales)
      .subscribe(response => {
        console.log(response, 'response after adding sales')
      })
  }

}
