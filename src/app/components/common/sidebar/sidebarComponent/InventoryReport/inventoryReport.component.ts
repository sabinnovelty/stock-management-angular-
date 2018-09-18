declare var hideModel: any;
declare var showModel: any;
declare var hideTableFilter: any;
import { Component, ViewChild, ElementRef } from "@angular/core";
import { InventoryService } from "./../../../../../services/inventoryService";
import Chart from "chart.js";

@Component({
  selector: "app-inventoryReport",
  templateUrl: "./inventoryReport.component.html",
  styleUrls: ["./inventoryReport.component.style.css"]
})
export class InventoryReport {
  inventoryList = [];
  lineChart = [];
  salesMessage: string = null;
  salesData: Object;
 productExpenses=[];
  productLabels = [];
  cloneExpenses=[]

  constructor(private inventoryService: InventoryService) {}
  ngOnInit() {
    this.viewChart();
    this.inventoryReport();
    this.inventoryService.fetchInventoryReport().subscribe(result => {
      console.log(result.data, "inventory report");
      this.inventoryList = result.data;
    });
  }

  inventoryReport() {
    console.log(this.productLabels,this.productExpenses,"sales")
    this.inventoryService.fetchInventorySummary().subscribe(result => {
      result.data.forEach(element => {
          this.productLabels.push(element._id);
          this.productExpenses.push(element.totalAmount);
      });
      
    });
    this.productExpenses.map(expenses=>{
      this.cloneExpenses.push(expenses)
    })
    
  }

  selectChart(){
    console.log("clicked")
  }

  
  viewChart() {
    this.lineChart = new Chart("lineChart", {
      type: "pie",
      data: {
        labels:this.productLabels,
        datasets: [
          {
            label: "product sales",
            data: this.cloneExpenses,
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

  salesReportById(pid) {
    console.log(pid, 'pid')
    this.inventoryService.fetchSalesReportById(pid).subscribe(result => {
      console.log(result, "result");
      if (result.data.length == 0) {
        this.salesMessage = "No sales Data.";
      } else if (result) {
        this.salesData = result.data[0];
        this.salesMessage = null;
      }
      console.log(this.salesData, "salesdata");
    });
  }
}
