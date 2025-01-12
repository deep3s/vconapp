import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApplicationService } from '../../../services/application/application.service';
import { CallCancelSubmitModalComponent } from "../../election-reporting-system-page/call-election/call-cancel-submit-modal/call-cancel-submit-modal.component";
import { PARTIES } from '../../../shared/parties-constants';
import { ALERT_CONSTANTS } from 'src/app/shared/constants';

@Component({
  selector: 'app-edit-record-model',
  templateUrl: './edit-record-model.component.html',
  styleUrls: ['./edit-record-model.component.scss']
})
export class EditRecordModelComponent implements OnInit, AfterViewInit {

  appliedThemeClass = '';
  title: string;
  // candidate
  allParties: any;
  selectedParty: any; // Ensure this is a number
  candidateName: string;

  //Caller
  callerName: string;

  //Party
  partyName: string;
  selectedPartyColor: any = '';
  partyColor: string;

  constructor(
    public dialog: MatDialog,
    public applicationService: ApplicationService,
    public dialogRef: MatDialogRef<EditRecordModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngAfterViewInit() {

  }

  ngOnInit(): void {
    this.title = this.data.title;
    if (this.title == "Candidate") {
      this.allParties = PARTIES.partiesDropDown;
      this.candidateName = this.data.selecteRecord.name;
      // Find the party object
      const selectedPartyObject = this.allParties.find(party => party.name === this.data.selecteRecord.party);
      // Set `selectedParty` to the ID of the selected party
      if (selectedPartyObject) {
        this.selectedParty = selectedPartyObject.name;
      }
    }
    else if (this.title == "Caller") {
      this.callerName = this.data.selecteRecord.name;
    }
    else if(this.title =="Party"){
      this.partyName = this.data.selecteRecord.name;
      this.selectedPartyColor= this.data.selecteRecord.color;
    }

    this.applicationService.getDarkMode().subscribe(isDarkMode => {
      this.appliedThemeClass = isDarkMode !== undefined && !isDarkMode ? 'app-dark-mode' : '';
    });
  }


  saveEditCandidate() {
    var updatedData = this.data.selecteRecord;
    updatedData.name = this.candidateName;
    updatedData.party = this.selectedParty;
    this.dialogRef.close(updatedData);
  }

  saveEditCaller() {
    var updatedData = this.data.selecteRecord;
    updatedData.name = this.callerName;
    this.dialogRef.close(updatedData);
  }

  saveEditParty() {
    var updatedData = this.data.selecteRecord;
    updatedData.name = this.partyName;
    updatedData.color = this.selectedPartyColor;
    this.dialogRef.close(updatedData);
  }

  cancelEdit(): void {

    if (this.title == "Candidate") {
      if(this.data.selecteRecord.name==this.candidateName && this.data.selecteRecord.party==this.selectedParty){
        this.dialogRef.close(false);
      }
      else{
        this.dialog.open(CallCancelSubmitModalComponent, {
          width: '500px',
          disableClose: true, 
          data: {
            message: ALERT_CONSTANTS.cancelAlertText,
            type: "Cancel",
            title: "Alert"
          }
        });
      }
    }
    else if (this.title == "Caller") {
      if(this.callerName == this.data.selecteRecord.name){
        this.dialogRef.close(false);
      }
      else{
        this.dialog.open(CallCancelSubmitModalComponent, {
          width: '500px',
          disableClose: true, 
          data: {
            message: ALERT_CONSTANTS.cancelAlertText,
            type: "Cancel",
            title: "Alert"
          }
        });
      }
    }
    else if(this.title =="Party"){
      if(this.partyName == this.data.selecteRecord.name && this.selectedPartyColor== this.data.selecteRecord.color){
        this.dialogRef.close(false);
      }
      else{
        this.dialog.open(CallCancelSubmitModalComponent, {
          width: '500px',
          disableClose: true, 
          data: {
            message: ALERT_CONSTANTS.cancelAlertText,
            type: "Cancel",
            title: "Alert"
          }
        });
      }
    }

    //this.dialogRef.close(false);    
  }
}