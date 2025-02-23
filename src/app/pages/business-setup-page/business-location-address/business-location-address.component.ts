import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {debounceTime, Observable, switchMap} from "rxjs";
import {FormControl} from "@angular/forms";
import {OlaMaps} from 'olamaps-web-sdk'
import {OlaMapsService} from "src/app/services/olamaps/olamaps.service";
import {MatDialog} from "@angular/material/dialog";
import {EditLocationComponent} from "../edit-location/edit-location.component";
import {EditBillingDetailsComponent} from "../edit-billing-details/edit-billing-details.component";


@Component({
    selector: 'business-location-address',
    templateUrl: './business-location-address.component.html',
    styleUrls: ['./business-location-address.component.scss']
})
export class BusinessLocationAddressComponent implements OnInit {
    @Input() businessBillingDetails: any;
    @Output() locationAddressSaved: EventEmitter<any> = new EventEmitter();
    @Output() locationBillingSaved: EventEmitter<any> = new EventEmitter();
    selectedLocationDetails: any = null;
    isAddressAvailable = false;
    olaMaps = new OlaMaps({
        apiKey: 'qOmAe8G8Tbky3bmGXYNM1SwmNyFoC5Oy9T5KW9a4',
    })
    searchControl = new FormControl('');
    options: string[] = [];
    suggestions: Observable<any[]>;

    constructor(public dialog: MatDialog,
                private olaMapsService: OlaMapsService) {
    }

    ngOnInit() {
        this.suggestions = this.searchControl.valueChanges.pipe(
            debounceTime(300), // Wait 300ms after user stops typing
            switchMap(filterValue => this.olaMapsService.getSuggestions(filterValue || ''))
        )
    }

    openEditAddressModal(): void {
        const editAddressDialogRef = this.dialog.open(EditLocationComponent, {
            width: '700px',
            data: this.selectedLocationDetails
        });

        editAddressDialogRef.afterClosed().subscribe(result => {
            if (result?.locationDetails) {
                this.selectedLocationDetails = {...result?.locationDetails};
                this.saveDataToBusinessSetupPage();
            }
        });
    }

    saveDataToBusinessSetupPage(): void {
        this.locationAddressSaved.emit(this.selectedLocationDetails);
        this.locationBillingSaved.emit(this.businessBillingDetails);
    }

    openEditBillingDetailsModal(): void {
        const editBillingDetailsDialogRef = this.dialog.open(EditBillingDetailsComponent, {
            width: '700px',
            data: this.businessBillingDetails
        });

        editBillingDetailsDialogRef.afterClosed().subscribe(result => {
            if (result?.billingDetails) {
                this.businessBillingDetails = {...result.businessBillingDetails};
                this.saveDataToBusinessSetupPage();
            }
        });
    }

    initMap(lat: number, lng: number) {
        const map =
            this.olaMaps.init({
                style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
                container: 'map',
                center: [lng, lat],
                zoom: 16,
            })
        const olaIcon = document.createElement('div')
        olaIcon.classList.add('olalogo');

        this.olaMaps
            .addMarker({element: olaIcon, offset: [0, -10], anchor: 'bottom', color: 'red'})
            .setLngLat([lng, lat])
            .addTo(map)
    }

    selectSuggestion(suggestion: any, event: any) {
        event.stopPropagation();

        this.searchControl.setValue(suggestion.description);

        this.getPlaceDetails(suggestion);
    }

    getPlaceDetails(suggestion: any) {
        this.olaMapsService.getPlaceDetails(suggestion.place_id).pipe().subscribe((placeDetails: any) => {
            this.selectedLocationDetails = {...placeDetails, description: suggestion.description};
            this.businessBillingDetails = {
                ...this.businessBillingDetails??{},
                address: placeDetails.address,
                apt: placeDetails.apt,
                city: placeDetails.city,
                state: placeDetails.state,
                postCode: placeDetails.postCode
            };
            this.isAddressAvailable = true;
            setTimeout(() => {
                this.initMap(suggestion.location.lat, suggestion.location.lng);
            }, 100);
            this.saveDataToBusinessSetupPage();

        });
    }


}
