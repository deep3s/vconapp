import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BusinessSetupService} from "../../services/business-setup/business-setup.service";

@Component({
  selector: 'app-customer-login-page',
  templateUrl: './customer-login-page.component.html',
  styleUrls: ['./customer-login-page.component.scss']
})
export class CustomerLoginPageComponent {
  loginWithFacebook() {
    window.location.href = 'https://www.facebook.com/login.php';
  }

  loginWithGoogle() {
    window.location.href = 'https://accounts.google.com/signin';
  }

  constructor(private formBuilder: FormBuilder,
              private businessSetupService: BusinessSetupService) {
    // console.log(data);
  }

  businessDetailsForm: FormGroup;

  get fmp(): any {
    return this.businessDetailsForm.controls;
  }
  submitted = false;

  ngOnInit(): void {
    this.businessDetailsForm = this.formBuilder.group({
      emailId: [],
    });
  }
}
