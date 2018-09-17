
import { Component } from "@angular/core";
import { InventoryService } from './../../../../../services/inventoryService';
import { NgForm } from '@angular/forms'
import { MailService } from './../../../../../services/mailController';

@Component({
  selector: "app-mail",
  templateUrl: "./mail.component.html",
  styleUrls: ["./mail.component.style.css"]
})
export class MailComponent {


  constructor(private inventoryService:InventoryService,
    private mailService:MailService
  ) { }


  mail={
    name:"",
    phone_no:"",
    to:"",
    message:"",
    subject:"",

  }
mailFlag=false;
  productList=[]

  ngOnInit() {
      this.inventoryService.fetchOutOfStockProduct().subscribe(
        result=>{
          this.productList=result.data;
          console.log(result,"out of stock mail")
        }
      )
  }

  sendMail(message:NgForm){
    console.log(this.mail,"mail")
      this.mailService.mailService(this.mail).subscribe(
        result=>{
         this.mailFlag=true;
         setTimeout(()=>{
          this.mailFlag=false;
         },5000)
        }
      )
  }


}
