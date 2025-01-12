import {AfterViewInit, Component, HostListener, Inject, OnInit, Pipe, PipeTransform} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApplicationService} from '../../../services/application/application.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-image-locked-modal',
  templateUrl: './logout-modal.component.html',
  styleUrls: ['./logout-modal.component.scss']
})
export class LogoutModalComponent implements OnInit, AfterViewInit {
  roles = [
    {id: 'Yes', name: 'Yes'},
    {id: 'No', name: 'No'},
  ];
  userForm: FormGroup;
  submitted = false;
  appliedThemeClass = '';

  constructor(private formBuilder: FormBuilder,
              public applicationService: ApplicationService,
              public router: Router,
              public dialogRef: MatDialogRef<LogoutModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
    // console.log(data);
  }

  ngAfterViewInit() {

  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      title: [{value: '',}],
      fileName: [{value: '', disabled: true}],
      description: [{value: '', }],
      assetDate: [{value: '', }],
      subject: [{value: '', disabled: true}],
    });
    if (this.data) {
      this.userForm.patchValue({
        title: this.data.title,
        fileName: this.data.fileName,
        description: this.data.description,
        assetDate: new FormControl(this.data.date),
        subject: 'THE V-CUT SALON & SPA',
      });
    }

    this.applicationService.getDarkMode().subscribe(isDarkMode => {
      this.appliedThemeClass = isDarkMode!== undefined && !isDarkMode ? 'app-dark-mode' : '';
    });
  }

  // convenience getter for easy access to form fields
  get fmp(): any {
    return this.userForm.controls;
  }

  onSubmitPhotoProfile() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }

    this.applicationService.setUser({...this.userForm.getRawValue(),  id: this.data.id});
    this.dialogRef.close();

    /*this.toastr.success('<span>' +
       '<i class="icofont icofont-check-circled pr-2"></i>' +
       'Successfully updated the role' +
       '</span>', '',
       {
         closeButton: true,
         enableHtml: true
       }
     );*/

    return true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  logout(): void {
    this.applicationService.setLoggedIn(false);
    this.dialogRef.close();
    this.router.navigateByUrl('/login');
  }
}
