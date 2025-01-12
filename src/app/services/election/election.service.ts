import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ElectionService {
  apiBaseUrl='https://1tzyvxi01f.execute-api.us-east-1.amazonaws.com/dev';
  electionList=`${this.apiBaseUrl}/elections-list`;
  electionId = 'MB23';
  constructor(private http: HttpClient) { }
  getElectionsList(): Observable<any> {
    return this.http.get<any>(`${this.electionList}`);
  }

  getElectionId() {
    return this.electionId;
  }

  setElectionId(electionId) {
    this.electionId = electionId;
  }
}
