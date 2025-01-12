import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private dashboardMenuOpened = new BehaviorSubject<any>(false);
  isDashboardMenuOpened = this.dashboardMenuOpened.asObservable();

  changeDashboardMenuOpened(value: any) {
    this.dashboardMenuOpened.next(value);
  }
}
