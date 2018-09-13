import { Component, OnInit } from "@angular/core";
import { InventoryService } from "./../../../../../services/inventoryService";

@Component({
  selector: "app-product-category",
  templateUrl: "./product-category.component.html",
  styleUrls: ["./product-category.component.style.css"]
})
export class ProductCategory implements OnInit {
 
  category_success:string;
  categoryList=[];

  addOrEditFlag = 'Add';

  categoryModel = {
    cid: '',
    cname: ''
  }
 
  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
      this.inventoryService.getCategory()
      .subscribe(
        result=>{
          this.categoryList = result.data;
          console.log(result,"result")
        }
      )
   }

  addCategory(category){
    console.log(this.addOrEditFlag)
    console.log(this.categoryModel,"categorymodel")
    if(this.addOrEditFlag == 'Add') {
      this.inventoryService.addCategory(category)
      .subscribe(
        result=>{
          this.category_success=result.message;
          this.categoryList.push(result.data);
        },
        error=>console.log(error,"error")
      )
    } else if (this.addOrEditFlag == 'Edit') {
      console.log(this.categoryModel);
      this.inventoryService.updateCategory(this.categoryModel)
        .subscribe(result => {
          console.log(result)
        })
    }

  }

  deleteCategory(id) {
    console.log(id, 'category id')
    this.inventoryService.deleteCategory(id)
      .subscribe(result => {
        console.log(result)
      })
  }

  updateCategory(category) {
    console.log(category, 'category id');
    this.categoryModel.cid = category._id;
    this.categoryModel.cname = category.category;
    this.addOrEditFlag = 'Edit';
    console.log(this.addOrEditFlag)
    // this.category1 = category.category
    // this.inventoryService.updateCategory(category)
    //   .subscribe(result => {
    //     this.category1 = result.data.category;
    //     console.log(this.category1)
    //     console.log(result)
    //   })

  }
}
