import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ApplicationService} from '../../../../services/application/application.service';

@Component({
  selector: 'app-call-cancel-submit-modal',
  templateUrl: './call-cancel-submit-modal.component.html',
  styleUrls: ['./call-cancel-submit-modal.component.scss']
})
export class CallCancelSubmitModalComponent implements OnInit {
  appliedThemeClass = '';

  constructor(public applicationService: ApplicationService,
              public dialogRef: MatDialogRef<CallCancelSubmitModalComponent>,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data) {

  }

  ngOnInit(): void {
    this.applicationService.getDarkMode().subscribe(isDarkMode => {
      this.appliedThemeClass = isDarkMode!== undefined && !isDarkMode ? 'app-dark-mode' : '';
    });
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

  onOkClick(): void {
    if(this.data.type=="SubmitCallAlert"){
      this.dialogRef.close();
    }
    else{
      this.dialog.closeAll();
    }
  }
}

