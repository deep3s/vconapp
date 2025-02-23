import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {OlaMapsHelperService} from "./olamapshelper/ola-maps-helper.service";

@Injectable({
    providedIn: 'root'
})
export class OlaMapsService {
    private olaMapsApiBaseUrl = 'https://api.olamaps.io'
    private searchUrl = `${this.olaMapsApiBaseUrl}/places/v1/autocomplete`;
    private placeDetailsUrl = `${this.olaMapsApiBaseUrl}/places/v1/details`;
    private geocodeUrl = 'http://localhost:3000/api/places/search/json';
    private API_KEY: string = 'qOmAe8G8Tbky3bmGXYNM1SwmNyFoC5Oy9T5KW9a4';

    constructor(private http: HttpClient, private olaMapsHelperService: OlaMapsHelperService) {
    }

    getSuggestions(query: string): Observable<string[]> {
        if (!query.trim()) return new Observable<string[]>(); // Avoid unnecessary calls

        const params = new HttpParams()
            .set('input', query)
            .set('api_key', this.API_KEY); // Adjust region if needed

        return this.http.get<any>(this.searchUrl, {params}).pipe(
            map(response => response.predictions.map((location: any) => {
                    const {description, geometry, place_id} = location;

                    return {description, location: geometry.location, place_id};
                })
            )
        );
    }

    getPlaceDetails(placeId: string): Observable<{  }> {
        if (!placeId.trim()) return new Observable<string[]>(); // Avoid unnecessary calls

        const params = new HttpParams()
            .set('place_id', placeId)
            .set('api_key', this.API_KEY); // Adjust region if needed

        return this.http.get<any>(this.placeDetailsUrl, {params}).pipe(
            map(response => {
                return  {address: response?.result?.name, ...this.olaMapsHelperService
                        .simplifyAddressComponents(response?.result?.address_components)};
            })
        );
    }

    getGeocode(address: string): Observable<string[]> {
        if (!address.trim()) return new Observable<string[]>(); // Avoid unnecessary calls

        const params = new HttpParams().set('address', address); // Adjust region if needed

        return this.http.get<any>(this.geocodeUrl, {params}).pipe(
            map(response => response.copResults)
        );
    }
}
