import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CompanyAndIndustryService {
    companiesUrl = '/assets/data/company_list.json';

    constructor(private http: HttpClient) {
    }

    getCoverageCompanies(): Observable<any> {
        return this.http.get(`${this.companiesUrl}`);
    }
}
