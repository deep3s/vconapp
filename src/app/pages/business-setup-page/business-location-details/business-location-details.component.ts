import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MANAGE_SETTINGS_CONSTANTS} from "src/app/shared/manageSetting-constants";
import {BusinessSetupService} from "src/app/services/business-setup/business-setup.service";
import {phoneNumberValidator} from "src/app/core/validators/phone-number-validator";


@Component({
    selector: 'business-location-details',
    templateUrl: './business-location-details.component.html',
    styleUrls: ['./business-location-details.component.scss']
})
export class BusinessLocationDetailsComponent implements OnInit {
    @Input() locationInfo:any = {};
    @Output() locationBasicsSaved = new EventEmitter();

    businessLocationForm: FormGroup;
    submitted = false;

    warning_1: any = MANAGE_SETTINGS_CONSTANTS.Warning_1
    warning_2: any = MANAGE_SETTINGS_CONSTANTS.Warning_2

    selectedWarning1: any = {};
    selectedWarning2: any = {};

    constructor(private formBuilder: FormBuilder,
                private businessSetupService: BusinessSetupService) {
        // console.log(data);
    }

    ngOnInit(): void {
        this.businessLocationForm = this.formBuilder.group({
            businessLocName: ['',  [Validators.required]],
            locContactLink: ['',  [Validators.required, phoneNumberValidator]],
            locEmailLink: ['',  [Validators.required, Validators.email]],
        });

        if (this.locationInfo.businessLocName){
            this.businessLocationForm.patchValue(this.locationInfo)
        }
    }

    // convenience getter for easy access to form fields
    get fmp(): any {
        return this.businessLocationForm.controls;
    }


    onSubmitBusinessLocation() {
        this.submitted = true;

        if (this.businessLocationForm.valid) {
            this.locationBasicsSaved.emit(this.businessLocationForm.value);
        }
    }

}
