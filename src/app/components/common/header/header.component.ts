import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.style.css']
     
})
export class HeaderComponent {
  constructor(
    private router: Router
  ){}
 
  ngOnInit(){
   
  }

  logout() {
    // console.log('inside logout')
    localStorage.removeItem('loggedInUser');
    this.router.navigateByUrl('/login');
  }
}