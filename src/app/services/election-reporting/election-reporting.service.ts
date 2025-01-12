import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

export interface IElectionReportingTiles {
  pollCard?: {
    polls?: string;
    totalPolls?: string;
    title?: string;
    percentage?: string;
    isIconShow?: boolean;
    iconName?: string;
    iconColor?: string;
    pollPercentage: number;
    progressBarBackgroundColor?: string;
    progressBarColor?: string;
  };
  leaderCard?: {
    title?: string;
    percentage?: string;
    buttonLabel?: string;
    elLabel?: string;
    allLeaderCard?: string;
  };
  statusCard?: {
    status?: string;
    buttonLabel?: string;
    icon?: string;
  };
  ridingCard?: {
    ridings?: string;
    totalRidings?: string;
    title?: string;
    percentage?: string;
    isIconShow?: boolean;
    iconName?: string;
    iconColor?: string;
    ridingPercentage: number;
    progressBarBackgroundColor?: string;
    progressBarColor?: string;
    seats?:string
  };
}

@Injectable({
  providedIn: "root",
})
export class ElectionReportingService {
  private liveElectionSummarySubject = new BehaviorSubject<any>({});
  private electionSummarySubject = new BehaviorSubject<any>({});
  private selectedGroupCallerSubject = new BehaviorSubject<any>({});
  apiBaseUrl='https://1tzyvxi01f.execute-api.us-east-1.amazonaws.com/dev';
  callerList=`${this.apiBaseUrl}/callers-list`;

  private dataSubject = new BehaviorSubject<IElectionReportingTiles>({
    pollCard: undefined,
    leaderCard: undefined,
    statusCard: undefined,
    ridingCard:undefined
  });
  data$: Observable<IElectionReportingTiles> = this.dataSubject.asObservable();
  liveElectionSummary$: Observable<any> = this.liveElectionSummarySubject.asObservable();
  electionSummary$: Observable<any> = this.electionSummarySubject.asObservable();
  selectedGroupCaller$: Observable<any> = this.selectedGroupCallerSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  updateElectionReportingTiles(newData: any) {
    this.dataSubject.next(newData);
  }

  updateLiveElectionSummary(newData: any) {
    this.liveElectionSummarySubject.next(newData);
  }

  updateElectionSummary(newData: any) {
    this.electionSummarySubject.next(newData);
  }
  updateSelectedGroupCaller(newData: any) {
    this.selectedGroupCallerSubject.next(newData);
  }

  getCallerList(): Observable<any>{
    return this.http.get<any>(`${this.callerList}`);
  }
}
