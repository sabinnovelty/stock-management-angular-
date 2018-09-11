import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'

import { AuthenticationService } from '../../../services/authService';

@Component({
  selector: 'app-authentication',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.style.css']

})
export class AuthenticationComponent {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  returnUrl: string;
  model: any = {
    email: '',
    password: ''
  }
  errorMsg: string;
  errorFlag: boolean = false;

  e;

  ngOnInit() {
    localStorage.removeItem('loggedInUser');

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      this.router.navigate(['/dashboard']);
    } else {
      this.authService.logout();
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
  }

  login(form: NgForm) {
    console.log("signin clicked")
    this.authService.login(this.model)
      .subscribe(
        data => {
          console.log(data)
          localStorage.setItem("loggedInUser", JSON.stringify(data));
          if (!data.success) {
            console.log("login failed")
            this.errorFlag = true;
            this.errorMsg = data.message;

          } else {
            this.router.navigateByUrl('/dashboard');
          }
        },
        error => console.log(error)
      )
  }

}