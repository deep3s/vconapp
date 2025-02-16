import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class MapplsService {


    private apiUrl = 'http://localhost:3000/api/places/search';
    private accessToken = 'a80aa7bf-0471-453e-b3b0-9bee38ae301e'; // Replace with your token

    constructor(private http: HttpClient) {}

    getSuggestions(query: string): Observable<string[]> {
        if (!query.trim()) return new Observable<string[]>(); // Avoid unnecessary calls

        const params = new HttpParams().set('query', query); // Adjust region if needed

        return this.http.get<any>(this.apiUrl, { params }).pipe(
            map(response => response.suggestedLocations.map((location: any) => location.placeName + ' - ' + location.placeAddress))
        );
    }
}
