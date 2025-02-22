import {AfterViewInit, Component, HostListener, OnInit, ViewChild} from "@angular/core";
import {Router} from "@angular/router";
import {MatAccordion} from "@angular/material/expansion";
import {MediaMatcher} from "@angular/cdk/layout";
import {ApplicationService} from "../../services/application/application.service";
import {SharedService} from "src/app/services/shared/shared.service";

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
    businessSetupMenus = [
        {
            name: "Business details",
            icon: "business",
            tabUrl: "/setup-details",
            tabName: "Business details",
        },
        {
            name: "Location",
            icon: "payment",
            tabUrl: "/business-locations",
            tabName: "Location",
        },
        {
            name: "Client sources",
            icon: "price_check",
            tabUrl: "/client-sources",
            tabName: "Client sources",
        },
    ];

    catalogMenus = [
        {
            name: "Service menu",
            icon: "design_services",
            tabUrl: "/catlog",
            tabName: "Service menu",
        },
        {
            name: "Memberships",
            icon: "card_membership",
            tabUrl: "/catalog-membership",
            tabName: "Memberships",
        },
        {
            name: "Products",
            icon: "category",
            tabUrl: "/catalog-products",
            tabName: "Products",
        },
    ];

    salesMenus = [
        {
            name: "Daily sales",
            icon: "bar_chart",
            tabUrl: "/sales",
            tabName: "Daily sales",
        },
        {
            name: "Appointments",
            icon: "event",
            tabUrl: "/sales-appointment",
            tabName: "Transactions",
        },
    ];
    teamMenus = [
        {
            name: "Team members",
            icon: "group",
            tabUrl: "/team-members",
            tabName: "Team members",
        },
        {
            name: "Scheduled shifts",
            icon: "manage_accounts",
            tabUrl: "/scheduled-shift",
            tabName: "Scheduled shifts",
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
    settingsMenus = [
        {
            name: "Settings",
            icon: "settings",
            tabUrl: "/settings",
            tabName: "General Settings",
        },

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
    ) {
    }

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
                    name: "Business Setup",
                    group: [
                        ...this.businessSetupMenus.filter((item) =>
                            item.name.toLowerCase().includes(this.insightSearchText.toLowerCase())
                        ),
                    ],
                },

                {
                    name: "Catalog",
                    group: [
                        ...this.catalogMenus.filter((item) =>
                            item.name.toLowerCase().includes(this.insightSearchText.toLowerCase())
                        ),
                    ],
                },
                {
                    name: "Sales",
                    group: [
                        ...this.salesMenus.filter((item) =>
                            item.name.toLowerCase().includes(this.insightSearchText.toLowerCase())
                        ),
                    ],
                },

                {
                    name: "Team",  // Added Team
                    group: [
                        ...this.teamMenus.filter((item) =>
                            item.name.toLowerCase().includes(this.insightSearchText.toLowerCase())
                        ),
                    ],
                },

                {
                    name: "ERS",
                    group: [
                        ...this.electionReportingSystemMenus.filter((item) =>
                            item.name.toLowerCase().includes(this.insightSearchText.toLowerCase())
                        ),
                    ],
                },

                {
                    name: "Help",
                    group: [
                        ...this.helpMenus.filter((item) =>
                            item.name.toLowerCase().includes(this.insightSearchText.toLowerCase())
                        ),
                    ],
                },
                {
                    name: "Settings",
                    group: [
                        ...this.settingsMenus.filter((item) =>
                            item.name.toLowerCase().includes(this.insightSearchText.toLowerCase())
                        ),
                    ],
                },
            ];
            setTimeout(() => {
                this.lobAccordion.openAll();
            }, 300);
            return;
        }

        this.rearrangeDashboardMenus();
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
        if (menuName == 'ERS') {
            this.dashboardMenuOpened = false;
            this.applicationService.setPinnedMenuOpen(this.dashboardMenuOpened);
        } else {
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
        this.dashboardMenus =
            window.innerWidth > 1140
                ? [
                    {name: "Business Setup", group: [...this.businessSetupMenus]}, // Added Business Setup
                    {name: "Catalog", group: [...this.catalogMenus]},
                    {name: "Sales", group: [...this.salesMenus]},
                    {name: "Team", group: [...this.teamMenus]},
                    {name: "Help", group: [...this.helpMenus]},
                    {name: "Settings", group: [...this.settingsMenus]},
                ]
                : [
                    {name: "Business Setup", group: [...this.businessSetupMenus]}, // Added Business Setup
                    {name: "Catalog", group: [...this.catalogMenus]},
                    {name: "Sales", group: [...this.salesMenus]},
                    {name: "Team", group: [...this.teamMenus]},
                    {name: "ERS", group: [...this.electionReportingSystemMenus]},
                    {name: "Help", group: [...this.helpMenus]},
                    {name: "Settings", group: [...this.settingsMenus]},
                ];

        setTimeout(() => {
            this.lobAccordion.openAll();
        }, 300);
    }
}
