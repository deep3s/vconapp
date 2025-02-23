
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BusinessSetupService } from "../../services/business-setup/business-setup.service";
import { Router } from "@angular/router";

declare var google: any; // Declare Google object for TypeScript

@Component({
  selector: 'customer-login-page',
  templateUrl: './customer-login-page.component.html',
  styleUrls: ['./customer-login-page.component.scss']
})

export class CustomerLoginPageComponent implements OnInit {
  businessDetailsForm: FormGroup;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private businessSetupService: BusinessSetupService,
      private router: Router
  ) {}

  get fmp(): any {
    return this.businessDetailsForm.controls;
  }

  ngOnInit(): void {
    this.businessDetailsForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.email]], // Added validation
    });

    this.renderGoogleButton();
  }



  loginWithFacebook() {
    const facebookUrl = 'https://www.facebook.com/login.php?skip_api_login=1&api_key=1224875000951200&kid_directed_site=0';
    const popup = window.open(facebookUrl, 'Facebook Login', 'width=600,height=600');

    if (!popup || popup.closed || typeof popup.closed == 'undefined') {
      alert('Popup blocked! Please allow popups for this website.');
    }
  }

  loginWithGoogle() {
    if (typeof google !== 'undefined') {
      google.accounts.id.prompt(); // Show Google One Tap prompt
    } else {
      console.error("Google API not loaded.");
    }
  }

  renderGoogleButton() {
    if (typeof google !== 'undefined') {
      google.accounts.id.initialize({
        client_id: '263680801426-6t07sfmmjhfc9trm280cmbp68r569sss.apps.googleusercontent.com', // Replace with your actual Google Client ID
        callback: this.handleCredentialResponse.bind(this)
      });

      setTimeout(() => {
        const googleButton = document.getElementById('googleLoginButton');
        if (googleButton) {
          google.accounts.id.renderButton(googleButton, {
            theme: 'outline',
            size: 'large',
            text: 'continue_with', // This changes the text to "Continue with Google"
          });
        }
      }, 500); // Ensure the button renders properly
    } else {
      console.error("Google API not loaded.");
    }
  }


  handleCredentialResponse(response: any) {
    console.log('Google Login Response:', response);

    const token = response.credential;
    const user = this.parseJwt(token);
    console.log('User Info:', user);

    if (user) {
      this.router.navigate(['/dashboard']);
    } else {
      console.error("Invalid Google token");
    }
  }


  parseJwt(token: string) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error('Invalid token format:', e);
      return null;
    }
  }

}
