import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApplicationService } from '../../../../services/application/application.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-table-legend-modal',
  templateUrl: './table-legend-modal.component.html',
  styleUrls: ['./table-legend-modal.component.scss']
})
export class TableLegendModalComponent implements OnInit {
  appliedThemeClass = '';
  userForm: FormGroup;
  //isReadonly: boolean = true; 
  constructor(
    private formBuilder: FormBuilder,
    public applicationService: ApplicationService,
    public dialogRef: MatDialogRef<TableLegendModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) { debugger;}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      party: [{value: ''}],
      ridingName: [{value: ''}],
      reported_polls:[{value: ''}],
      total_polls:[{value: ''}],
      percentage_reported: [{value: ''}],
      status: [{value: '' }],
      margin: [{value: ''}],
      lastReport: [{value: ''}],
    });
    if (this.data) {
      this.userForm.patchValue({
        party: '',
        ridingName: '',
        reported_polls:'',
        total_polls:'',
        percentage_reported: '',
        status: '',
        margin:'',
        lastReport: '',
      });
    }
    this.applicationService.getDarkMode().subscribe(isDarkMode => {
      this.appliedThemeClass = isDarkMode !== undefined && !isDarkMode ? 'app-dark-mode' : '';
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkCall() {
    this.dialogRef.close();
  }
}
