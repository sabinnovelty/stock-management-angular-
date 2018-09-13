declare var hideModel: any;
declare var showModel: any;
declare var hideTableFilter: any;
import { Component, ViewChild, ElementRef } from "@angular/core";
import { ManageInventoryModel } from "../../../../../model/manageInventoryModel";
import { NgForm } from "@angular/forms";
import { SupplierService } from "../../../../../services/supplierServices";
import { SupplierModel } from "../../../../../model/supplierModel";
import { ProductService } from "../../../../../services/productService";

import { ToasterModule, ToasterService, ToasterConfig } from "angular2-toaster";
import { InventoryService } from "../../../../../services/inventoryService";
import * as moment from 'moment';

@Component({
  selector: "app-manageInventory",
  templateUrl: "./manageInventory.component.html",
  styleUrls: ["./manageInventory.component.style.css"]
})
export class ManageInventory {
  @ViewChild("productModel")
  productModel: ElementRef;
  manageInventory: ManageInventoryModel = new ManageInventoryModel();
  cloneManageInventory: ManageInventoryModel = new ManageInventoryModel();
  title: string = "search product";
  inventoryValue: any = 0;
  totalProduct: any = 0;

  constructor(
    private supplierService: SupplierService,
    private productrService: ProductService,
    private toasterSetvice: ToasterService,
    private inventoryService: InventoryService
  ) {}

  supplierList: SupplierModel[];
  sellingPrice: number = 0;
  productList = [];
  cloneProductList = [];
  cloneProducts = [];
  products = [];
  deleteProductMsg: string;
  addOrEdit = "Add Inventory";
  editProduct: any;
  deleteFlag: boolean = false;
  addFlag: boolean = false;

  // for category list
  categoryList = [];
  updateStock = false;

  ngOnInit() {
    hideTableFilter();
    this.fetchTotalNoProduct();
    this.fetchTotalInventoryValue();
    this.supplierService.fetchSupplier().subscribe(response => {
      this.supplierList = response.data;
    });
    this.fetchProduct();
    this.getCategory();
  }

  onsellingPriceChange(event: any) {
    console.log(event);
  }

  resetForm(f: NgForm) {
    // console.log("reset form")
    // f.resetForm();
    // this.manageInventory = this.cloneManageInventory;
  }

  fetchTotalInventoryValue() {
    this.inventoryService.fetchTotalInventoryValue().subscribe(data => {
      console.log(data, "inventory value");
      this.inventoryValue = data.inventoryValue;
    });
  }

  fetchTotalNoProduct() {
    this.inventoryService.fetchTotalNoProduct().subscribe(data => {
      console.log(data.count, "count");
      this.totalProduct = data.count;
    });
  }

  fetchProduct() {
    this.productrService.fetchAllProducts().subscribe(response => {
      this.productList = response.data;
      this.products = response.data;
    });
  }

  onSubmit(f: NgForm) {
    console.log(f, "form");
    if (this.addOrEdit == "Add Inventory") {
      console.log("add product", this.addOrEdit);
      this.manageInventory.measurement = f.value.measurement;
      this.manageInventory.originalPrice = f.value.originalPrice;
      this.manageInventory.productName = f.value.productName;
      this.manageInventory.profit = f.value.profit;
      this.manageInventory.quantity = f.value.quantity;
      this.manageInventory.supplierId = f.value.supplierId;
      this.manageInventory.date = f.value.date1;
      this.manageInventory.productCategory = f.value.productCategory;
      this.productrService
        .addProduct(this.manageInventory)
        .subscribe(response => {
          console.log(response, "inventory reesult");
          if (response.updateStock) {
            console.log("update sotkc ");
            this.updateStockInProductList(
              this.productList,
              this.manageInventory
            );
            this.updateStock = true;
            this.fetchTotalInventoryValue();
            //  this.inventoryValue=this.inventoryValue+(f.value.quantity)*(f.value.originalPrice);
            this.popToast();
            hideModel();
          } else {
            this.fetchTotalInventoryValue();
            this.inventoryValue =
              this.inventoryValue + f.value.quantity * f.value.originalPrice;
            this.deleteFlag = false;
            this.addFlag = true;
            this.popToast();
            console.log(response);
            this.productList.push(response.data);
            this.fetchTotalNoProduct();
            this.fetchTotalInventoryValue();
            hideModel();
          }
        });
    } else {
      this.inventoryService.updateProduct(this.manageInventory).subscribe(
        data => {
          console.log(data, "Upaded");
          hideModel();
          this.popToast();
        },
        error => console.log("error occured on update product")
      );
    }

  }
  updateStockInProductList(productList: any, product: any) {
    let index = productList.findIndex(
      value => value.productName == product.productName
    );
    let newStock =
      parseInt(productList[index].quantity) + parseInt(product.quantity);
    let newProduct = Object.assign({}, product, { quantity: newStock });
    productList.splice(index, 1, newProduct);
  }
  showModels() {
    showModel();
  }

  calculateSp() {
    if (
      this.manageInventory.originalPrice !== null &&
      this.manageInventory.profit !== null
    ) {
      let sellingPrice =
        parseInt(this.manageInventory.originalPrice) +
        parseInt(this.manageInventory.profit);
      this.manageInventory.sellingPrice = String(sellingPrice);
      console.log(this.manageInventory);
    } else if (
      this.editProduct.originalPrice !== null &&
      this.editProduct.profit !== null
    ) {
      let sellingPrice =
        parseInt(this.editProduct.originalPrice) +
        parseInt(this.editProduct.profit);
      this.sellingPrice = sellingPrice;
    }
  }

  deleteProduct(productId: string) {
    if (window.confirm("Do you really want to delete the product?")) {
      this.productrService.deleteProduct(productId).subscribe(
        response => {
          //   this.deleteProductMsg = `${response.data.productName} has been
          //  deleted from stock sucessfully.`;
          this.addFlag = false;
          this.deleteFlag = true;

          this.fetchTotalNoProduct();
          this.fetchTotalInventoryValue();
          this.popToast();
          this.deleteProductMsg = `${response.data.productName} has been
           deleted from stock sucessfully.`;
          this.removeProductFromList(response.data);
        },
        error => console.log(error),
        () => console.log("completed")
      );
    }
  }

  removeProductFromList(product: any) {
    console.log(product, "deleted product");
    var index = this.productList.findIndex(p => {
      console.log(p);
      return p._id === product._id;
    });
    this.productList.splice(index, 1);
  }

  receiveSearchValue(event: any) {
    // this.fetchProduct()
    console.log(event.target.value, "event value");
    this.cloneProducts = [];
    console.log(event.target.value, "keypressed");
    this.products.filter(product => {
      if (
        product.productName
          .toLowerCase()
          .indexOf(event.target.value.toLowerCase()) != -1
      ) {
        console.log(product, "clone");
        this.cloneProducts.push(product);
      }
      this.productList = this.cloneProducts;
    });
  }

  public config: ToasterConfig = new ToasterConfig({
    showCloseButton: true,
    tapToDismiss: false,
    timeout: 5000
  });

  // popToast() {
  //   if (this.addOrEdit.toLocaleLowerCase() === 'add inventory') {
  //     this.toasterSetvice.pop('success', 'Status', 'Inventory Added successfully!');
  //   } else {
  //     this.toasterSetvice.pop('success', 'Status', 'Inventory Deleted successfully!');
  //   }
  // }
  popToast() {
    if (this.addFlag) {
      this.toasterSetvice.pop(
        "success",
        "Status",
        "Inventory Added successfully!"
      );
    } else if (this.deleteFlag) {
      this.toasterSetvice.pop(
        "success",
        "Status",
        "Inventory Deleted successfully!"
      );
    } else if (this.updateStock) {
      this.toasterSetvice.pop(
        "success",
        "Status",
        "Inventory stock updated successfully!"
      );
    }
  }

  updateProduct(product: any) {
    this.addOrEdit = "Update Product";
    console.log(product, "updateproduct");
    this.getCategoryById(product.cid);
    let p=Object.assign({},product,{date:moment(product.date).format("YYYY MM DD")})
    this.manageInventory = p;
    this.editProduct=p;
    console.log(this.manageInventory,"abc")
    this.calculateSp();
  

  }

  getCategory() {
    this.inventoryService.getCategory().subscribe(response => {
      this.categoryList = response.data;
      console.log(this.categoryList, "response category");
    });
  }
  getCategoryById(cid):any {
    this.inventoryService.getCategoryById(cid).subscribe(response => {
      console.log(response,"categor")
      this.manageInventory.productCategory=response.data.category;
     
    });
  }
}
