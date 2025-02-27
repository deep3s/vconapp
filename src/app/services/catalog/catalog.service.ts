import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  apiBaseUrl='http://localhost:8080';
  catalogUrl=`${this.apiBaseUrl}/categories`;

  constructor(private http: HttpClient) { }

  saveCatalog(catalog: any): Observable<any> {
    return this.http.post<any>(`${this.catalogUrl}`, catalog);
  }

  getAllCatalog(): Observable<any> {
    return this.http.get<any>(`${this.catalogUrl}`);
  }
}
