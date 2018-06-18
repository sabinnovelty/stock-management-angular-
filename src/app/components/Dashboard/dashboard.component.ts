import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';



@Component({
    selector: 'app-dashboard',
    templateUrl:'./dashboard.component.html',
    styleUrls:['./dashboard.component.style.css']
     
})
export class DashboardComponent {
  constructor(){}

  
    
  ngOnInit(){
   
  }

  supplierrDetails(){
    console.log("supplier details")
  }


}