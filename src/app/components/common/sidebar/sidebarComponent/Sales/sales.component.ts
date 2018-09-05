import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../../../services/inventoryService';
import Chart from "chart.js";

@Component({
  selector: 'app-salesList',
  templateUrl: 'sales.component.html',
  styleUrls: ['./sales.component.style.css']
})

export class SalesListComponent implements OnInit {

  showSalesReport: boolean = true;
  addSales: boolean = false;
  totalSales:number=0;
  sortType:"SORT_PRICE_ASCENDING";
  productExpenses=[];
  productLabels = [];

  lineChart=[]

  // for product list
  productList = [];
  constructor(
    private inventoryService: InventoryService
  ) { }

  ngOnInit() {
    this.salesReport();
    this.viewChart();
    this.inventoryService.fetchSales()
      .subscribe(response => {
        console.log(response,"response")
        this.productList = response.data;
        this.calclateTotalSales();
      })
  }

  salesReport() {
    console.log(this.productLabels,this.productExpenses,"sales")
    this.inventoryService.fetchInventorySummary().subscribe(result => {
      result.data.forEach(element => {
          this.productLabels.push(element._id);
          this.productExpenses.push(element.totalAmount);
      });
    });
  }

  viewChart() {
    console.log("viewshart")
    this.lineChart = new Chart("lineChart", {
      type: "pie",
      data: {
        labels:this.productLabels,
        datasets: [
          {
            label: "product sales",
            data: this.productExpenses,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
    console.log("chart", this.productLabels,this.productExpenses);
  }

  sortingType(){
    console.log(this.sortType,"sortype");
    if(this.sortType==="SORT_PRICE_ASCENDING"){
        this.sortPriceAscending();
    }else if(this.sortType==="SORT_PRICE_DESCENDING"){
      console.log("2")
    }else if(this.sortType==="SORT_DATE_ASCENDING"){
      console.log("3")
    }else if(this.sortType==="SORT_DATE_DESCENDING"){
      console.log("4")
    }
  }

  sortPriceAscending(){
    
  }

  toggleSalesReport() {
    this.showSalesReport = !this.showSalesReport;
    this.addSales = false;
  }

  toggleAddSales() {
    this.addSales = !this.addSales;
    this.showSalesReport = false;
  }

  calclateTotalSales(){
    console.log("caleld",this.productList)
    // let total=0;
    // this.productList.forEach(product=>{
    //   console.log(product,"dfd")
    //   total=product.sellingPrice * product.quantity+total;
    // })
    // this.totalSales=total;
  }
}