<<<<<<< HEAD
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
   this.authService.login(this.model)
   .subscribe(
     data=>{
       console.log(data)
        localStorage.setItem("loggedInUser",JSON.stringify(data));
        if(!data.success){
          console.log("login failed")
          this.errorFlag=true;
            this.errorMsg=data.message;
           
        }else{
          this.router.navigateByUrl('/dashboard/manageSupplier');
        }
     },
     error=>console.log(error)
   )
  }

=======
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
    console.log("ingonit")
  }

  login(form:NgForm){
   console.log("signin clicked")
   this.authService.login(this.model)
   .subscribe(
     data=>{
       console.log(data)
        localStorage.setItem("loggedInUser",JSON.stringify(data));
        if(!data.success){
          console.log("login failed")
          this.errorFlag=true;
            this.errorMsg=data.message;
           
        }else{
          this.router.navigateByUrl('/dashboard/manageSupplier');
        }
     },
     error=>console.log(error)
   )
  }

>>>>>>> 7c86996f5b43fc1ebbe208644496d402da74fde6
}