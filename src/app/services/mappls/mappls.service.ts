import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class MapplsService {


    private searchUrl = 'http://localhost:3000/api/places/search/json';
    private geocodeUrl = 'http://localhost:3000/api/places/search/json';

    constructor(private http: HttpClient) {}

    getSuggestions(query: string): Observable<string[]> {
        if (!query.trim()) return new Observable<string[]>(); // Avoid unnecessary calls

        const params = new HttpParams().set('query', query); // Adjust region if needed

        return this.http.get<any>(this.searchUrl, { params }).pipe(
            map(response => response.suggestedLocations.map((location: any) => location))
        );
    }

    getGeocode(address: string): Observable<string[]> {
        if (!address.trim()) return new Observable<string[]>(); // Avoid unnecessary calls

        const params = new HttpParams().set('address', address); // Adjust region if needed

        return this.http.get<any>(this.geocodeUrl, { params }).pipe(
            map(response => response.copResults)
        );
    }
}
