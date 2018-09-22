import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { Admin } from './../../../model/admin';
import {AuthenticationService} from './../../../services/authService'

@Component({
    selector: 'app-registration',
    templateUrl:'./registration.component.html',
    styleUrls:['./registration.component.style.css']
     
})
export class Registration {
  constructor(
    private router: Router,
    private authService:AuthenticationService

  ){}

admin:Admin=new Admin();
password:string;
cpassword:string;
passwordMessage:string;
adminMessage:string;
  ngOnInit(){
    console.log(this.password);
    
  }

  checkPassword(event){
      console.log("df",event,this.cpassword,this.password)

            if(this.password===this.cpassword){
               this.admin.password=this.password
               console.log(this.admin,"admin")
            }else{
                this.passwordMessage="Password didnot matched.";
                console.log(this.passwordMessage,"admin")
            }
      
  }

  register(value:NgForm){
    console.log(value,"registration");
    this.authService.registerAdmin(this.admin)
    .subscribe(
        data=>{
            console.log(data,"data")
            this.adminMessage="Admin created successfully.";
            console.log(this.adminMessage)
        }
    )
  }

 
}