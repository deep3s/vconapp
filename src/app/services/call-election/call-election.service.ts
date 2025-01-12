import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ElectionService} from "../election/election.service";

@Injectable({
  providedIn: 'root'
})
export class CallElectionService {
  apiBaseUrl='https://1tzyvxi01f.execute-api.us-east-1.amazonaws.com/dev';
  partyfacts=`${this.apiBaseUrl}/party-facts`;
  parties=`${this.apiBaseUrl}/parties`;
  callParty=`${this.apiBaseUrl}/election-actions/call-party`

  constructor(private http: HttpClient, public electionService: ElectionService) { }
  getPartyFacts(): Observable<any> {
    return this.http.get<any>(`${this.partyfacts}`);
  }
  getParties(): Observable<any> {
    return this.http.get<any>(`${this.parties}`);
  }

  callAParty(data:any|object): Observable<any> {
    data.election_id = this.electionService.getElectionId();

    return this.http.post<any>(`${this.callParty}`,data);
  }
}
