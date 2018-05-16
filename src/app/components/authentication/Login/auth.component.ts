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
  loginError:string;
    
  ngOnInit(){
   
  }

  login(form:NgForm){
   this.authService.login(this.model)
   .subscribe(
     data=>{
       console.log(data)
        localStorage.setItem("loggedInUser",data);
        if(!data.success){
            this.loginError=data.message;
        }else{
          this.router.navigateByUrl('/dashboard');
        }
     },
     error=>console.log(error)
   )
  }

}