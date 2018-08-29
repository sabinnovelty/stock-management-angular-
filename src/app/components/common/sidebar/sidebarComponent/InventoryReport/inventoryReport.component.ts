declare var hideModel: any;
declare var showModel: any;
declare var hideTableFilter: any;
import { Component, ViewChild, ElementRef } from "@angular/core";
import { ManageInventoryModel } from "../../../../../model/manageInventoryModel";
import { NgForm } from "@angular/forms";


@Component({
  selector: "app-inventoryReport",
  templateUrl: "./inventoryReport.component.html",
  styleUrls: ["./inventoryReport.component.style.css"]
})
export class InventoryReport {
  ngOnInit() {}
}
