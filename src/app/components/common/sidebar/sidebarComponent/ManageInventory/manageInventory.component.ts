declare var hideModel: any;
import { Component, ViewChild, ElementRef } from '@angular/core';
import { ManageInventoryModel } from '../../../../../model/manageInventoryMode';
import { NgForm } from '@angular/forms';
import { SupplierService } from '../../../../../services/supplierServices';
import { SupplierModel } from '../../../../../model/supplierModel';
import { ProductService } from '../../../../../services/productService';


import { ToasterModule, ToasterService,ToasterConfig } from 'angular2-toaster';
@Component({
  selector: 'app-manageInventory',
  templateUrl: './manageInventory.component.html',
  styleUrls: ['./manageInventory.component.style.css']

})
export class ManageInventory {

  @ViewChild('productModel') productModel: ElementRef;
  manageInventory: ManageInventoryModel = new ManageInventoryModel();
  title: string = "search product";

  constructor(private supplierService: SupplierService,
    private productrService: ProductService, private toasterSetvice: ToasterService) {
     
     }

  supplierList: SupplierModel[];
  sellingPrice: number = 0;
  productList = [];
  cloneProducts = [];
  products = [];
  deleteProductMsg: string;
  addOrEdit="Add Inventory";
  

  ngOnInit() {
    this.supplierService.fetchSupplier()
      .subscribe(
        response => {
          this.supplierList = response.data;
          console.log(this.supplierList, "supplierList")
        }
      )
    this.fetchProduct();
  }

  resetForm(f: NgForm) {
    f.resetForm();
  }

  fetchProduct() {
    this.productrService.fetchAllProducts()
      .subscribe(
        response => {
          console.log(response, "porudct")
          this.productList = response.data;
          this.products = response.data;
          console.log(response)
        }
      )
  }

  onSubmit(f: NgForm) {
    console.log(f,"form")
    this.manageInventory.measurement = f.value.measurement;
    this.manageInventory.originalPrice = f.value.originalPrice;
    this.manageInventory.productName = f.value.productName
    this.manageInventory.profit = f.value.profit;
    this.manageInventory.quantity = f.value.quantity;
    this.manageInventory.supplierId = f.value.supplierId;
    this.manageInventory.date=f.value.date1;
    this.productrService.addProduct(this.manageInventory)
      .subscribe(
        response => {
          console.log(response);
          this.productList.push(response.data)

        }
      )
    hideModel();
    f.resetForm();
  }

  calculateSp(event: any) {
    if (this.manageInventory.originalPrice !== null && this.manageInventory.profit !== null) {
      let sellingPrice = parseInt(this.manageInventory.originalPrice) + parseInt(this.manageInventory.profit);
      this.manageInventory.sellingPrice = String(sellingPrice)
      console.log(this.manageInventory)
    }
  }

  deleteProduct(productId: string) {
    this.productrService.deleteProduct(productId)
      .subscribe(
        response => {
          console.log(response);
          this.popToast()
          this.deleteProductMsg = `${response.data.productName} has been
           deleted from stock sucessfully.`;
           this.removeProductFromList(response.data)
        },
        error => console.log(error),
        () => console.log("completed")
      )
  }

  removeProductFromList(product:any){
    console.log(product,"deleted product")
    var index=this.productList.findIndex((p)=>{
      console.log(p)
      return p._id===product._id
    });
    this.productList.splice(index,1);
  }

  receiveSearchValue(event: any) {
    // this.fetchProduct()
    console.log(event.target.value, "event value")
    this.cloneProducts = []
    console.log(event.target.value, "keypressed")
    this.products.filter((product) => {
      if (product.productName.toLowerCase().indexOf(event.target.value.toLowerCase()) != -1) {
        console.log(product, "clone")
        this.cloneProducts.push(product);
      }
      this.productList = this.cloneProducts;
    });

  }

  public config: ToasterConfig =
    new ToasterConfig({
      showCloseButton: true,
      tapToDismiss: false,
      timeout: 0
    });

  popToast() {
    this.toasterSetvice.pop('warning', 'Args Title', 'Args Body');
  }

  updateProduct(product:any){
    console.log(product)
    this.addOrEdit="Update Product";
    console.log(product,"update product")
  }

}