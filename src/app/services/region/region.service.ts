import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RegionService {
  apiBaseUrl='https://1tzyvxi01f.execute-api.us-east-1.amazonaws.com/dev';
  region=`${this.apiBaseUrl}/region-names`;
  ridingNames=`${this.apiBaseUrl}/riding-names?region_id=`;
  ridingByRegionRiding=`${this.apiBaseUrl}/riding?`;
  callerList=`${this.apiBaseUrl}/callers-list`;

  constructor(private http: HttpClient) {}

  getRegions(): Observable<any> {
    // return this.http.get(
    //   `https://sodn7u9415.execute-api.us-east-1.amazonaws.com/local/manitoba2023/candidates?district=69`
    // );
    return this.http.get<any>(`${this.region}`);
  }
  getCallerList(): Observable<any>{
    return this.http.get<any>(`${this.callerList}`);
  }
  getRidingNames(regionId): Observable<any> {
    // return this.http.get(
    //   `https://sodn7u9415.execute-api.us-east-1.amazonaws.com/local/manitoba2023/candidates?district=69`
    // );
    return this.http.get<any>(`${this.ridingNames+regionId}`);
  }
  getRidingByRegionRiding(ridingId,regionId): Observable<any> {
    // return this.http.get(
    //   `https://sodn7u9415.execute-api.us-east-1.amazonaws.com/local/manitoba2023/candidates?district=69`
    // );
    return this.http.get<any>(`${this.ridingByRegionRiding+`riding_id=`+ridingId+`&region_id=`+regionId}`);
  }
}
