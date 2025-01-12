import {AfterViewInit, Component, HostListener, Inject, OnInit, Pipe, PipeTransform} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApplicationService} from '../../../services/application/application.service';

@Component({
  selector: 'app-save-confirmation-modal',
  templateUrl: './save-confirmation-modal.component.html',
  styleUrls: ['./save-confirmation-modal.component.scss']
})
export class SavePublishConfirmationModalComponent {
  roles = [
    {id: 'Yes', name: 'Yes'},
    {id: 'No', name: 'No'},
  ];
  userForm: FormGroup;
  submitted = false;
  appliedThemeClass = '';

  constructor(public dialogRef: MatDialogRef<SavePublishConfirmationModalComponent>,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data) {
    // console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialog.closeAll();
  }
}
