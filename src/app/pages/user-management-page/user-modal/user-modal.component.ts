import {AfterViewInit, Component, HostListener, Inject, OnInit, Pipe, PipeTransform} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApplicationService} from '../../../services/application/application.service';
import {SavePublishConfirmationModalComponent} from "../../publisher-page/save-confirmation-modal/save-confirmation-modal.component";
import {SaveUserConfirmationModalComponent} from "../save-confirmation-modal/save-confirmation-modal.component";

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit, AfterViewInit {
  roles = [
    {id: 'Apple Tracker', name: 'Tracker', selected: true},
    {id: 'Photo Publisher', name: 'Publisher', selected: true},
  ];
  userForm: FormGroup;
  submitted = false;
  isAdmin = false;
  role: any = null;
  appliedThemeClass = '';

  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog,
              public applicationService: ApplicationService,
              public dialogRef: MatDialogRef<UserModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
    // console.log(data);
  }

  ngAfterViewInit() {

  }

  onRoleSelect(role: any) {
    role.selected = !role.selected;
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: [{value: '', disabled: true}],
      lastName: [{value: '', disabled: true}],
      email: [{value: '', disabled: true}],
      createdDate: [{value: '', disabled: true}],
    });
    if (this.data) {
      this.userForm.patchValue({
        firstName: this.data.firstName,
        lastName: this.data.lastName,
        email: this.data.email,
        createdDate: this.data.createdDate,
      });

      this.role = this.data.role;
    }

    this.applicationService.getDarkMode().subscribe(isDarkMode => {
      this.appliedThemeClass = isDarkMode !== undefined && !isDarkMode ? 'app-dark-mode' : '';
    });
  }

  // convenience getter for easy access to form fields
  get fmp(): any {
    return this.userForm.controls;
  }

  onSubmitUserProfile() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }

    this.applicationService.setUser({...this.userForm.getRawValue(), role: this.role, id: this.data.id});
    //this.dialogRef.close();

    /*this.toastr.success('<span>' +
       '<i class="icofont icofont-check-circled pr-2"></i>' +
       'Successfully updated the role' +
       '</span>', '',
       {
         closeButton: true,
         enableHtml: true
       }
     );*/
    const dialogRef = this.dialog.open(SaveUserConfirmationModalComponent, {
      width: '500px',
      disableClose: true, 
      data: {}
    });
    return true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
