import { Component, Inject, OnInit } from "@angular/core";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { Router } from "@angular/router";
import { ApplicationService } from "../../services/application/application.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RedirectRequest } from "@azure/msal-browser";
import {
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
  MsalService,
} from "@azure/msal-angular";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent implements OnInit {
  isLoginContainer = true;
  submitted = false;
  submittedFp = false;
  userForm: FormGroup;
  fpForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private ngxService: NgxUiLoaderService,
    public router: Router,
    public applicationService: ApplicationService
  ) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      password: ["", Validators.required],
      email: ["", Validators.required],
    });
    this.fpForm = this.formBuilder.group({
      email: ["", Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get fmp(): any {
    return this.userForm.controls;
  }

  // convenience getter for easy access to form fields
  get fpc(): any {
    return this.fpForm.controls;
  }

  onSubmitUserProfile() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {
      //return;
    }

    /*this.toastr.success('<span>' +
       '<i class="icofont icofont-check-circled pr-2"></i>' +
       'Successfully updated the role' +
       '</span>', '',
       {
         closeButton: true,
         enableHtml: true
       }
     );*/

    this.login();
  }

  onSubmitfp() {
    this.submittedFp = true;

    // stop here if form is invalid
    if (this.fpForm.invalid) {
      return;
    }

    /*this.toastr.success('<span>' +
       '<i class="icofont icofont-check-circled pr-2"></i>' +
       'Successfully updated the role' +
       '</span>', '',
       {
         closeButton: true,
         enableHtml: true
       }
     );*/

    this.goToLogin();
  }

  login() {
    this.ngxService.startLoader("loader-login-container");

    setTimeout(() => {
      this.ngxService.stopLoader("loader-login-container");
      this.applicationService.setLoggedIn(true);
      this.router.navigateByUrl("/home");
    }, 1000);
  }

  goToLogin() {
    this.isLoginContainer = true;
  }

  loginRedirect() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({
        ...this.msalGuardConfig.authRequest,
      } as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }

  goToForgotPassword() {
    this.isLoginContainer = false;
  }
}
