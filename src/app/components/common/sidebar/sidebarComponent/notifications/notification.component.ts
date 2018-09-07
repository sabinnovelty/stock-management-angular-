import { Component, EventEmitter, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { InventoryService } from "../../../../../services/inventoryService";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.style.css"]
})
export class Notification {
  cardTitle: string = "";
  productList = [];
  notification = 0;
  stockFlag = false;
  winterProducts = [];
  winterProductFlag = false;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
    this.getWinterProducts();
    this.inventoryService.fetchOutOfStockProduct().subscribe(data => {
      console.log(data, "result");
      this.productList = data.data;
      this.productList.length > 0
        ? (this.notification = 1)
        : (this.notification = 0);
      console.log(this.productList, "propudct list");
    });
  }
  // winterProductsToggle() {
  //   console.log("winter toogle")
  //   this.winterProductFlag?false:true;
  //   console.log(this.winterProductFlag,"flage")
  // }
  getWinterProducts() {
    this.inventoryService.fetchWinterProducts().subscribe(result => {
      console.log(result, "winterproduts");
      this.winterProducts = result.data;
      console.log(this.winterProducts, "winterprodut");
    });
  }
  viewProducts() {
    console.log("viewporudcts");
    this.winterProductFlag = true;
  }
  viewProductsHide(){
    this.winterProductFlag=false;
  }
  showDashboardItem() {
    if (this.notification > 0 && this.productList.length > 0) {
      this.stockFlag = true;
    } else {
      this.stockFlag = false;
    }
  }
  supplierrDetails() {
    console.log("supplier details");
  }
}
