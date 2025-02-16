import {Component, OnInit} from '@angular/core';
import {debounceTime, Observable, switchMap} from "rxjs";
import {FormControl} from "@angular/forms";
import {map, startWith} from "rxjs/operators";
import {MapplsService} from "../../../services/mappls/mappls.service";

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

  constructor(private mapplsService: MapplsService) {
  }

  ngOnInit() {
    /*this.suggestions = this.searchControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || ''))
    );
*/
    this.suggestions = this.searchControl.valueChanges.pipe(
        debounceTime(300), // Wait 300ms after user stops typing
        switchMap(filterValue => this.mapplsService.getSuggestions(filterValue || ''))
    )
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.mapplsService.getSuggestions(filterValue).subscribe((data: any) => {
      this.locationSearchResults = data;
    })
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  selectSuggestion(suggestion: any) {
    this.searchControl.setValue(suggestion);
  }


}
