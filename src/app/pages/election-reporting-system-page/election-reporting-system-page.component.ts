import { Component, OnInit } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from "@angular/router";
import { AgChartOptions } from "ag-charts-community";
import {
    ElectionReportingService,
    IElectionReportingTiles,
} from "src/app/services/election-reporting/election-reporting.service";
import { RegionService } from "src/app/services/region/region.service";
import { ApplicationService } from "../../services/application/application.service";
import { getERSBarChart } from "../../shared/chart-constants";
import {DUMMY_DATA} from "../../shared/dummyData";

interface ISubMenus {
    name: string;
    icon: string;
    tabUrl: string;
    tabName: string;
}

@Component({
    selector: "app-election-reporting-system-page",
    templateUrl: "./election-reporting-system-page.component.html",
    styleUrls: ["./election-reporting-system-page.component.scss"],
})
export class ElectionReportingSystemPageComponent implements OnInit {
    currentLocation: ISubMenus | undefined;
    tilesData: IElectionReportingTiles | undefined;
    groupCallers: any;
    selectedgroupCaller: any=[]; // Ensure this is a number
    tabMenus: ISubMenus[] = [
        {
            name: "Overview",
            icon: "border_all",
            tabUrl: "/ers/overview",
            tabName: "Overview",
        },
        {
            name: "My Ridings",
            icon: "fmd_good",
            tabUrl: "/ers/ridings",
            tabName: "My ridings",
        },
        {
            name: "Regions and All Ridings",
            icon: "badge",
            tabUrl: "/ers/region",
            tabName: "Regions and ridings",
        },
        {
            name: "Uncalled / Called",
            icon: "bolt",
            tabUrl: "/ers/unElected",
            tabName: "Uncalled / Called",
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

    newTab:ISubMenus={
        name: "Ridings-2",
        icon: "fmd_good",
        tabUrl: "/ers/ridings-2",
        tabName: "ridings-2",
    };

    handleTabMenuClick(url): void {
      /*  if(url=='/ers/region'){
            this.selectedgroupCaller=undefined;
        } */
        this.router.navigateByUrl(url);
    }

    ridingItems: any = [{id: 1, name: "My Ridings"}];
    selectedRiding = null;

    regionItems: any = [{id: 1, name: "My Region / Caller's Ridings"}];
    selectedRegion = "My Region / Caller's Ridings";

    unElectedMarginItems: any = [{id: 1, name: "Margin Settings"}];
    selectedMargin = "Margin Settings";

    unElectedTimeItems: any = [{id: 1, name: "Time Settings"}];
    selectedTime = "Time Settings";

    getSelectedRiding() {
    }

    applyFiltersAndSearch() {
    }

    optionsBar: AgChartOptions = {
        data: [],
        series: [],
    };
    totalRidings = 0;

    constructor(
        public router: Router,
        public applicationService: ApplicationService,
        private electionReportingService: ElectionReportingService,
        private regionService:RegionService,
        public dialog: MatDialog
    ) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.currentLocation = this.tabMenus.find(
                    (item) => item.tabUrl === event.url
                );
                if (this.currentLocation == undefined) {
                    this.currentLocation = this.newTab;
                }
            }
        });
        this.electionReportingService.data$.subscribe((data) => {
            this.tilesData = data;
        });

        this.electionReportingService.liveElectionSummary$.subscribe((data) => {
            data.total_ridings = this.totalRidings;
            this.optionsBar = getERSBarChart(data, this.optionsBar);
        });

        this.electionReportingService.electionSummary$.subscribe((data) => {
            this.totalRidings = data.election_summary.total_ridings;
            this.optionsBar = getERSBarChart(data.election_summary, this.optionsBar);
        });
        this.groupCallers=[]
        this.electionReportingService.getCallerList().subscribe(r=>{
                r.map(obj=>{
                    this.groupCallers.push({
                        "name":obj.firstname+' '+obj.lastname,
                        "email":obj.email
                    })

                })
                this.selectedgroupCaller=this.groupCallers[0].name;
                this.electionReportingService.updateSelectedGroupCaller(this.groupCallers[0]);
                //this.groupCallers=r;
                console.log('*********this.groupCallers',this.groupCallers)
        },
    err=>{

    })
    }

    goToMyRidings() {
        this.applicationService.setOpenMyRidings(true);
    }

    ngOnInit() {
        //this.selectedgroupCaller=this.groupCallers[0].name;
    }

    onGroupCallerChange(groupCaller: any): void {
        this.electionReportingService.updateSelectedGroupCaller(groupCaller);
    }

    // onSelect(event: Event): void {
    //     const target = event.target as HTMLSelectElement;
    //     const selectedUrl = target.value;
    //     this.router.navigate([selectedUrl]);
    // }
}
