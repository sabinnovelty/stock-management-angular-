import { Component, ViewChild, ElementRef } from "@angular/core";
import { InventoryService } from "../../../../../../services/inventoryService";
import Chart from "chart.js";

@Component({
  selector: "app-inventorySummary",
  templateUrl: "./inventorySummary.component.html",
  styleUrls: ["./inventorySummary.component.style.css"]
})
export class InventorySummary {
  lineChart = [];
  labels = [];
  chartData = [];
  productLabels=[];
  productExpenses=[];

  constructor(private inventoryService: InventoryService) {}

  // ctx = document.getElementById("myChart")
  ngOnInit() {
    this.inventoryReport();
    this.lineChart = new Chart("lineChart", {
      type: "bar",
      data: {
        labels: this.productLabels,
        datasets: [
          {
            label: "products",
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
   
  }

  inventoryReport() {
    console.log(this.productLabels,this.productExpenses,"sales")
    this.inventoryService.fetchInventorySummary().subscribe(result => {
      result.data.forEach(element => {
          this.productLabels.push(element._id);
          this.productExpenses.push(element.totalAmount);
      });
      
    });
  
  }

 
}
