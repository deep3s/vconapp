import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApplicationService } from '../../../../services/application/application.service';
import { CallCancelSubmitModalComponent } from "../call-cancel-submit-modal/call-cancel-submit-modal.component";
import { Title } from '@angular/platform-browser';
import { ALERT_CONSTANTS } from "../../../../shared/constants";
import { CallElectionService } from 'src/app/services/call-election/call-election.service';

@Component({
  selector: 'app-call-submit-modal',
  templateUrl: './call-submit-modal.component.html',
  styleUrls: ['./call-submit-modal.component.scss']
})
export class CallSubmitModalComponent implements OnInit {
  appliedThemeClass = '';
  textareaFrench: string = '';
  textareaEnglish: string = '';
  constructor(
    public applicationService: ApplicationService,
    public dialogRef: MatDialogRef<CallSubmitModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private callElectionService: CallElectionService
  ) { }

  ngOnInit(): void {
    if(this.data.selectedCallType.type == 'Majority' || this.data.selectedCallType.type == 'Minority'){
      this.textareaEnglish= `The ${this.data.selectedParty.name} of Manitoba (PC) has won a ${this.data.selectedCallType.type} Government in the province of Manitoba`;
      this.textareaFrench =`${this.data.frenchSelectedPartyName} du Manitoba (PC) a remporté un gouvernement majoritaire dans la province du Manitoba`;
    }
    else if(this.data.selectedCallType.type == 'Elected - Majority / Minority Unknown'){
      this.textareaEnglish= `The ${this.data.selectedParty.name} of Manitoba (PC)  has won the Manitoba Election - a Majority or Minority form Government hasn't yet been determined`;
      this.textareaFrench =`${this.data.frenchSelectedPartyName}  du Manitoba (PC) a remporté les élections au Manitoba - un gouvernement majoritaire ou minoritaire n’a pas encore été déterminé`;

    }

    this.applicationService.getDarkMode().subscribe(isDarkMode => {
      this.appliedThemeClass = isDarkMode !== undefined && !isDarkMode ? 'app-dark-mode' : '';
    });
  }

  onNoClick(): void {
    //this.dialogRef.close();
    this.onCancelCall();
  }

  onCancelCall() {
    if (this.data.selectedCallType.value == "Default" || (this.data.selectedCallType.value == "Submit Call Statement" && !this.textareaEnglish && !this.textareaFrench)) {
      this.dialogRef.close();
    }
    else {
      let popupMessage = '';
      if (this.textareaEnglish && this.textareaFrench) {
        popupMessage = ALERT_CONSTANTS.cancelEnglishAndFrenchStatement;
      }
      else {
        popupMessage = this.textareaEnglish ? ALERT_CONSTANTS.cancelEnglishStatement : ALERT_CONSTANTS.cancelFrenchStatement;
      }

      this.dialog.open(CallCancelSubmitModalComponent, {
        width: '500px',
        disableClose: true, 
        data: {
          message: popupMessage,
          type: "Cancel",
          title: "Submit Call"
        }
      });
      return;
    }
  }

  onSubmitCall() {
    let popupMessage = 'Message has been submitted';
    if (this.data.selectedCallType.value == "Default" || (this.data.selectedCallType.value == "Submit Call Statement" && this.textareaEnglish && this.textareaFrench)) {
      let reqData = {
        election_id: "MB23",
        party_short_eng: this.data.selectedParty.party_short_eng,
        call_type: this.data.selectedCallType.type,
        english_call_statement: this.textareaEnglish,
        french_call_statement: this.textareaFrench
    };
      this.callElectionService.callAParty(reqData).subscribe((res)=>{
        this.dialog.open(CallCancelSubmitModalComponent, {
          width: '500px',
          disableClose: true, 
          data: {
            message: popupMessage,
            type: "SubmitCall",
            title: "Submit Call"
          }
        });
      }, err=>{
      });
     
      return;
    }
    else {
      this.dialog.open(CallCancelSubmitModalComponent, {
        width: '500px',
        disableClose: true, 
        data: {
          message: 'Please enter your call statement',
          type: "SubmitCallAlert",
          title: "Submit Call Alert"
        }
      });
      return;
    }
  }
}
