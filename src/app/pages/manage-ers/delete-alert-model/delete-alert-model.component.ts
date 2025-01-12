import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ApplicationService} from '../../../services/application/application.service';

@Component({
  selector: 'app-delete-alert-model',
  templateUrl: './delete-alert-model.component.html',
  styleUrls: ['./delete-alert-model.component.scss']
})
export class DeleteAlertModelComponent implements OnInit {
  appliedThemeClass = '';

  constructor(public applicationService: ApplicationService,
              public dialogRef: MatDialogRef<DeleteAlertModelComponent>,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data) {

  }

  ngOnInit(): void {
    this.applicationService.getDarkMode().subscribe(isDarkMode => {
      this.appliedThemeClass = isDarkMode!== undefined && !isDarkMode ? 'app-dark-mode' : '';
    });
  }
  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

  onOkClick(): void {
    this.dialogRef.close(true);
  }
}

