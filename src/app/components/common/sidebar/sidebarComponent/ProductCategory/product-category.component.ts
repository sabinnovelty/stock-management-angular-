import { Component, OnInit } from '@angular/core';
import {InventoryService } from './../../../../../services/inventoryService'

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.style.css']
})

export class ProductCategory implements OnInit {
 
  category_success:string;
  category=[{id:1,name:"dfd"}];
 
  constructor( private inventoryService:InventoryService) { }


  ngOnInit() {
      this.inventoryService.getCategory()
      .subscribe(
        result=>{
          // this.category=Object.values(result.data.values)
          // result.data.map(v=>{
          //   this.category.push(v)
          // })
          // console.log(this.category,"result")
        }
      )
   }


  addCategory(category){
        this.inventoryService.addCategory(category)
        .subscribe(
          result=>{
            this.category_success=result.message;
            this.category.push(result.data);
          },
          error=>console.log(error,"error")
        )
  }
}