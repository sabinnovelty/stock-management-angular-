import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../../../services/inventoryService';

@Component({
  selector: 'app-salesList',
  templateUrl: 'sales.component.html',
  styleUrls: ['./sales.component.style.css']
})

export class SalesListComponent implements OnInit {

  showSalesReport: boolean = true;
  addSales: boolean = false;

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

  toggleSalesReport() {
    this.showSalesReport = !this.showSalesReport;
    this.addSales = false;
  }

  toggleAddSales() {
    this.addSales = !this.addSales;
    this.showSalesReport = false;
  }
}