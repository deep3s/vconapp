import {  Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {BusinessSetupService} from "../../services/business-setup/business-setup.service";

@Component({
  selector: 'customer-login-page',
  templateUrl: './customer-login-page.component.html',
  styleUrls: ['./customer-login-page.component.scss']
})
export class CustomerLoginPageComponent {

  loginWithFacebook() {
    const facebookUrl = 'https://www.facebook.com/login.php?skip_api_login=1&api_key=1224875000951200&kid_directed_site=0';
    const popup = window.open(facebookUrl, 'Facebook Login', 'width=600,height=600');

    if (!popup || popup.closed || typeof popup.closed == 'undefined') {
      alert('Popup blocked! Please allow popups for this website.');
    }
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
