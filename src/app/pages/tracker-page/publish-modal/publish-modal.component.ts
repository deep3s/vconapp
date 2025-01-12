import {AfterViewInit, Component, HostListener, Inject, OnInit, Pipe, PipeTransform} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApplicationService} from '../../../services/application/application.service';

@Component({
  selector: 'app-publish-modal',
  templateUrl: './publish-modal.component.html',
  styleUrls: ['./publish-modal.component.scss']
})
export class PublishModalComponent implements OnInit, AfterViewInit {
  roles = [
    {id: 'Yes', name: 'Yes'},
    {id: 'No', name: 'No'},
  ];
  userForm: FormGroup;
  submitted = false;
  appliedThemeClass = '';

  constructor(private formBuilder: FormBuilder,
              public applicationService: ApplicationService,
              public dialogRef: MatDialogRef<PublishModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
    // console.log(data);
  }

  ngAfterViewInit() {

  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      title: [{value: '',}],
      fileName: [{value: '', disabled: true}],
      description: [{value: '',}],
      assetDate: [{value: '',}],
      subject: [{value: '', disabled: true}],
    });
    if (this.data) {
      this.userForm.patchValue({
        title: this.data.title,
        fileName: this.data.fileName,
        description: this.data.description,
        assetDate: this.data.date,
        subject: this.data.subject,
      });
    }

    this.applicationService.getDarkMode().subscribe(isDarkMode => {
      this.appliedThemeClass = isDarkMode !== undefined && !isDarkMode ? 'app-dark-mode' : '';
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

    this.applicationService.setTogglePublish({published: true, article: this.data.article});
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
    this.applicationService.setTogglePublish({published: false, article: this.data.article});
  }
}
