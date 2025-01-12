import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ApplicationService {
  private isLoggedIn = new BehaviorSubject<any>(false);
  private backButtonClickedFromDashPage = false;
  private pinnedMenuOpen = new BehaviorSubject<any>(false);
  private isFilterContainerOpened = new BehaviorSubject<any>(false);
  private isDarkMode = new BehaviorSubject<any>(undefined);
  private searchText = new BehaviorSubject<any>("");
  private submenuSearchText = new BehaviorSubject<any>("");
  private dateFilterToApply = new BehaviorSubject<any>("");
  private dateFilterToDownload = new BehaviorSubject<any>("");
  private refreshPage = new BehaviorSubject<any>("");
  private user = new BehaviorSubject<any>("");
  private openLogInTool = new Subject<any>();
  private openMyRidings = new Subject<any>();
  private togglePublish = new Subject<any>();

  constructor() {}

  setLoggedIn(loggedIn: any): void {
    this.isLoggedIn.next(loggedIn);
  }

  getLoggedInValue(): boolean {
    return this.isLoggedIn.value;
  }

  setOpenMyRidings(openMyRidings: any): void {
    this.openMyRidings.next(openMyRidings);
  }

  getOpenMyRidings(): any {
    return this.openMyRidings.asObservable();
  }

  getTogglePublish(): Observable<any> {
    return this.togglePublish.asObservable();
  }

  setTogglePublish(togglePublish: any): void {
    this.togglePublish.next(togglePublish);
  }

  getDarkMode(): Observable<any> {
    return this.isDarkMode.asObservable();
  }

  setDarkMode(loggedIn: any): void {
    this.isDarkMode.next(loggedIn);
  }

  getBackButtonClickedFromDashPageAsValue() {
    return this.backButtonClickedFromDashPage;
  }

  setBackButtonClickedFromDashPage(backButtonClickedFromDashPage: any): void {
    this.backButtonClickedFromDashPage = backButtonClickedFromDashPage;
  }

  getLoggedIn(): Observable<any> {
    return this.isLoggedIn.asObservable();
  }

  setFilterContainerOpened(loggedIn: any): void {
    this.isFilterContainerOpened.next(loggedIn);
  }

  getFilterContainerOpenedValue(): boolean {
    return this.isFilterContainerOpened.value;
  }

  getFilterContainerOpened(): Observable<any> {
    return this.isFilterContainerOpened.asObservable();
  }

  setOpenLogInTool(isOpen: any): void {
    this.openLogInTool.next(isOpen);
  }

  getOpenLogInTool(): Observable<any> {
    return this.openLogInTool.asObservable();
  }

  setSearchText(searchText: any): void {
    this.searchText.next(searchText);
  }

  getSearchText(): Observable<any> {
    return this.searchText.asObservable();
  }

  submenuSearch(searchText: any): void {
    this.submenuSearchText.next(searchText);
  }

  onSubmenuSearch(): Observable<any> {
    return this.submenuSearchText.asObservable();
  }

  applySubmenuDateFilter(dateRange: any): void {
    this.dateFilterToApply.next(dateRange);
  }

  onApplySubmenuDateFilter(): Observable<any> {
    return this.dateFilterToApply.asObservable();
  }

  downloadSubmenuDateFilter(dateRange: any): void {
    this.dateFilterToDownload.next(dateRange);
  }

  onDownloadSubmenuDateFilter(): Observable<any> {
    return this.dateFilterToDownload.asObservable();
  }

  refreshFromSubmenu(): void {
    this.refreshPage.next(true);
  }

  onRefreshFromSubmenu(): Observable<any> {
    return this.refreshPage.asObservable();
  }

  setUser(searchText: any): void {
    this.user.next(searchText);
  }

  getUser(): Observable<any> {
    return this.user.asObservable();
  }

  setPinnedMenuOpen(searchText: any): void {
    this.pinnedMenuOpen.next(searchText);
  }

  getPinnedMenuOpen(): Observable<any> {
    return this.pinnedMenuOpen.asObservable();
  }
}
