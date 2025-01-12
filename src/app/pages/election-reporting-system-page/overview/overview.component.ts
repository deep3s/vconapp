import { Component, HostListener, OnInit } from '@angular/core';
import { AgChartOptions } from "ag-charts-community";
import { ColDef, GridOptions, GridReadyEvent } from "ag-grid-community";
import { ApplicationService } from "../../../services/application/application.service";
import { ElectionReportingService } from "../../../services/election-reporting/election-reporting.service";
import { OverviewService } from "../../../services/overview/overview.service";
import { getOverviewBarChart } from "../../../shared/chart-constants";
import { HandleColumnVisibleChange, getDefaultColDef } from '../../../shared/constants';
import { DUMMY_DATA } from "../../../shared/dummyData";
import { PARTIES, getFNPartyColor } from "../../../shared/parties-constants";
import { PartyCardComponent } from "../party-card/party-card.component";
import { StatusCardComponent } from "../status-card/status-card.component";
import { ViewRidingsComponent } from "./view-ridings-component/view-ridings-component";
import { SharedService } from 'src/app/services/shared/shared.service';
import {Router} from "@angular/router";

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
    appliedThemeClassOnTable = "ag-theme-material";
    votingColumnDefs: ColDef[];

    private votingGridApi;
    private votingGridColumnApi;
    votingGridOptions: GridOptions = {};
    public votingRowData!: any[];
    public cardsData: any = {};
    private manitobaGridApi;
    private manitobaGridColumnApi;
    manitobaGridOptions: GridOptions = {};
    public manitobaRowData!: any[];
    manitobaColumnDefs: ColDef[];

    selectedViewOption: any = {};
    viewOptions = [
        { icon: 'data_table', selected: true },
        { icon: 'ssid_chart', selected: false },
        { icon: 'bar_chart', selected: false },
    ];

    overviewData: any = [];
    lastUpdated = '';
    ssidChartData: any = DUMMY_DATA.ManitobaSsidChartData;
    ssidChartSeries: any = DUMMY_DATA.ManitobaSsidChartSeries;
    ssidBarChartData: any = DUMMY_DATA.ManitobaBarChartData;
    ssidBarChartSeries: any = DUMMY_DATA.ManitobaBarChartSeries;

    options: AgChartOptions = {
        autoSize: true,
        theme: {
            palette: {
                fills: PARTIES.parties_color_list,
                strokes: PARTIES.parties_color_list,
            },
            overrides: {
                line: {
                    series: { strokeWidth: 3, marker: { enabled: false } },
                },
            },
        },
        axes: [
            {
                position: 'bottom',
                type: 'category',
                title: {
                    text: 'Polls Reported'
                },
                crossLines: [
                    {
                        type: 'range',
                        range: ['Jun', 'Sep'],
                    },
                ],
            },
            {
                position: 'left',
                type: 'number',
                title: {
                    text: 'Leading & Elected'
                },
                crossLines: [
                    {
                        type: 'line',
                        value: 29,
                        label: {
                            text: 'Majority Government Threshold', color: '#cc212c',
                            position: 'topLeft', padding: 10,
                            fontWeight: 'bold', fontSize: 16
                        },
                        fill: '#cc212c',
                        stroke: '#cc212c',
                        strokeWidth: 4,
                    },
                ],
            },
        ],
        data: [...this.ssidChartData],
        series: [...this.ssidChartSeries],
    };

    optionsBar: AgChartOptions = {
        autoSize: true,
        // theme: {
        //     palette: {
        //         fills: PARTIES.parties_color_list,
        //         strokes: PARTIES.parties_color_list,
        //     },
        //     overrides: {
        //         //column: {series: {strokeWidth: 3}},
        //     },
        // },

        axes: [
            {
                position: 'bottom',
                type: 'category',
                crossLines: [
                    {
                        type: 'range',
                        range: ['Jun', 'Sep'],
                    },
                ],
                gridStyle: [
                    {
                        stroke: 'transparent' // Hide grid lines if needed
                    }
                ],
                line: {
                    width: 0 // Hide the line if needed
                },
            },
            {
                position: 'left',
                type: 'number',
                crossLines: [
                    {
                        type: 'line',
                        value: 29,
                        label: {
                            text: 'Majority Government Threshold', color: '#cc212c',
                            position: 'topRight', padding: 10,
                            fontWeight: 'bold', fontSize: 16
                        },
                        fill: '#cc212c',
                        stroke: '#cc212c',
                        strokeWidth: 4,
                    },
                ],
            },
        ],
        data: [...this.ssidBarChartData],
        series: [...this.ssidBarChartSeries],
    };

    constructor(public applicationService: ApplicationService,
        public electionReportingService: ElectionReportingService,
        public overviewSvc: OverviewService,
        public router: Router,
        private sharedService: SharedService) {
        this.setColumnDefs(1024,1420);
        // this.cardsData=this.getOverviewCardsData();
        // console.log('********cardsdata***********',this.cardsData);
        // this.electionReportingService.updateElectionReportingTiles(this.cardsData);
    }
    totalPolls = 0;
    totalRidings = 0;
    isDashboardMenuOpened: any;
    ngOnInit() {
        this.sharedService.isDashboardMenuOpened.subscribe(value => {
            this.isDashboardMenuOpened = value;
            this.ondashboardMenuOpenedVariableChange();
        });
        this.selectedViewOption = this.viewOptions[0];
        this.votingGridOptions = {
            columnDefs: this.votingColumnDefs,
            rowData: this.votingRowData,
            defaultColDef: getDefaultColDef(),
            suppressRowClickSelection: true,
            rowHeight: 30,
            rowSelection: "multiple",
            suppressMovableColumns: true,
            onColumnVisible: (params) => HandleColumnVisibleChange(params),
        };
        this.manitobaGridOptions = {
            columnDefs: this.manitobaColumnDefs,
            rowData: this.manitobaRowData,
            defaultColDef: getDefaultColDef(),
            suppressRowClickSelection: true,
            rowHeight: 30,
            rowSelection: "multiple",
            suppressMovableColumns: true,
            onColumnVisible: (params) => HandleColumnVisibleChange(params)
        };

        this.applicationService.getDarkMode().subscribe((isDarkMode) => {
            this.appliedThemeClassOnTable =
                isDarkMode !== undefined && !isDarkMode
                    ? "ag-theme-alpine-dark"
                    : "ag-theme-material";
        });

        this.overviewSvc.getOverviewData().subscribe(data => {
                var allLeaders = "";
                for (let i = 0; i < data.election_summary.current_leader_parties.length; i++) {
                    if (i == 0) {
                        allLeaders = data.election_summary.current_leader_parties[i].party_short_eng + " (" + (((data.election_summary.current_leader_parties[i].elected + data.election_summary.current_leader_parties[i].leading) / data.election_summary.total_ridings) * 100).toFixed(1) + "%)";
                    } else {
                        allLeaders += ", " + data.election_summary.current_leader_parties[i].party_short_eng + " (" + (((data.election_summary.current_leader_parties[i].elected + data.election_summary.current_leader_parties[i].leading) / data.election_summary.total_ridings) * 100).toFixed(1) + "%)";
                    }
                }
                this.totalPolls = data.election_summary.total_polls;
                this.totalRidings = data.election_summary.total_ridings;
                this.cardsData = {
                    "pollCard": {
                        "polls": data.election_summary.reported_polls,
                        "totalPolls": this.totalPolls,
                        "title": "Polls Reporting",
                        "percentage": ((data.election_summary.reported_polls / this.totalPolls * 100)).toFixed(1),
                        "isIconShow": false,
                        "iconName": "",
                        "pollPercentage": 66,
                        "progressBarBackgroundColor": "#E0E0E0",
                        "progressBarColor": "black",
                    },
                    "leaderCard": {
                        "title": "Current Leaders:",
                        "percentage": (((data.election_summary.current_leader_parties[0].elected + data.election_summary.current_leader_parties[0].leading) / data.election_summary.total_ridings) * 100).toFixed(1),
                        "buttonLabel": data.election_summary.current_leader_parties[0].party_short_eng,
                        "elLabel": (data.election_summary.current_leader_parties[0].elected + data.election_summary.current_leader_parties[0].leading) + " L&E",
                        "allLeaderCard": allLeaders
                    },
                    "ridingCard": {
                        "ridings": data.election_summary.ridings_called,
                        "totalRidings": data.election_summary.total_ridings,
                        "title": "Ridings Called",
                        "percentage": ((data.election_summary.ridings_called / data.election_summary.total_ridings) * 100).toFixed(1),
                        "isIconShow": true,
                        "iconName": "circle_notifications",
                        "iconColor": "#6EB1FB",
                        "ridingPercentage": 52,
                        "progressBarBackgroundColor": "#CCFFFF",
                        "progressBarColor": "#3399FF",
                        "seats": this.totalRidings - data.election_summary.ridings_called,
                    },
                };

                this.votingRowData = data.election_summary.overview_party_details.map(party => {
                    return {
                        ...party,
                        partyId: party.party_short_eng,
                        party_color: party.party_color,
                        Votes: party.votes,
                        Percentage: party.popular_vote_percentage,
                        Elected: party.elected,
                        Leading: party.leading,
                        el: party.elected + party.leading,
                        elp: isNaN(((party.elected + party.leading) / data.total_ridings * 100)) ? '0%' : ((party.elected + party.leading) / data.total_ridings * 100).toFixed(1) + '%'
                    }
                })

                this.electionReportingService.updateElectionReportingTiles(this.cardsData);
                this.electionReportingService.updateElectionSummary(data);
            },
            err => {
                console.log('overview error', err)
            })

    }

    // handleColumnVisibleChange(params: any) {
    //     const allColumns = params.columnApi.getAllColumns();
    //     const visibleColumns = allColumns.filter(col => col.isVisible());

    //     if (visibleColumns.length === 0) {
    //         params.columnApi.setColumnVisible(params.column.getColId(), true);
    //        // alert('At least one column must be visible.');
    //     }
    // }

    onViewOptionChange(opt) {
        this.selectedViewOption = opt;
        this.viewOptions = this.viewOptions.map(item => {
            item.selected = item.icon === opt.icon;

            return item;
        });
    }


    getOverviewCardsData() {
        this.overviewSvc.getOverviewData().subscribe(data => {
            this.cardsData = {
                "pollCard": {
                    "polls": data.election_summary.reported_polls,
                    "totalPolls": data.election_summary.total_polls,
                    "title": "Polls Reporting",
                    "percentage": ((data.election_summary.reported_polls / data.election_summary.total_polls) * 100).toFixed(1),
                    "isIconShow": false,
                    "iconName": "",
                    "pollPercentage": 66,
                    "progressBarBackgroundColor": "#E0E0E0",
                    "progressBarColor": "black",
                }
            }
        },
            err => {
                console.log('overview error', err)
            })
        return this.cardsData;
    }

    votingOnGridReady(params: GridReadyEvent<any>) {
        this.totalPolls = 0;
        this.totalRidings = 0;
        this.votingGridApi = params.api;
        this.votingGridColumnApi = params.columnApi; //For Col defination update

        setInterval(() => {
            var liveData = [];
            if(this.router.url === '/ers/unElected' || this.router.url === '/ers/overview') {
                this.overviewSvc.getLiveOverviewData(true).subscribe(data => {
                        //console.log('********overview data***********',data.overview_party_details)
                        this.lastUpdated = data.election_summary.last_updated;
                        this.votingRowData = data.election_summary.overview_party_details.map(party => {
                            let index = -1;
                            this.votingRowData.find((iteam, i) => {
                                if (iteam.party_short_eng == party.party_short_eng)
                                    index = i
                            })
                            return {
                                ...party,
                                partyId: party.party_short_eng,
                                party_color: this.votingRowData[index].party_color,
                                Votes: party.votes,
                                Percentage: party.popular_vote_percentage,
                                Elected: party.elected,
                                Leading: party.leading,
                                el: party.elected + party.leading,
                                elp: isNaN(((party.elected + party.leading) / this.totalRidings * 100)) ? '0%' : ((party.elected + party.leading) / this.totalRidings * 100).toFixed(1) + '%'
                            }
                        })
                        params.api.redrawRows();

                        var allLeaders = "";
                        for (let i = 0; i < data.election_summary.current_leader_parties.length; i++) {
                            if (i == 0) {
                                allLeaders = data.election_summary.current_leader_parties[i].party_short_eng + " (" + (((data.election_summary.current_leader_parties[i].elected + data.election_summary.current_leader_parties[i].leading) / this.totalRidings) * 100).toFixed(1) + "%)";
                            } else {
                                allLeaders += ", " + data.election_summary.current_leader_parties[i].party_short_eng + " (" + (((data.election_summary.current_leader_parties[i].elected + data.election_summary.current_leader_parties[i].leading) / this.totalRidings) * 100).toFixed(1) + "%)";
                            }
                        }

                        this.cardsData = {
                            "pollCard": {
                                "polls": data.election_summary.reported_polls,
                                "totalPolls": this.totalPolls,
                                "title": "Polls Reporting",
                                "percentage": ((data.election_summary.reported_polls / this.totalPolls * 100)).toFixed(1),
                                "isIconShow": false,
                                "iconName": "",
                                "pollPercentage": 66,
                                "progressBarBackgroundColor": "#E0E0E0",
                                "progressBarColor": "black",
                            },
                            "leaderCard": {
                                "title": "Current Leaders:",
                                "percentage": (((data.election_summary.current_leader_parties[0].elected + data.election_summary.current_leader_parties[0].leading) / this.totalRidings) * 100).toFixed(1),
                                "buttonLabel": data.election_summary.current_leader_parties[0].party_short_eng,
                                "elLabel": (data.election_summary.current_leader_parties[0].elected + data.election_summary.current_leader_parties[0].leading) + " L&E",
                                "allLeaderCard": allLeaders
                            },
                            "ridingCard": {
                                "ridings": data.election_summary.ridings_called,
                                "totalRidings": this.totalRidings,
                                "title": "Ridings Called",
                                "percentage": ((data.election_summary.ridings_called / this.totalRidings) * 100).toFixed(1),
                                "isIconShow": true,
                                "iconName": "circle_notifications",
                                "iconColor": "#6EB1FB",
                                "ridingPercentage": 52,
                                "progressBarBackgroundColor": "#CCFFFF",
                                "progressBarColor": "#3399FF",
                                "seats": this.totalRidings - data.election_summary.ridings_called,
                            },
                        }
                        this.electionReportingService.updateElectionReportingTiles(this.cardsData);
                        this.electionReportingService.updateLiveElectionSummary(data.election_summary);
                    },
                    err => {
                        console.log('overview error', err)
                    });
            }
        }, 5000)
        }

    manitobaOnGridReady(params: GridReadyEvent<any>) {
        this.manitobaGridApi = params.api;
        this.manitobaGridColumnApi = params.columnApi; //For Col defination update
        this.manitobaRowData = [...this.overviewData];
        if (this.overviewData.length == 0) {
            this.manitobaRowData = DUMMY_DATA.ManitobaData;
        }

        //dynamicallyDrawBarChart
        this.optionsBar = getOverviewBarChart(this.manitobaRowData, this.optionsBar);
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (this.isDashboardMenuOpened) {
            this.setColumnDefs(1120,1420);
        }
        else{
            this.setColumnDefs(1024,1420);
        }

        //For Col defination update
        this.votingGridApi.setColumnDefs(this.votingColumnDefs);
        this.votingGridColumnApi.autoSizeAllColumns();

        this.manitobaGridApi.setColumnDefs(this.manitobaColumnDefs);
        this.manitobaGridColumnApi.autoSizeAllColumns();
    }

    ondashboardMenuOpenedVariableChange() {
        if (this.isDashboardMenuOpened) {
            this.setColumnDefs(1120,1420);
        }
        else{
            this.setColumnDefs(1024,1420);
        }

        this.votingGridApi.setColumnDefs(this.votingColumnDefs);
        this.votingGridColumnApi.autoSizeAllColumns();

        this.manitobaGridApi.setColumnDefs(this.manitobaColumnDefs);
        this.manitobaGridColumnApi.autoSizeAllColumns();
    }

    //#region setColumnDefs
    setColumnDefs(votingGridInnerWidth, manitobaGridInnerWidth) {
        const screenWidth = window.innerWidth;
        this.setVotingColumnDefs(votingGridInnerWidth);
    }

    setVotingColumnDefs(gridInnerWidth) {
        if (window.innerWidth < gridInnerWidth) {
            this.votingColumnDefs = [
                {
                    headerName: "Party",
                    field: "partyId",
                    sortable: true,
                    filter: true,
                    //flex: 1, // Enable auto-sizing for the column
                    // width: 150, pivot: true, type: 'dimension',
                    width: 150,
                    headerClass: "ag-custom-header",
                    cellRendererFramework: PartyCardComponent,
                    cellRendererParams: (params) => ({
                        partyData: {
                            color: params.data.party_color, //getPartyColor(params?.value),
                            label: params?.value || "",
                            // fontSize: "20px",
                        },
                    }),
                },
                {
                    headerName: "Votes",
                    field: "Votes",
                    sortable: true,
                    sort: 'desc',
                    filter: true,
                    width: 150,
                    //flex: 1, // Enable auto-sizing for the column
                    headerClass: "ag-custom-header",
                },
                {
                    headerName: "Popular Vote %",
                    field: "Percentage",
                    sortable: true,
                    filter: true,
                    width: 200,
                    //flex: 0, // Enable auto-sizing for the column
                    headerClass: "ag-custom-header",
                },
                {
                    headerName: "Elected",
                    field: "Elected",
                    sortable: true,
                    filter: true,
                    width: 150,
                    // flex: 1, // Enable auto-sizing for the column
                    headerClass: "ag-custom-header",
                },
                {
                    headerName: "Leading",
                    field: "Leading",
                    sortable: true,
                    filter: true,
                    width: 150,
                    //flex: 1, // Enable auto-sizing for the column
                    headerClass: "ag-custom-header",
                },
                {
                    headerName: "L&E",
                    field: "el",
                    sortable: true,
                    filter: true,
                    width: 150,
                    //flex: 1, // Enable auto-sizing for the column
                    headerClass: "ag-custom-header",
                },
                {
                    headerName: "L&E %",
                    field: "elp",
                    sortable: true,
                    filter: true,
                    width: 150,
                    // flex: 1, // Enable auto-sizing for the column
                    headerClass: "ag-custom-header",
                },
            ];
        } else {
            this.votingColumnDefs = [
                {
                    headerName: "Party",
                    field: "partyId",
                    sortable: true,
                    filter: true,
                    flex: 1, // Enable auto-sizing for the column
                    headerClass: "ag-custom-header",
                    cellRendererFramework: PartyCardComponent,
                    cellRendererParams: (params) => ({
                        partyData: {
                            color: params.data.party_color, //getPartyColor(params?.value),
                            label: params?.value || "",
                            // fontSize: "20px",
                        },
                    }),
                },
                {
                    headerName: "Votes",
                    field: "Votes",
                    sortable: true,
                    sort: 'desc',
                    filter: true,
                    flex: 1, // Enable auto-sizing for the column
                    headerClass: "ag-custom-header",
                },
                {
                    headerName: "Popular Vote %",
                    field: "Percentage",
                    sortable: true,
                    filter: true,
                    flex: 0, // Enable auto-sizing for the column
                    headerClass: "ag-custom-header",
                },
                {
                    headerName: "Elected",
                    field: "Elected",
                    sortable: true,
                    filter: true,
                    flex: 1, // Enable auto-sizing for the column
                    headerClass: "ag-custom-header",
                },
                {
                    headerName: "Leading",
                    field: "Leading",
                    sortable: true,
                    filter: true,
                    flex: 1, // Enable auto-sizing for the column
                    headerClass: "ag-custom-header",
                },
                {
                    headerName: "L&E",
                    field: "el",
                    sortable: true,
                    filter: true,
                    flex: 1, // Enable auto-sizing for the column
                    headerClass: "ag-custom-header",
                },
                {
                    headerName: "L&E %",
                    field: "elp",
                    sortable: true,
                    filter: true,
                    flex: 1, // Enable auto-sizing for the column
                    headerClass: "ag-custom-header",
                },
            ];
        }
    }

    setManitobaColumnDefs(gridInnerWidth) {
        if (window.innerWidth < gridInnerWidth) {
            this.manitobaColumnDefs = [
                {
                    headerName: "Party",
                    field: "partyId",
                    sortable: true,
                    filter: true,
                    //flex: 1, // Enable auto-sizing for the column
                    width: 300,
                    headerClass: "ag-custom-header",
                    cellRendererFramework: PartyCardComponent,
                    cellRendererParams: (params) => ({
                        partyData: {
                            color: getFNPartyColor(params.value),
                            label: params?.value || "",
                            isFull: true,
                            // fontSize: "20px",
                        },
                    }),
                },
                {
                    headerName: "Elected",
                    field: "Elected",
                    sortable: true,
                    filter: true,
                    //flex: 1, // Enable auto-sizing for the column
                    width: 110,
                    headerClass: "ag-custom-header",
                },
                {
                    headerName: "L&E",
                    field: "el",
                    sortable: true,
                    filter: true,
                    //flex: 1, // Enable auto-sizing for the column
                    width: 110,
                    headerClass: "ag-custom-header",
                },
                {
                    headerName: "Winning",
                    field: "elp",
                    sortable: true,
                    filter: true,
                    //flex: 1, // Enable auto-sizing for the column
                    width: 110,
                    headerClass: "ag-custom-header",
                },
                {
                    headerName: "Leader-Riding",
                    field: "party_leader",
                    sortable: true,
                    filter: true,
                    //flex: 3, // Enable auto-sizing for the column
                    width: 300,
                    headerClass: "ag-custom-header",
                    cellRendererFramework: StatusCardComponent,
                    cellRendererParams: (params) => ({
                        statusData: {
                            // color: "#afb7c4", // Default color
                            // iconName: "ri-eye-line", // Default icon
                            label: params?.value || "",
                            // fontSize: "20px",
                        },
                    }),
                },
                {
                    headerName: "Riding",
                    field: "party_seat",
                    sortable: true,
                    filter: true,
                    //flex: 3, // Enable auto-sizing for the column
                    width: 110,
                    headerClass: "ag-custom-header",
                },
                {
                    headerName: "More Info",
                    field: "view",
                    cellRendererFramework: ViewRidingsComponent,
                    sortable: true,
                    filter: true,
                    //flex: 1, // Enable auto-sizing for the column
                    width: 110,
                    headerClass: "ag-custom-header",
                },
            ];

        } else {
            this.manitobaColumnDefs = [
                {
                    headerName: "Party",
                    field: "partyId",
                    sortable: true,
                    filter: true,
                    flex: 3, // Enable auto-sizing for the column
                    headerClass: "ag-custom-header",
                    cellRendererFramework: PartyCardComponent,
                    cellRendererParams: (params) => ({
                        partyData: {
                            color: getFNPartyColor(params.value),
                            label: params?.value || "",
                            isFull: true,
                            // fontSize: "20px",
                        },
                    }),
                },
                {
                    headerName: "Elected",
                    field: "Elected",
                    sortable: true,
                    filter: true,
                    flex: 1, // Enable auto-sizing for the column
                    headerClass: "ag-custom-header",
                },
                {
                    headerName: "L&E",
                    field: "el",
                    sortable: true,
                    filter: true,
                    flex: 1, // Enable auto-sizing for the column
                    headerClass: "ag-custom-header",
                },
                {
                    headerName: "Winning",
                    field: "elp",
                    sortable: true,
                    filter: true,
                    flex: 1, // Enable auto-sizing for the column
                    headerClass: "ag-custom-header",
                },
                {
                    headerName: "Leader-Riding",
                    field: "party_leader",
                    sortable: true,
                    filter: true,
                    flex: 3, // Enable auto-sizing for the column
                    headerClass: "ag-custom-header",
                    cellRendererFramework: StatusCardComponent,
                    cellRendererParams: (params) => ({
                        statusData: {
                            label: params?.value || "",
                        },
                    }),
                },
                {
                    headerName: "Riding",
                    field: "party_seat",
                    sortable: true,
                    filter: true,
                    flex: 1, // Enable auto-sizing for the column
                    headerClass: "ag-custom-header",
                },
                {
                    headerName: "More Info",
                    field: "view",
                    cellRendererFramework: ViewRidingsComponent,
                    sortable: true,
                    filter: true,
                    flex: 1, // Enable auto-sizing for the column
                    headerClass: "ag-custom-header",
                },
            ];
        }

    }
}
