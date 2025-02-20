import {Component, OnInit} from '@angular/core';
import {debounceTime, Observable, switchMap} from "rxjs";
import {FormControl} from "@angular/forms";
import { OlaMaps } from 'olamaps-web-sdk'
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
  olaMaps = new OlaMaps({
    apiKey: 'qOmAe8G8Tbky3bmGXYNM1SwmNyFoC5Oy9T5KW9a4',
  })
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
    /*const map = new mappls.Map('map', {center: [lat, lng]});*/
    const map =
    this.olaMaps.init({
      style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
      container: 'map',
      center: [lng, lat],
      zoom: 16,
    })
    //map.setZoom(17);

    // @ts-ignore
    /*const marker = new mappls.Marker({
      map: map,
      position: {lat, lng}
    });*/
    const olaIcon = document.createElement('div')
    olaIcon.classList.add('olalogo');

    this.olaMaps
        .addMarker({ element: olaIcon, offset: [0, -10], anchor: 'bottom', color: 'red' })
        .setLngLat([lng, lat])
        .addTo(map)
    // @ts-ignore
    // mappls.setStyle('grey-day');
  }

  selectSuggestion(suggestion: any, event: any) {
    event.stopPropagation();

    this.initMap(suggestion.location.lat, suggestion.location.lng);
    //this.searchControl.setValue(suggestion);
  }


}
