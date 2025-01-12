import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {ElectionService} from "../election/election.service";

@Injectable({
  providedIn: "root",
})
export class UnelectedService {
  apiBaseUrl='https://1tzyvxi01f.execute-api.us-east-1.amazonaws.com/dev';
  undecidedRidings=`${this.apiBaseUrl}/riding-summary`;
  electionCallActions=`${this.apiBaseUrl}/election-actions/call`
  electionKillActions=`${this.apiBaseUrl}/election-actions/kill`
  electionReconsiderActions=`${this.apiBaseUrl}/election-actions/reconsider`
  constructor(private http: HttpClient, public electionService: ElectionService) {}

  getRidings(): Observable<any> {
    return this.http.get(
      `https://sodn7u9415.execute-api.us-east-1.amazonaws.com/local/manitoba2023/district-votes`
    );
  }

  getVotingDetails(): Observable<any> {
    return this.http.get(
      `https://sodn7u9415.execute-api.us-east-1.amazonaws.com/dev/manitoba2023/parties`
    );
  }
  getUndecidedCalledRidings(liveData): Observable<any> {
    return this.http.get<any>(`${this.undecidedRidings+(liveData? '?live_data='+liveData : '')}`);
  }

  updateElectionCallActions(data:any|object): Observable<any> {
    data.election_id = this.electionService.getElectionId();
    return this.http.post<any>(`${this.electionCallActions}`,data);
  }

  updateElectionKilledActions(data:any|object): Observable<any> {
    data.election_id = this.electionService.getElectionId();
    return this.http.post<any>(`${this.electionKillActions}`,data);
  }

  updateElectionReconsiderActions(data:any|object): Observable<any> {
    data.election_id = this.electionService.getElectionId();
    return this.http.post<any>(`${this.electionReconsiderActions}`,data);
  }
}
