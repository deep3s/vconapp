import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { MatAccordion } from "@angular/material/expansion";
import { MediaMatcher } from "@angular/cdk/layout";
import { ApplicationService } from "../../services/application/application.service";
import { SharedService } from "src/app/services/shared/shared.service";

@Component({
  selector: "app-pinned-menu",
  templateUrl: "./pinned-menu.component.html",
  styleUrls: ["./pinned-menu.component.scss"],
})
export class PinnedMenuComponent implements OnInit, AfterViewInit {
  @ViewChild("lobAccordion") lobAccordion: MatAccordion;
  dashboardMenuOpened = false;
  dashboardSearchOpened = false;
  insightSearchText = "";
  dashboardSearchResult = [
    {
      des: "Overall 2021 And Three-year Guidance Both Largely As Expected",
      icon: "",
      analyst: "Cosmous",
      state: "Published",
    },
    {
      des: "Overall 2021 And Three-year Guidance Both Largely As Expected",
      icon: "",
      analyst: "Cosmous",
      state: "Published",
    },
    {
      des: "Overall 2021 And Three-year Guidance Both Largely As Expected",
      icon: "",
      analyst: "Cosmous",
      state: "Published",
    },
  ];

  toolsMenus = [
    {
      name: "Apple Tracker",
      icon: "auto_stories",
      tabUrl: "/tracker",
      tabName: "Email Notifications",
    },
    {
      name: "Photo Publisher",
      icon: "panorama",
      tabUrl: "/publisher",
      tabName: "",
    },
  ];

  toolsWithERSMenus = [
    {
      name: "Apple Tracker",
      icon: "auto_stories",
      tabUrl: "/tracker",
      tabName: "Email Notifications",
    },
    {
      name: "Photo Publisher",
      icon: "panorama",
      tabUrl: "/publisher",
      tabName: "",
    },
    {
      name: "ERS",
      icon: "border_all",
      tabUrl: "/ers/overview",
      tabName: "ERS",
    }
  ];

  electionReportingSystemMenus = [
    {
      name: "Overview",
      icon: "border_all",
      tabUrl: "/ers/overview",
      tabName: "Overview",
    },
    {
      name: "Ridings",
      icon: "fmd_good",
      tabUrl: "/ers/ridings",
      tabName: "Ridings",
    },
    {
      name: "Region",
      icon: "badge",
      tabUrl: "/ers/region",
      tabName: "Region",
    },
    {
      name: "UnElected",
      icon: "bolt",
      tabUrl: "/ers/unElected",
      tabName: "UnElected",
    },
    {
      name: "Call Election",
      icon: "notifications_active",
      tabUrl: "/ers/callElection",
      tabName: "Call Election",
    },
    {
      name: "Party Facts",
      icon: "grading",
      tabUrl: "/ers/partyFacts",
      tabName: "PartyFacts",
    },
  ];

  adminMenus = [
    {
      name: "Manage Users",
      icon: "badge",
      tabUrl: "/users",
      tabName: "Email Notifications",
    },
    {
      name: "Manage ERS",
      icon: "Settings",//"create_new_folder",
      tabUrl: "/manageERS",
      tabName: "Manage ERS",
    },
  ];
  helpMenus = [
    {
      name: "Get Support",
      icon: "sms_failed",
      tabUrl: "/support",
      tabName: "Get Support",
    },
  ];
  dashboardMenus: any = [];

  constructor(
    public router: Router,
    private applicationService: ApplicationService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.searchInsight();
    this.applicationService.getPinnedMenuOpen().subscribe((menuOpened) => {
      this.dashboardMenuOpened = menuOpened;
      this.sharedService.changeDashboardMenuOpened(menuOpened);
    });
    setTimeout(() => {
      this.lobAccordion.openAll();
    }, 300);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.lobAccordion.openAll();
    }, 300);
  }

  searchInsight(): void {
    if (this.insightSearchText) {
      this.dashboardMenus = [
        {
          name: "Tools",
          group: [
            ...this.toolsMenus.filter(
              (item) =>
                item.name
                  .toLowerCase()
                  .indexOf(this.insightSearchText.toLowerCase()) >= 0
            ),
          ],
        },
        {
          name: "ERS",
          group: [
            ...this.electionReportingSystemMenus.filter(
              (item) =>
                item.name
                  .toLowerCase()
                  .indexOf(this.insightSearchText.toLowerCase()) >= 0
            ),
          ],
        },
        {
          name: "Administration",
          group: [
            ...this.adminMenus.filter(
              (item) =>
                item.name
                  .toLowerCase()
                  .indexOf(this.insightSearchText.toLowerCase()) >= 0
            ),
          ],
        },
        {
          name: "Help",
          group: [
            ...this.helpMenus.filter(
              (item) =>
                item.name
                  .toLowerCase()
                  .indexOf(this.insightSearchText.toLowerCase()) >= 0
            ),
          ],
        },
      ];
      setTimeout(() => {
        this.lobAccordion.openAll();
      }, 300);
      return;
    }
    
    this.rearrangeDashboardMenus()
  }

  openDashboardMenu(event): void {
    event.stopPropagation();

    this.dashboardMenuOpened = !this.dashboardMenuOpened;
    this.sharedService.changeDashboardMenuOpened(!this.dashboardMenuOpened);
  }

  clickedOutOfdashboardMenu(): void {
    /*event.stopPropagation();
    event.preventDefault();*/

    this.dashboardMenuOpened = false;
    this.sharedService.changeDashboardMenuOpened(this.dashboardMenuOpened);
  }

  openDashboardSearch(event): void {
    event.stopPropagation();

    this.dashboardSearchOpened = !this.dashboardSearchOpened;
    this.sharedService.changeDashboardMenuOpened(!this.dashboardMenuOpened);
  }

  clickedOutOfDashboardSearch(event): void {
    /*event.stopPropagation();
    event.preventDefault();*/

    this.dashboardSearchOpened = false;
    this.sharedService.changeDashboardMenuOpened(this.dashboardMenuOpened);
  }

  clickMainMenuLink(url, menuName): void {
    //debugger;
    if(menuName=='ERS'){
      this.dashboardMenuOpened = false;
      this.applicationService.setPinnedMenuOpen(this.dashboardMenuOpened);
    }
    else{
      if (window.innerWidth <= 1024) {
        this.dashboardMenuOpened = false;
        this.applicationService.setPinnedMenuOpen(this.dashboardMenuOpened);
      }
    }
    this.sharedService.changeDashboardMenuOpened(this.dashboardMenuOpened);
    this.router.navigateByUrl(url);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.rearrangeDashboardMenus()
  }

  rearrangeDashboardMenus() {
   // alert(window.innerWidth);
    this.dashboardMenus = //1024 //1140
      window.innerWidth > 1140 ? [
        { name: "Tools", group: [...this.toolsWithERSMenus] },
        { name: "Administration", group: [...this.adminMenus] },
        { name: "Help", group: [...this.helpMenus] },
      ] :
        [
          { name: "Tools", group: [...this.toolsMenus] },
          { name: "ERS", group: [...this.electionReportingSystemMenus] },
          { name: "Administration", group: [...this.adminMenus] },
          { name: "Help", group: [...this.helpMenus] },
        ];
    setTimeout(() => {
      this.lobAccordion.openAll();
    }, 300);
  }
}
