import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ElectionService} from "../election/election.service";

@Injectable({
    providedIn: 'root'
})
export class OverviewService {
    baseUrl = 'https://sodn7u9415.execute-api.us-east-1.amazonaws.com/dev/manitoba2023';
    apiBaseUrl='https://1tzyvxi01f.execute-api.us-east-1.amazonaws.com/dev';
    districtVotes = `${this.baseUrl}/district-votes`;
    districts = `${this.baseUrl}/districts`;
    electCandidate = `${this.baseUrl}/elected`
    partiesUrl = `${this.baseUrl}/parties`;
    ridingNames=`${this.apiBaseUrl}/riding-names?region_id=`;
    riding=`${this.apiBaseUrl}/riding?riding_id=`;
    electionSummaryUrl=`${this.apiBaseUrl}/election-summary`;
    ridingAll=`${this.apiBaseUrl}/riding-names`;
    constructor(private http: HttpClient, public electionService: ElectionService) {
    }

    getOverviewData(): Observable<any>{
       return this.http.get<any>(`${this.electionSummaryUrl}`);

    }
    getLiveOverviewData(liveData): Observable<any>{
        return this.http.get<any>(`${this.electionSummaryUrl+'?live_data='+liveData}`);

     }
    getRidingNames(regionId: string | number,callerEmail): Observable<any>{
        return this.http.get<any>(this.ridingNames+regionId,{headers: new HttpHeaders({ 'CALLER-EMAIL': callerEmail})});
    }
    // getAllRidingNames(regionId: string | number): Observable<any>{
    //     return this.http.get<any>(`${this.ridingNames+regionId}`);
    // }
    getAllRidingNames(): Observable<any>{
        return this.http.get<any>(`${this.ridingAll}`);
    }
    getRidingById(id: string | number): Observable<any>{
        return this.http.get(`${this.riding+id}`);
    }
    getRidings(regionId: string | number,ridingId: string | number): Observable<any>{
        return this.http.get(`${this.riding+ridingId+'&region_id='+regionId}`);
    }

    getRidingsLiveData(regionId: string | number,ridingId: string | number): Observable<any>{
        return this.http.get(`${this.riding+ridingId+'&region_id='+regionId+'&live_data=true'}`);
    }
    getParties(): Observable<any> {
        return this.http.get(`${this.partiesUrl}`);
    }

    getDistrictVotes(): Observable<any> {
        return this.http.get(`${this.districtVotes}`);
    }

    getAllDistricts(): Observable<any> {
        return this.http.get(`${this.districts}`);
    }

    postElected(data): Observable<any> {
        return this.http.post(`${this.electCandidate}`, {}, {
            params: data
        });
    }

    saveDistrict(id, data): Observable<any> {
        return this.http.post(`${this.districts}`, data, {
            params: {
                district_id: id
            }
        });
    }
}
