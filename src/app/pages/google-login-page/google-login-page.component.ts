import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'google-login-page',
  templateUrl: './google-login-page.component.html',
  styleUrls: ['./google-login-page.component.scss']
})
export class GoogleLoginPageComponent {
  constructor(private router: Router) {}

  redirectToCustomerLogin() {
    this.router.navigate(['/customer-login']);
  }
  redirectToProfessionalLogin() {
    this.router.navigate(['/professional-login']);
  }
}
