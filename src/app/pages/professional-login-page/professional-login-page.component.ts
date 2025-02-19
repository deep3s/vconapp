import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BusinessSetupService} from "../../services/business-setup/business-setup.service";

@Component({
  selector: 'professional-login-page',
  templateUrl: './professional-login-page.component.html',
  styleUrls: ['./professional-login-page.component.scss']
})
export class ProfessionalLoginPageComponent {
  loginWithFacebook() {
    window.location.href = 'https://www.facebook.com/login.php';
  }

  loginWithGoogle() {
    window.location.href = 'https://accounts.google.com/signin';
  }

  loginWithApple() {
    window.location.href = 'https://appleid.apple.com/auth/authorize?client_id=com.fresha.Business.Web&redirect_uri=https%3A%2F%2Fpartners.fresha.com&response_type=code%20id_token&scope=name%20email&response_mode=web_message&frame_id=f84e9aec-001c-4760-8f3e-4ea66b859838&m=11&v=1.5.5';
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
