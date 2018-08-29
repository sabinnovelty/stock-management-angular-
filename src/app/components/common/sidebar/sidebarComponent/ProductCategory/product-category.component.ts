import { Component, OnInit } from '@angular/core';
import {InventoryService } from './../../../../../services/inventoryService'

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.style.css']
})

export class ProductCategory implements OnInit {
 
  category_success:string;
  categoryList=[];
 
  constructor( private inventoryService:InventoryService) { }


  ngOnInit() {
      this.inventoryService.getCategory()
      .subscribe(
        result=>{
         
          console.log(result,"result")
        }
      )
   }


  addCategory(category){
        this.inventoryService.addCategory(category)
        .subscribe(
          result=>{
            this.category_success=result.message;
            this.categoryList.push(result.data);
          },
          error=>console.log(error,"error")
        )
  }
}