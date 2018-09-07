import { Component, OnInit } from "@angular/core";
import { InventoryService } from "../../../../../services/inventoryService";
import Chart from "chart.js";
import * as moment from 'moment';

@Component({
  selector: "app-salesList",
  templateUrl: "sales.component.html",
  styleUrls: ["./sales.component.style.css"]
})
export class SalesListComponent implements OnInit {
  showSalesReport: boolean = true;
  addSales: boolean = false;
  totalSales: number = 0;
  sortType: "SORT_PRICE_ASCENDING";
  productExpenses = [];
  productLabels = [];
  salesDetails=[];
  salesMessage=false;
  monthlySales=[];

  lineChart = [];
  startDate:string;
  endDate:string;
  monthlySalesFlag=false;


  // for product list
  productList = [];
  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
    this.salesReport();
    this.viewChart();
    this.getMonthlySales();
    this.inventoryService.fetchSales().subscribe(response => {
      this.productList = response.data;
      console.log(this.productList,"productlist")
      this.calclateTotalSales();
    });
  }



  salesList(){
   let salesList=[];
    console.log(this.startDate,this.endDate,"date");
    let sdate=moment(this.startDate).format("YYYY MM D");
    let edate=moment(this.endDate).format("YYYY MM D");
    console.log(edate,"edate")
     salesList=this.productList.filter(sales=>{
      let salesDate=moment(sales.date).format("YYYY MM D");
      if(salesDate<=edate && salesDate>=sdate){
        return {
            ...sales,
            salesDate
        };
      }
      salesList.length>0?this.salesMessage=false:this.salesMessage=true;
    })
    console.log(salesList,"filterd sales");
    this.salesDetails=salesList;
  }
  setMonthlyFlag(){
    this.monthlySalesFlag=true;
  }

  getMonthlySales(){
    this.inventoryService.fetchMonthlyProducts()
    .subscribe(
      result=>{
        console.log(result,"monnthly products");
        this.monthlySales=result;
        console.log(this.monthlySales,"monnthly products");

      }
    )
  }

  

  salesReport() {
    console.log(this.productLabels, this.productExpenses, "sales");
    this.inventoryService.fetchInventorySummary().subscribe(result => {
      result.data.forEach(element => {
        this.productLabels.push(element._id);
        this.productExpenses.push(element.totalAmount);
      });
    });
  }

  viewChart() {
    this.lineChart = new Chart('salesChart', {
      type: 'bar',
      data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  });
  console.log(this.lineChart,"sales chart")
  }

  sortingType() {
    console.log(this.sortType, "sortype");
    if (this.sortType === "SORT_PRICE_ASCENDING") {
      this.sortPriceAscending();
    } else if (this.sortType === "SORT_PRICE_DESCENDING") {
      console.log("2");
    } else if (this.sortType === "SORT_DATE_ASCENDING") {
      console.log("3");
    } else if (this.sortType === "SORT_DATE_DESCENDING") {
      console.log("4");
    }
  }

  sortPriceAscending() {}

  toggleSalesReport() {
    this.showSalesReport = !this.showSalesReport;
    this.addSales = false;
  }

  toggleAddSales() {
    this.addSales = !this.addSales;
    this.showSalesReport = false;
  }

  calclateTotalSales() {
    console.log("caleld", this.productList);
    // let total=0;
    // this.productList.forEach(product=>{
    //   console.log(product,"dfd")
    //   total=product.sellingPrice * product.quantity+total;
    // })
    // this.totalSales=total;
  }
}
