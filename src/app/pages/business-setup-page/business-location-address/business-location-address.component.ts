import {Component, OnInit} from '@angular/core';
import {debounceTime, Observable, switchMap} from "rxjs";
import {FormControl} from "@angular/forms";
import {map, startWith} from "rxjs/operators";
import {MapplsService} from "../../../services/mappls/mappls.service";
import {OlaMapsService} from "../../../services/olamaps/olamaps.service";

@Component({
  selector: 'business-location-address',
  templateUrl: './business-location-address.component.html',
  styleUrls: ['./business-location-address.component.scss']
})
export class BusinessLocationAddressComponent implements OnInit {
  locationSearchResults: any = [];
  selectedLocation = '';

  searchControl = new FormControl('');
  options: string[] = [];
  suggestions:  Observable<any[]>;

  constructor(private mapplsService: MapplsService,
              private olaMapsService: OlaMapsService) {
  }

  ngOnInit() {
    this.initMap( 12.8886, 77.6121);

    this.suggestions = this.searchControl.valueChanges.pipe(
        debounceTime(300), // Wait 300ms after user stops typing
        switchMap(filterValue => this.olaMapsService.getSuggestions(filterValue || ''))
    )
  }

  initMap(lat:number, lng:number) {
    // @ts-ignore
    const map = new mappls.Map('map', {center: [lat, lng]});
    map.setZoom(20);
    // @ts-ignore
    mappls.setStyle('grey-day');
  }

  selectSuggestion(suggestion: any, event: any) {
    event.stopPropagation();

    this.initMap(suggestion.location.lat, suggestion.location.lng);
    //this.searchControl.setValue(suggestion);
  }


}
