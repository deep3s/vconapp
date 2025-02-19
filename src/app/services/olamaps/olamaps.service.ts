import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class OlaMapsService {
    private searchUrl = 'https://api.olamaps.io/places/v1/autocomplete';
    private geocodeUrl = 'http://localhost:3000/api/places/search/json';
    private API_KEY: string = 'qOmAe8G8Tbky3bmGXYNM1SwmNyFoC5Oy9T5KW9a4';

    constructor(private http: HttpClient) {
    }

    getSuggestions(query: string): Observable<string[]> {
        if (!query.trim()) return new Observable<string[]>(); // Avoid unnecessary calls

        const params = new HttpParams()
            .set('input', query)
            .set('api_key', this.API_KEY); // Adjust region if needed

        return this.http.get<any>(this.searchUrl, {params}).pipe(
            map(response => response.predictions.map((location: any) => {
                    const {description, geometry} = location;

                    return {description, location: geometry.location};
                })
            )
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
