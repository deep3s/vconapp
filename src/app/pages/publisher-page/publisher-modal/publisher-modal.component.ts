import {AfterViewInit, Component, HostListener, Inject, OnInit, Pipe, PipeTransform} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApplicationService} from '../../../services/application/application.service';
import {ImageLockedModalComponent} from "../image-locked-modal/image-locked-modal.component";
import {SavePublishConfirmationModalComponent} from "../save-confirmation-modal/save-confirmation-modal.component";

@Component({
  selector: 'app-user-modal',
  templateUrl: './publisher-modal.component.html',
  styleUrls: ['./publisher-modal.component.scss']
})
export class PublisherModalComponent implements OnInit, AfterViewInit {
  roles = [
    {id: 'Yes', name: 'Yes'},
    {id: 'No', name: 'No'},
  ];
  userForm: FormGroup;
  submitted = false;
  appliedThemeClass = '';

  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog,
              public applicationService: ApplicationService,
              public dialogRef: MatDialogRef<PublisherModalComponent>,
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
    const dialogRef = this.dialog.open(SavePublishConfirmationModalComponent, {
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
