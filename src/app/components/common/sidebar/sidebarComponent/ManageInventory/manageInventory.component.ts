declare var hideModel: any;
import { Component,ViewChild,ElementRef } from '@angular/core';
import { ManageInventoryModel } from '../../../../../model/manageInventoryMode';
import { NgForm } from '@angular/forms';
import { SupplierService } from '../../../../../services/supplierServices';
import { SupplierModel } from '../../../../../model/supplierModel';
import { ProductService } from '../../../../../services/productService';

@Component({
  selector: 'app-manageInventory',
  templateUrl:'./manageInventory.component.html',
  styleUrls:['./manageInventory.component.style.css']
     
})
export class ManageInventory {

  @ViewChild('productModel') productModel:ElementRef;
  manageInventory: ManageInventoryModel = new ManageInventoryModel();

  constructor(private supplierService:SupplierService,private productrService:ProductService){}

  supplierList:SupplierModel[];
  sellingPrice:number=0;
  productList=[];
 
  ngOnInit(){
    this.supplierService.fetchSupplier()
    .subscribe(
      response=>{
        this.supplierList=response.data;
        console.log(this.supplierList,"supplierList")
      }
    )
  }

  resetForm(f:NgForm){
    f.resetForm();
  }

  onSubmit(f: NgForm) {
      this.manageInventory.measurement=f.value.measurement;
      this.manageInventory.originalPrice=f.value.originalPrice;
      this.manageInventory.productName=f.value.productName
      this.manageInventory.profit=f.value.profit;
      this.manageInventory.quantity=f.value.quantity;
      this.manageInventory.supplierId=f.value.supplierId;
      this.productrService.addProduct(this.manageInventory)
      .subscribe(
        response=>{
            console.log(response);
            
        }
      )
    
      hideModel();

      f.resetForm();
      
  }

  calculateSp(event:any){
        if(this.manageInventory.originalPrice!==null && this.manageInventory.profit!==null){
            let sellingPrice= parseInt(this.manageInventory.originalPrice)+parseInt(this.manageInventory.profit);
            this.manageInventory.sellingPrice=String(sellingPrice)
            console.log(this.manageInventory)
        }
  }

}