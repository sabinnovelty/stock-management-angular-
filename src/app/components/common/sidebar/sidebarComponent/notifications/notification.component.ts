import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { InventoryService } from '../../../../../services/inventoryService'



@Component({
    selector: 'app-notification',
    templateUrl:'./notification.component.html',
    styleUrls:['./notification.component.style.css']
     
})

export class Notification {

  cardTitle: string = '';
  productList=[];
  notification=0;
  stockFlag=false;

  seasone={
    "winter":["12/21","3/22"]
  }

  constructor(private inventoryService:InventoryService){}

  ngOnInit(){
      this.inventoryService.fetchOutOfStockProduct()
      .subscribe(
        data=>{
          console.log(data,"result");
          this.productList=data.data;
          this.productList.length>0?this.notification=1:this.notification=0
          console.log(this.productList,"propudct list")
        }
      )
  }
  
  showDashboardItem(){
    if(this.notification>0 && this.productList.length>0){
      this.stockFlag=true;
    }else{
      this.stockFlag=false;
    }
  }
  supplierrDetails(){
    console.log("supplier details")
  }


}