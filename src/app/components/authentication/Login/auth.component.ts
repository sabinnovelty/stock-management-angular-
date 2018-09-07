import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'

import { AuthenticationService } from '../../../services/authService';

@Component({
    selector: 'app-authentication',
    templateUrl:'./auth.component.html',
    styleUrls:['./auth.component.style.css']
     
})
export class AuthenticationComponent {
  constructor(private authService:AuthenticationService,private router:Router){}

  model:any={
    email:'',
    password:''
  }
  errorMsg:string;
  errorFlag:boolean=false;
    
  ngOnInit(){

  }

  login(form:NgForm){
    console.log(form,"form");
    this.router.navigateByUrl('/dashboard/notification');
  //  this.authService.login(this.model)
  //  .subscribe(
  //    data=>{
  //      console.log(data)
  //       localStorage.setItem("loggedInUser",JSON.stringify(data));
  //       if(!data.success){
  //         this.errorFlag=true;
  //           this.errorMsg=data.message;
           
  //       }else{
  //         console.log("naviage")
  //         this.router.navigateByUrl('/dashboard');
  //       }
  //    },
  //    error=>console.log(error)
  //  )
  }

}