import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { ApplicationService } from 'src/app/services/application/application.service';
import { ElectionReportingService } from 'src/app/services/election-reporting/election-reporting.service';
import { OverviewService } from 'src/app/services/overview/overview.service';
import { UnelectedService } from 'src/app/services/un-elected/unelected.service';
import { UNELECTED_CARDS } from '../../../shared/card-constants';
import { RIDING_CONSTANTS, getCellStyle, changeRowColor,getRidingStatusData } from '../../../shared/riding-constants';
import { RidingStatusCardComponent } from '../riding-status-card/riding-status-card.component';
import { StatusCardComponent } from '../status-card/status-card.component';
import { PartyCardComponent } from '../party-card/party-card.component';
import { RidingEyeCardComponent } from '../riding-eye-card/riding-eye-card.component';
import { getPartyColor } from 'src/app/shared/parties-constants';
import { getDefaultColDef, HandleColumnVisibleChange, UnElectedMarginColor } from 'src/app/shared/constants';
import { getRegionBarChart, getRegionLineGraph } from 'src/app/shared/chart-constants';

import { CdkDragDrop, moveItemInArray  } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-ridings2',
    templateUrl: './ridings2.component.html',
    styleUrls: ['./ridings2.component.scss']
})
export class Ridings2Component implements OnInit {
    appliedThemeClassOnTable = "ag-theme-material";

    panelState: boolean[] = [];

    private allRidingsGridApi;
    private allRidingsGridColumnApi;
    allRidingsGridOptions: GridOptions = {};
    public allRidingsRowData!: any[];
    allRidingsColumnDefs: ColDef[];
    allRidingsTitle="";

    // private calledRidingsGridApi;
    // private calledRidingsGridColumnApi;
    // calledRidingsGridOptions: GridOptions = {};
    // public calledRidingsRowData!: any[];
    // calledRidingsColumnDefs: ColDef[];
    // calledRidingsTitle="";

    private ridingGridApi;
    private ridingGridColumnApi;
    ridingGridOptions: GridOptions = {};
    public ridingRowData!: any[];
    ridingColumnDefs: ColDef[] = [
        {
            headerName: "Candidate Name",
            field: "name",
            sortable: true,
            filter: true,
            flex: 2, // Enable auto-sizing for the column
            cellStyle: getCellStyle,
            headerClass: "ag-custom-header",
        },
        {
            headerName: "Party",
            field: "party",
            sortable: true,
            filter: true,
            flex: 1, // Enable auto-sizing for the column
            headerClass: "ag-custom-header",
            cellStyle: getCellStyle,
            cellRendererFramework: PartyCardComponent,
            cellRendererParams: (params) => ({
                partyData: {
                    color:getPartyColor(params.value),
                    label: params?.value || "",
                    // fontSize: "20px",
                },
            }),
        },
        {
            headerName: "Votes",
            field: "votes",
            sortable: true,
            filter: true,
            flex: 1, // Enable auto-sizing for the column
            cellStyle: getCellStyle,
            headerClass: "ag-custom-header",
        },
        {
            headerName: "%",
            field: "vote_percentage",
            sortable: true,
            filter: true,
            flex: 1, // Enable auto-sizing for the column
            cellStyle: getCellStyle,
            headerClass: "ag-custom-header",
        },
        {
            headerName: "Margin",
            field: "margin",
            sortable: true,
            filter: true,
            flex: 1, // Enable auto-sizing for the column
            cellStyle: getCellStyle,
            headerClass: "ag-custom-header",
        },
        // {
        //     headerName: "Last Report",
        //     field: "leading",
        //     sortable: true,
        //     filter: true,
        //     flex: 1, // Enable auto-sizing for the column
        //     headerClass: "ag-custom-header",
        // },
    ];

    allRidingsData: any = [];

    constructor(
        public applicationService: ApplicationService,
        private electionReportingService: ElectionReportingService,
        private unelectedService: UnelectedService,
        private overviewService: OverviewService,
    ) {
        this.setColumnDefs();
    }

    ngOnInit(): void {
        this.allRidingsGridOptions = {
            columnDefs: this.allRidingsColumnDefs,
            rowData: this.allRidingsRowData,
            defaultColDef: getDefaultColDef(),
            suppressRowClickSelection: true,
            rowSelection: "multiple",
            suppressMovableColumns: true,
            onColumnVisible: (params) => HandleColumnVisibleChange(params),
            rowHeight: 30,
            getRowStyle: changeRowColor
        };
        // this.calledRidingsGridOptions = {
        //     columnDefs: this.calledRidingsColumnDefs,
        //     rowData: this.calledRidingsRowData,
        //     defaultColDef: getDefaultColDef(),
        //     suppressRowClickSelection: true,
        //     rowSelection: "multiple",
        //     suppressMovableColumns: true,
        //     onColumnVisible: (params) => HandleColumnVisibleChange(params),
        //     rowHeight: 30
        // };

        this.ridingGridOptions = {
            columnDefs: this.ridingColumnDefs,
            rowData: this.ridingRowData,
            defaultColDef: {
                resizable: true,
                filter: "agTextColumnFilter",
            },
            suppressRowClickSelection: true,
            rowSelection: "multiple",
            rowHeight: 30,
        };

        this.applicationService.getDarkMode().subscribe((isDarkMode) => {
            this.appliedThemeClassOnTable =
                isDarkMode !== undefined && !isDarkMode
                    ? "ag-theme-alpine-dark"
                    : "ag-theme-material";
        });
    }

    expandAll() {
        this.panelState = this.allRidingsData.map(() => true);
    }

    collapseAll() {
        this.panelState = this.allRidingsData.map(() => false);
    }

    drop(event: CdkDragDrop<any[]>) {
        moveItemInArray(this.allRidingsData, event.previousIndex, event.currentIndex);
        debugger;
    }

    allOnGridReady(params: GridReadyEvent<any>) {
        this.allRidingsGridApi = params.api;
        this.allRidingsGridColumnApi = params.columnApi;
        const dummyAllRidingallRidings = {
            UndecidedRidingsData: [
                {
                    districtId: 2,
                    ridingName: "Flin Flon",
                    party: "PC",
                    reported_polls: "70",
                    total_polls: 100,
                    percentage_reported: 50,
                    status: "KILLED",
                    margin: "150",
                    lastReport: "01:56",
                    isEyeIcon: false,
                    caller_notes: "Test Caller Notes 2 callers for this riding",
                    info:"This Riding has had its call \"killed\" due to the most recent update in polling numbers",
                    updatedStatus:{
                        label:"01:56",
                        color:"#F14538"
                    },
                    ridingIcon: { color: '#F14538', iconName: 'ri-close-circle-line', label: 'Killed' },
                    viewOptions: [
                        {icon: 'data_table', selected: true},
                        {icon: 'ssid_chart', selected: false},
                        {icon: 'bar_chart', selected: false},
                    ],
                    selectedViewOption: {},
                    options: {},
                    optionsBar:  {},
                    candidates: [{ name: "Carlo Rouleau", vote_percentage: "46%", party: "PC", votes: "12,156", margin: 6891, leading: "05:54" },
                    { id: 1, name: "Jocelyn Desjardins", vote_percentage: "20%", party: "NDP", votes: "5,265", margin: 2515, leading: "05:54" },
                    { id: 2, name: "Sam Tremblay-Pepin", vote_percentage: "15%", party: "MLP", votes: "2,750", margin: 946, leading: "05:54" },
                    { id: 3, name: "Byanca Jeune", vote_percentage: "10%", party: "GPM", votes: "1,804", margin: 1536, leading: "05:54" },
                    { id: 4, name: "Yves Beaulieu", vote_percentage: "7%", party: "CPM-C", votes: "268", margin: 186, leading: "05:54" },
                    { id: 5, name: "Alex Di Pardo", vote_percentage: "1%", party: "KP", votes: "82", margin: 6, leading: "05:54" },
                    ]
                },
                {
                    districtId: 4,
                    ridingName: 'Concordia',
                    party: 'PC',
                    reported_polls: 25,
                    total_polls: 100,
                    percentage_reported: 25,
                    status: 'KILLED',
                    margin: "100",
                    lastReport: '18:00',
                    isEyeIcon: false,
                    caller_notes: "Test Caller Notes 2 callers for this riding",
                    updatedStatus:{
                        label:"18:00",
                        color:"#F14538"
                    },
                    ridingIcon: { color: '#F14538', iconName: 'ri-close-circle-line', label: 'Killed' },
                    viewOptions: [
                        {icon: 'data_table', selected: true},
                        {icon: 'ssid_chart', selected: false},
                        {icon: 'bar_chart', selected: false},
                    ],
                    info:"This Riding has had its call \"killed\" due to the most recent update in polling numbers",
                    selectedViewOption: {},
                    options: {},
                    optionsBar:  {},
                    candidates: [{ name: "Carlo Rouleau", vote_percentage: "46%", party: "PC", votes: "12,156", margin: 6891, leading: "05:54" },
                    { id: 1, name: "Jocelyn Desjardins", vote_percentage: "20%", party: "NDP", votes: "5,265", margin: 2515, leading: "05:54" },
                    { id: 2, name: "Sam Tremblay-Pepin", vote_percentage: "15%", party: "MLP", votes: "2,750", margin: 946, leading: "05:54" },
                    { id: 3, name: "Byanca Jeune", vote_percentage: "10%", party: "GPM", votes: "1,804", margin: 1536, leading: "05:54" },
                    { id: 4, name: "Yves Beaulieu", vote_percentage: "7%", party: "CPM-C", votes: "268", margin: 186, leading: "05:54" },
                    { id: 5, name: "Alex Di Pardo", vote_percentage: "1%", party: "KP", votes: "82", margin: 6, leading: "05:54" },
                    ]
                },
                {
                    districtId: 10,
                    ridingName: 'Lakeside',
                    party: 'MLP',
                    reported_polls: 75,
                    total_polls: 100,
                    percentage_reported: 75,
                    status: 'CALLED',
                    margin: "600",
                    lastReport: '06:47',
                    isEyeIcon: true,
                    caller_notes: "Test Caller Notes 2 callers for this riding",
                    updatedStatus:{
                        label:"06:47",
                        color:"#0AA5ED"
                    },
                    info:"This Riding has either been called or should be called",
                    ridingIcon: { color: '#0AA5ED', iconName: 'ri-notification-line', label: 'Callable/Called' },
                    viewOptions: [
                        {icon: 'data_table', selected: true},
                        {icon: 'ssid_chart', selected: false},
                        {icon: 'bar_chart', selected: false},
                    ],
                    selectedViewOption: {},
                    options: {},
                    optionsBar:  {},
                    candidates: [{ name: "Carlo Rouleau", vote_percentage: "46%", party: "PC", votes: "12,156", margin: 6891, leading: "05:54" },
                    { id: 1, name: "Jocelyn Desjardins", vote_percentage: "20%", party: "NDP", votes: "5,265", margin: 2515, leading: "05:54" },
                    { id: 2, name: "Sam Tremblay-Pepin", vote_percentage: "15%", party: "MLP", votes: "2,750", margin: 946, leading: "05:54" },
                    { id: 3, name: "Byanca Jeune", vote_percentage: "10%", party: "GPM", votes: "1,804", margin: 1536, leading: "05:54" },
                    { id: 4, name: "Yves Beaulieu", vote_percentage: "7%", party: "CPM-C", votes: "268", margin: 186, leading: "05:54" },
                    { id: 5, name: "Alex Di Pardo", vote_percentage: "1%", party: "KP", votes: "82", margin: 6, leading: "05:54" },
                    ]
                },
                {
                    districtId: 21,
                    ridingName: 'Interlake-Gimli',
                    party: 'GPM',
                    reported_polls: 25,
                    total_polls: 100,
                    percentage_reported: 25,
                    status: 'KILLED',
                    margin: "100",
                    lastReport: '18:00',
                    isEyeIcon: false,
                    caller_notes: "Test Caller Notes 2 callers for this riding",
                    updatedStatus:{
                        label:"18:00",
                        color:"#F14538"
                    },
                    info:"This Riding has had its call \"killed\" due to the most recent update in polling numbers",
                    ridingIcon: { color: '#F14538', iconName: 'ri-close-circle-line', label: 'Killed' },
                    viewOptions: [
                        {icon: 'data_table', selected: true},
                        {icon: 'ssid_chart', selected: false},
                        {icon: 'bar_chart', selected: false},
                    ],
                    selectedViewOption: {},
                    options: {},
                    optionsBar:  {},
                    candidates: [{ name: "Carlo Rouleau", vote_percentage: "46%", party: "PC", votes: "12,156", margin: 6891, leading: "05:54" },
                    { id: 1, name: "Jocelyn Desjardins", vote_percentage: "20%", party: "NDP", votes: "5,265", margin: 2515, leading: "05:54" },
                    { id: 2, name: "Sam Tremblay-Pepin", vote_percentage: "15%", party: "MLP", votes: "2,750", margin: 946, leading: "05:54" },
                    { id: 3, name: "Byanca Jeune", vote_percentage: "10%", party: "GPM", votes: "1,804", margin: 1536, leading: "05:54" },
                    { id: 4, name: "Yves Beaulieu", vote_percentage: "7%", party: "CPM-C", votes: "268", margin: 186, leading: "05:54" },
                    { id: 5, name: "Alex Di Pardo", vote_percentage: "1%", party: "KP", votes: "82", margin: 6, leading: "05:54" },
                    ]
                },
            ],
            CalledRidingsData: [
                {
                    districtId: 1,
                    ridingName: 'Wolseley',
                    party: 'NDP',
                    reported_polls: 100,
                    total_polls: 100,
                    percentage_reported: 100,
                    status: 'ELECTED',
                    margin: "2,652",
                    lastReport: '00:25',
                    isEyeIcon: false,
                    caller_notes: "Test Caller Notes 2 callers for this riding",
                    updatedStatus:{
                        label:"Completed",
                        color:"#029955"
                    },
                    ridingIcon: { color: '#029955', iconName: 'ri-check-line', label: 'Closed' },
                    viewOptions: [
                        {icon: 'data_table', selected: true},
                        {icon: 'ssid_chart', selected: false},
                        {icon: 'bar_chart', selected: false},
                    ],
                    info:"This Riding has been closed as 100% of the polls have been completed as per votes cast by that District",
                    selectedViewOption: {}, 
                    options: {},
                    optionsBar:  {},
                    candidates: [{ name: "Carlo Rouleau", vote_percentage: "46%", party: "PC", votes: "12,156", margin: 6891, leading: "05:54" },
                    { id: 1, name: "Jocelyn Desjardins", vote_percentage: "20%", party: "NDP", votes: "5,265", margin: 2515, leading: "05:54" },
                    { id: 2, name: "Sam Tremblay-Pepin", vote_percentage: "15%", party: "MLP", votes: "2,750", margin: 946, leading: "05:54" },
                    { id: 3, name: "Byanca Jeune", vote_percentage: "10%", party: "GPM", votes: "1,804", margin: 1536, leading: "05:54" },
                    { id: 4, name: "Yves Beaulieu", vote_percentage: "7%", party: "CPM-C", votes: "268", margin: 186, leading: "05:54" },
                    { id: 5, name: "Alex Di Pardo", vote_percentage: "1%", party: "KP", votes: "82", margin: 6, leading: "05:54" },
                    ]
                },
                {
                    districtId: 3,
                    ridingName: 'River Heights',
                    party: 'MLP',
                    reported_polls: 90,
                    total_polls: 100,
                    percentage_reported: 90,
                    status: 'RECONSIDER',
                    margin: "852",
                    lastReport: '02:37',
                    isEyeIcon: false,
                    caller_notes: "Test Caller Notes 2 callers for this riding",
                    updatedStatus:{
                        label:"Updated:15+ min ago",
                        color:"gray"
                    },
                    ridingIcon: { color: 'purple', iconName: 'ri-restart-line', label: 'Reconsider' },
                    viewOptions: [
                        {icon: 'data_table', selected: true},
                        {icon: 'ssid_chart', selected: false},
                       // {icon: 'bar_chart', selected: false},
                    ],
                    info:"This Riding should potentially have its call \"killed\" - which is why it is currently in the \"Reconsider\" limbo as per the latest data",
                    selectedViewOption: {},
                    options: {},
                    optionsBar:  {},
                    candidates: [{ name: "Carlo Rouleau", vote_percentage: "46%", party: "PC", votes: "12,156", margin: 6891, leading: "05:54" },
                    { id: 1, name: "Jocelyn Desjardins", vote_percentage: "20%", party: "NDP", votes: "5,265", margin: 2515, leading: "05:54" },
                    { id: 2, name: "Sam Tremblay-Pepin", vote_percentage: "15%", party: "MLP", votes: "2,750", margin: 946, leading: "05:54" },
                    { id: 3, name: "Byanca Jeune", vote_percentage: "10%", party: "GPM", votes: "1,804", margin: 1536, leading: "05:54" },
                    { id: 4, name: "Yves Beaulieu", vote_percentage: "7%", party: "CPM-C", votes: "268", margin: 186, leading: "05:54" },
                    { id: 5, name: "Alex Di Pardo", vote_percentage: "1%", party: "KP", votes: "82", margin: 6, leading: "05:54" },
                    ]
                },
                {
                    districtId: 8,
                    ridingName: 'Thompson',
                    party: 'NDP',
                    reported_polls: 100,
                    total_polls: 100,
                    percentage_reported: 100,
                    status: 'ELECTED',
                    margin: "300",
                    lastReport: '14:30',
                    isEyeIcon: true,
                    caller_notes: "Test Caller Notes 2 callers for this riding",
                    updatedStatus:{
                        label:"Completed",
                        color:"#029955"
                    },
                    ridingIcon: { color: '#029955', iconName: 'ri-check-line', label: 'Closed' },
                    viewOptions: [
                        {icon: 'data_table', selected: true},
                        {icon: 'ssid_chart', selected: false},
                        {icon: 'bar_chart', selected: false},
                    ],
                    info:"This Riding has been closed as 100% of the polls have been completed as per votes cast by that District",
                    selectedViewOption: {},
                    options: {},
                    optionsBar:  {},
                    candidates: [{ name: "Carlo Rouleau", vote_percentage: "46%", party: "PC", votes: "12,156", margin: 6891, leading: "05:54" },
                    { id: 1, name: "Jocelyn Desjardins", vote_percentage: "20%", party: "NDP", votes: "5,265", margin: 2515, leading: "05:54" },
                    { id: 2, name: "Sam Tremblay-Pepin", vote_percentage: "15%", party: "MLP", votes: "2,750", margin: 946, leading: "05:54" },
                    { id: 3, name: "Byanca Jeune", vote_percentage: "10%", party: "GPM", votes: "1,804", margin: 1536, leading: "05:54" },
                    { id: 4, name: "Yves Beaulieu", vote_percentage: "7%", party: "CPM-C", votes: "268", margin: 186, leading: "05:54" },
                    { id: 5, name: "Alex Di Pardo", vote_percentage: "1%", party: "KP", votes: "82", margin: 6, leading: "05:54" },
                    ]
                },
                {
                    districtId: 5,
                    ridingName: 'Southdale',
                    party: 'PC',
                    reported_polls: 100,
                    total_polls: 100,
                    percentage_reported: 100,
                    status: 'ELECTED',
                    margin: "771",
                    lastReport: '06:58',
                    isEyeIcon: false,
                    caller_notes: "Test Caller Notes 2 callers for this riding",
                    updatedStatus:{
                        label:"Completed",
                        color:"#029955"
                    },
                    ridingIcon: { color: '#029955', iconName: 'ri-check-line', label: 'Closed' },
                    viewOptions: [
                        {icon: 'data_table', selected: true},
                       // {icon: 'ssid_chart', selected: false},
                        {icon: 'bar_chart', selected: false},
                    ],
                    info:"This Riding has been closed as 100% of the polls have been completed as per votes cast by that District",
                    selectedViewOption: {},
                    options: {},
                    optionsBar:  {},
                    candidates: [{ name: "Carlo Rouleau", vote_percentage: "46%", party: "PC", votes: "12,156", margin: 6891, leading: "05:54" },
                    { id: 1, name: "Jocelyn Desjardins", vote_percentage: "20%", party: "NDP", votes: "5,265", margin: 2515, leading: "05:54" },
                    { id: 2, name: "Sam Tremblay-Pepin", vote_percentage: "15%", party: "MLP", votes: "2,750", margin: 946, leading: "05:54" },
                    { id: 3, name: "Byanca Jeune", vote_percentage: "10%", party: "GPM", votes: "1,804", margin: 1536, leading: "05:54" },
                    { id: 4, name: "Yves Beaulieu", vote_percentage: "7%", party: "CPM-C", votes: "268", margin: 186, leading: "05:54" },
                    { id: 5, name: "Alex Di Pardo", vote_percentage: "1%", party: "KP", votes: "82", margin: 6, leading: "05:54" },
                    ]
                },
            ]
        };
        //this.allRidingsRowData = RIDING_CONSTANTS.allRidings.UndecidedRidingsData;
        this.allRidingsRowData = dummyAllRidingallRidings.UndecidedRidingsData;
        // RIDING_CONSTANTS.allRidings.CalledRidingsData.map(x=>{
        //     this.allRidingsRowData.push(x);
        // })

        dummyAllRidingallRidings.CalledRidingsData.map(x=>{
            this.allRidingsRowData.push(x);
        })

        this.allRidingsRowData.forEach(x=>{
            this.allRidingsData.push(x);
            x.selectedViewOption= {icon: 'data_table', selected: true},

            x.options= {
                autoSize: true,
                theme: {
                    palette: {
                        fills: ["#6838ee", "#f79108", "#d82c20", "#039954", "#364255"],
                        strokes: ["#6838ee", "#f79108", "#d82c20", "#039954", "#364255"],
                    },
                    overrides: {
                        line: {series: {strokeWidth: 3, marker: {enabled: false}}},
                    },
                },
                axes: [
                    {
                        position: 'bottom',
                        type: 'category',
                        title: {
                            text: 'Polls Reported'
                          },
                    },
                    {
                        position: 'left',
                        type: 'number',
                        title: {
                            text: 'Votes'
                          },
                    },
                ],
                data: [

                ],
                series: [

                ],
            },
            x.optionsBar=  {
                data: [],
                series: [],
            },

            x.options= getRegionLineGraph(x.candidates,x.options);
            x.optionsBar= getRegionBarChart(x.candidates,x.optionsBar);
        })
        // sort the data
        this.allRidingsData.sort((a, b) => a.districtId - b.districtId);
        var yetToCallRidings = this.allRidingsRowData.filter(x=>x.status=="KILLED" || x.status=="CALLED");
       // var calledRidings= this.allRidingsRowData.length - yetToCallRidings.length;
        this.allRidingsTitle = yetToCallRidings.length +" of 10 ridings yet to call";// + calledRidings+" of 10 ridings called";
        this.getRidings();
        this.panelState = this.allRidingsData.map(() => true); // Default to all expanded
    }

    // calledOnGridReady(params: GridReadyEvent<any>) {
    //     this.calledRidingsGridApi = params.api;
    //     this.calledRidingsGridColumnApi=params.columnApi;
    //     this.calledRidingsRowData = RIDING_CONSTANTS.allRidings;
    //     this.calledRidingsRowData.forEach(x=>{
    //         this.allRidingsData.push(x);
    //         x.selectedViewOption= {icon: 'data_table', selected: true},
    //         x.options= {
    //             autoSize: true,
    //             theme: {
    //                 palette: {
    //                     fills: ["#6838ee", "#f79108", "#d82c20", "#039954", "#364255"],
    //                     strokes: ["#6838ee", "#f79108", "#d82c20", "#039954", "#364255"],
    //                 },
    //                 overrides: {
    //                     line: {series: {strokeWidth: 3, marker: {enabled: false}}},
    //                 },
    //             },
    //             axes: [
    //                 {
    //                     position: 'bottom',
    //                     type: 'category',
    //                     title: {
    //                         text: 'Polls Reported'
    //                       },
    //                 },
    //                 {
    //                     position: 'left',
    //                     type: 'number',
    //                     title: {
    //                         text: 'Votes'
    //                       },
    //                 },
    //             ],
    //             data: [

    //             ],
    //             series: [

    //             ],
    //         },
    //         x.optionsBar=  {
    //             data: [],
    //             series: [],
    //         },
    //         x.options= getRegionLineGraph(x.candidates,x.options);
    //         x.optionsBar= getRegionBarChart(x.candidates,x.optionsBar);
    //     })
    //     this.calledRidingsTitle = this.calledRidingsRowData.length+ " of 10 ridings called";
    //     this.panelState = this.allRidingsData.map(() => true); // Default to all expanded
    // }

    ridingOnGridReady(params: GridReadyEvent<any>) {
        this.ridingGridApi = params.api;
        this.ridingGridColumnApi =params.columnApi;
    }

    getRidings() {

    }

    getContextMenuItemsForUndecided(params) {
        var result = [
            {
                'name': 'Elect',
                action: () => {
                    this.performElectAction(params);
                },
            }];
        return result;
    }

    getContextMenuItems(params) {
        var result = [
            {
                'name': 'Kill', action: () => {
                    this.performKilledAction(params);
                },
            },
            {
                'name': 'Reconsider', action: () => {
                    this.performReconsiderAction(params);
                },
            }];
        return result;
    }

    performKilledAction(params: any) {
        const rowIndex = params.node.rowIndex;
        const rowData = params.node.data;
        var killedRecord = rowData;
        killedRecord.status = "KILLED";

        // this.calledRidingsRowData.splice(rowIndex, 1);
        // this.calledRidingsGridApi.setRowData(this.calledRidingsRowData); // Update ag-Grid data

        this.allRidingsRowData.push(killedRecord);
        this.allRidingsGridApi.setRowData(this.allRidingsRowData);

        // this.allRidingsTitle = this.allRidingsRowData.length +" of 10 ridings yet to call";
        // this.calledRidingsTitle = this.calledRidingsRowData.length+ " of 10 ridings called";
    }

    performReconsiderAction(params: any) {
        const rowIndex = params.node.rowIndex;
        const rowData = params.node.data;
        var reconsiderRecord = rowData;
        reconsiderRecord.status = "RECONSIDER";

        // this.calledRidingsRowData[rowIndex] = reconsiderRecord;
        // this.calledRidingsGridApi.setRowData(this.calledRidingsRowData);

        this.allRidingsTitle = this.allRidingsRowData.length +" of 10 ridings yet to call";
        // this.calledRidingsTitle = this.calledRidingsRowData.length+ " of 10 ridings called";
    }

    performElectAction(params: any) {
        const rowIndex = params.node.rowIndex;
        const rowData = params.node.data;
        var electedRecord = rowData;
        electedRecord.status = "ELECTED";

        this.allRidingsRowData.splice(rowIndex, 1);
        this.allRidingsGridApi.setRowData(this.allRidingsRowData); // Update ag-Grid data

        // this.calledRidingsRowData.push(electedRecord);
        // this.calledRidingsGridApi.setRowData(this.calledRidingsRowData);

        this.allRidingsTitle = this.allRidingsRowData.length +" of 10 ridings yet to call";
       // this.calledRidingsTitle = this.calledRidingsRowData.length+ " of 10 ridings called";
    }

    onViewOptionChange(opt, riding) {
        riding.selectedViewOption = opt;
        riding.viewOptions = riding.viewOptions.map(item => {
            item.selected = item.icon === opt.icon;
            return item;
        });
    }
    setColumnDefs() {
        this.setallRidingsColumnDefs();
        //this.setCalledRidingsColumnDefs();
    }

    setallRidingsColumnDefs() {
        if (window.innerWidth < 1707) {
            this.allRidingsColumnDefs = [
                {
                    headerName: "#",
                    field: "districtId",
                    sortable: true,
                    filter: true,
                    width: 50,
                    cellStyle: getCellStyle,
                    headerClass: "ag-custom-header"
                },
                {
                    headerName: "Riding Name",
                    field: "ridingName",
                    sortable: true,
                    filter: true,
                    width: 150,
                    cellStyle: getCellStyle,
                    headerClass: "ag-custom-header",
                    cellRendererFramework: RidingEyeCardComponent,
                    cellRendererParams: (params) => ({
                        statusData: {
                            label: params?.value || "",
                        },
                    }),
                },
                {
                    headerName: "Party",
                    field: "party",
                    sortable: true,
                    filter: true,
                    width: 100,
                    cellStyle: getCellStyle,
                    headerClass: "ag-custom-header",
                    cellRendererFramework: PartyCardComponent,
                    cellRendererParams: (params) => ({
                        partyData: {
                            color: getPartyColor(params.value),
                            label: params?.value || "",
                        },
                    }),
                },
                {
                    headerName: "Polls Reporting",
                    field: "reported_polls",
                    sortable: true,
                    filter: true,
                    width: 145,
                    cellStyle: getCellStyle,
                    headerClass: "ag-custom-header",
                    cellRendererFramework: StatusCardComponent,
                    cellRendererParams: (params) => {
                        return {
                            statusData: {
                                color: "", // Default color
                                iconName: "", // Default icon
                                label: params?.value + "/" + params.data.total_polls + "" + "  " + "(" + params.data.percentage_reported + "%" + ")" || "",
                            },
                        };
                    },
                },
                {
                    headerName: "Status",
                    field: "status",
                    sortable: true,
                    filter: true,
                    width: 80,
                    headerClass: "ag-custom-header",
                    cellStyle: { fontWeight: 'normal', display: 'flex' },
                    cellRendererFramework: RidingStatusCardComponent,
                    cellRendererParams: (params) => ({
                        statusData: getRidingStatusData(params.value),
                    }),
                },
                {
                    headerName: "Margin",
                    field: "margin",
                    sortable: true,
                    filter: true,
                    width: 87,
                    headerClass: "ag-custom-header",
                    cellStyle: getCellStyle,
                    // cellStyle: { fontWeight: 'normal' },
                    cellRenderer: (params) => {

                        let statusData = {
                            color: UnElectedMarginColor(params.value),
                            label: params.value,
                        };

                        // const iconHtml = `<span style="display: flex; align-items: center; justify-content: flex-start; color: ${statusData.color};">${statusData.label}</span>`;
                        const iconHtml = `<span style="display: flex; align-items: center; justify-content: flex-start;">${params.value}</span>`;
                        return iconHtml;
                    },
                },
                {
                    headerName: "Last Report",
                    field: "lastReport",
                    sortable: true,
                    filter: true,
                    width: 120,
                    headerClass: "ag-custom-header",
                    cellStyle: (params) => {

                        // Define a function to calculate the background color based on cell value
                        const value = params.value || ''; // Get the cell value
                        let backgroundColor = "#FFA500"; // Default background color
                        let color = "";

                        // Customize the background color based on cell value
                        if (value.substring(0, 2) < "05") {
                            backgroundColor = "";
                            color = "#606366";
                        } else if (value.substring(0, 2) <= "09") {
                            backgroundColor = "#fec94a";
                        } else if (value.substring(0, 2) < "15") {
                            backgroundColor = "#f79009";
                            color = "#ffffff";
                        } else {
                            backgroundColor = "#d82c20";
                            color = "#ffffff";
                        } // Add more conditions as needed

                        return { "background-color": backgroundColor, color: color };
                    }, // Replace with your desired background color
                    cellRenderer: (params) => {
                        return `<span class="px-2" style="font-weight: normal;">${params.value || '12:00'}</span>`;
                    },
                },
            ];
        }
        else {
            this.allRidingsColumnDefs = [
                {
                    headerName: "#",
                    field: "districtId",
                    sortable: true,
                    filter: true,
                    width: 50,
                    cellStyle: getCellStyle,
                    headerClass: "ag-custom-header"
                },
                {
                    headerName: "Riding Name",
                    field: "ridingName",
                    sortable: true,
                    filter: true,
                    flex: 1, // Enable auto-sizing for the column
                    cellStyle: getCellStyle,
                    headerClass: "ag-custom-header",
                    cellRendererFramework: RidingEyeCardComponent,
                    cellRendererParams: (params) => ({
                        statusData: {
                            label: params?.value || "",
                        },
                    }),
                },
                {
                    headerName: "Party",
                    field: "party",
                    sortable: true,
                    filter: true,
                    flex: 1, // Enable auto-sizing for the column
                    cellStyle: getCellStyle,
                    headerClass: "ag-custom-header",
                    cellRendererFramework: PartyCardComponent,
                    cellRendererParams: (params) => ({
                        partyData: {
                            color: getPartyColor(params.value),
                            label: params?.value || "",
                        },
                    }),
                },
                {
                    headerName: "Polls Reporting",
                    field: "reported_polls",
                    sortable: true,
                    filter: true,
                    flex: 1, // Enable auto-sizing for the column
                    cellStyle: getCellStyle,
                    headerClass: "ag-custom-header",
                    cellRendererFramework: StatusCardComponent,
                    cellRendererParams: (params) => {
                        return {
                            statusData: {
                                color: "", // Default color
                                iconName: "", // Default icon
                                label: params?.value + "/" + params.data.total_polls + "" + "  " + "(" + params.data.percentage_reported + "%" + ")" || "",
                            },
                        };
                    },
                },
                {
                    headerName: "Status",
                    field: "status",
                    sortable: true,
                    filter: true,
                    flex: 1, // Enable auto-sizing for the column
                    headerClass: "ag-custom-header",
                    cellStyle: { fontWeight: 'normal', display: 'flex' },
                    cellRendererFramework: RidingStatusCardComponent,
                    cellRendererParams: (params) => ({
                        statusData: getRidingStatusData(params.value),
                    }),
                },
                {
                    headerName: "Margin",
                    field: "margin",
                    sortable: true,
                    filter: true,
                    flex: 1, // Enable auto-sizing for the column
                    headerClass: "ag-custom-header",
                    //cellStyle: { fontWeight: 'normal' },
                    cellStyle: getCellStyle,
                    cellRenderer: (params) => {

                        let statusData = {
                            color: UnElectedMarginColor(params.value),
                            label: params.value,
                        };

                        // const iconHtml = `<span style="display: flex; align-items: center; justify-content: flex-start; color: ${statusData.color};">${statusData.label}</span>`;
                        const iconHtml = `<span style="display: flex; align-items: center; justify-content: flex-start;">${params.value}</span>`;
                        return iconHtml;
                    },
                },
                {
                    headerName: "Last Report",
                    field: "lastReport",
                    sortable: true,
                    filter: true,
                    flex: 1, // Enable auto-sizing for the column
                    headerClass: "ag-custom-header",
                    cellStyle: (params) => {

                        // Define a function to calculate the background color based on cell value
                        const value = params.value || ''; // Get the cell value
                        let backgroundColor = "#FFA500"; // Default background color
                        let color = "";

                        // Customize the background color based on cell value
                        if (value.substring(0, 2) < "05") {
                            backgroundColor = "";
                            color = "#606366";
                        } else if (value.substring(0, 2) <= "09") {
                            backgroundColor = "#fec94a";
                        } else if (value.substring(0, 2) < "15") {
                            backgroundColor = "#f79009";
                            color = "#ffffff";
                        } else {
                            backgroundColor = "#d82c20";
                            color = "#ffffff";
                        } // Add more conditions as needed

                        return { "background-color": backgroundColor, color: color };
                    }, // Replace with your desired background color
                    cellRenderer: (params) => {
                        return `<span class="px-2" style="font-weight: normal;">${params.value || '12:00'}</span>`;
                    },
                },
            ];
        }
    }

    // setCalledRidingsColumnDefs() {
    //     //calledRidingsColumnDefs
    //     if (window.innerWidth < 1707) {
    //         this.calledRidingsColumnDefs = [
    //             {
    //                 headerName: "#",
    //                 field: "districtId",
    //                 sortable: true,
    //                 filter: true,
    //                 width: 50, pivot: true, type: 'dimension',
    //                 cellStyle: getCellStyle,
    //                 headerClass: "ag-custom-header"
    //             },
    //             {
    //                 headerName: "Riding Name",
    //                 field: "ridingName",
    //                 sortable: true,
    //                 filter: true,
    //                 width: 150, pivot: true, type: 'dimension',
    //                 cellStyle: getCellStyle,
    //                 headerClass: "ag-custom-header",
    //                 cellRendererFramework: RidingEyeCardComponent,
    //                 cellRendererParams: (params) => ({
    //                     statusData: {
    //                         label: params?.value || "",
    //                     },
    //                 }),
    //             },
    //             {
    //                 headerName: "Party",
    //                 field: "party",
    //                 sortable: true,
    //                 filter: true,
    //                 width: 100, pivot: true, type: 'dimension',
    //                 cellStyle: getCellStyle,
    //                 headerClass: "ag-custom-header",
    //                 cellRendererFramework: PartyCardComponent,
    //                 cellRendererParams: (params) => ({
    //                     partyData: {
    //                         color: getPartyColor(params.value),
    //                         label: params?.value || "",
    //                     },
    //                 }),
    //             },
    //             {
    //                 headerName: "Polls Reporting",
    //                 field: "reported_polls",
    //                 sortable: true,
    //                 filter: true,
    //                 width: 145, pivot: true, type: 'dimension',
    //                 cellStyle: getCellStyle,
    //                 headerClass: "ag-custom-header",
    //                 cellRendererFramework: StatusCardComponent,
    //                 cellRendererParams: (params) => {
    //                     return {
    //                         statusData: {
    //                             color: "", // Default color
    //                             iconName: "", // Default icon
    //                             label: params?.value + "/" + params.data.total_polls + "" + "  " + "(" + params.data.percentage_reported + "%" + ")" || "",
    //                         },
    //                     };
    //                 },
    //             },
    //             {
    //                 headerName: "Status",
    //                 field: "status",
    //                 sortable: true,
    //                 filter: true,
    //                 width: 80, pivot: true, type: 'dimension',
    //                 headerClass: "ag-custom-header",
    //                 cellStyle: { fontWeight: 'normal', display: 'flex' },
    //                 cellRendererFramework: RidingStatusCardComponent,
    //                 cellRendererParams: (params) => ({
    //                     statusData: getRidingStatusData(params.value),
    //                 }),
    //             },
    //             {
    //                 headerName: "Margin",
    //                 field: "margin",
    //                 sortable: true,
    //                 filter: true,
    //                 width: 87, pivot: true, type: 'dimension',
    //                 headerClass: "ag-custom-header",
    //                 // cellStyle: { fontWeight: 'normal' },
    //                 cellStyle: getCellStyle,
    //                 cellRenderer: (params) => {

    //                     let statusData = {
    //                         color: UnElectedMarginColor(params.value),
    //                         label: params.value,
    //                     };

    //                     const iconHtml = `<span style="display: flex; align-items: center; justify-content: flex-start;">${params.value}</span>`;

    //                     return iconHtml;
    //                 },
    //             },
    //             {
    //                 headerName: "Last Report",
    //                 field: "lastReport",
    //                 sortable: true,
    //                 filter: true,
    //                 width: 120, pivot: true, type: 'dimension',
    //                 headerClass: "ag-custom-header",
    //                 cellStyle: (params) => {

    //                     // Define a function to calculate the background color based on cell value
    //                     const value = params.value || ''; // Get the cell value
    //                     let backgroundColor = "#FFA500"; // Default background color
    //                     let color = "";

    //                     // Customize the background color based on cell value
    //                     if (value.substring(0, 2) < "05") {
    //                         backgroundColor = "";
    //                         color = "#606366";
    //                     } else if (value.substring(0, 2) <= "09") {
    //                         backgroundColor = "#fec94a";
    //                     } else if (value.substring(0, 2) < "15") {
    //                         backgroundColor = "#f79009";
    //                         color = "#ffffff";
    //                     } else {
    //                         backgroundColor = "#d82c20";
    //                         color = "#ffffff";
    //                     } // Add more conditions as needed

    //                     return { "background-color": backgroundColor, color: color };
    //                 }, // Replace with your desired background color
    //                 cellRenderer: (params) => {
    //                     return `<span class="px-2" style="font-weight: normal;">${params.value || '12:00'}</span>`;
    //                 },
    //             },
    //         ];
    //     }
    //     else {
    //         this.calledRidingsColumnDefs = [
    //             {
    //                 headerName: "#",
    //                 field: "districtId",
    //                 sortable: true,
    //                 filter: true,
    //                 width: 50, pivot: true, type: 'dimension',
    //                 cellStyle: getCellStyle,
    //                 headerClass: "ag-custom-header"
    //             },
    //             {
    //                 headerName: "Riding Name",
    //                 field: "ridingName",
    //                 sortable: true,
    //                 filter: true,
    //                 flex: 1, // Enable auto-sizing for the column
    //                 cellStyle: getCellStyle,
    //                 headerClass: "ag-custom-header",
    //                 cellRendererFramework: RidingEyeCardComponent,
    //                 cellRendererParams: (params) => ({
    //                     statusData: {
    //                         label: params?.value || "",
    //                     },
    //                 }),
    //             },
    //             {
    //                 headerName: "Party",
    //                 field: "party",
    //                 sortable: true,
    //                 filter: true,
    //                 flex: 1, // Enable auto-sizing for the column
    //                 cellStyle: getCellStyle,
    //                 headerClass: "ag-custom-header",
    //                 cellRendererFramework: PartyCardComponent,
    //                 cellRendererParams: (params) => ({
    //                     partyData: {
    //                         color: getPartyColor(params.value),
    //                         label: params?.value || "",
    //                     },
    //                 }),
    //             },
    //             {
    //                 headerName: "Polls Reporting",
    //                 field: "reported_polls",
    //                 sortable: true,
    //                 filter: true,
    //                 flex: 1, // Enable auto-sizing for the column
    //                 cellStyle: getCellStyle,
    //                 headerClass: "ag-custom-header",
    //                 cellRendererFramework: StatusCardComponent,
    //                 cellRendererParams: (params) => {
    //                     return {
    //                         statusData: {
    //                             color: "", // Default color
    //                             iconName: "", // Default icon
    //                             label: params?.value + "/" + params.data.total_polls + "" + "  " + "(" + params.data.percentage_reported + "%" + ")" || "",
    //                         },
    //                     };
    //                 },
    //             },
    //             {
    //                 headerName: "Status",
    //                 field: "status",
    //                 sortable: true,
    //                 filter: true,
    //                 flex: 1, // Enable auto-sizing for the column
    //                 headerClass: "ag-custom-header",
    //                 cellStyle: { fontWeight: 'normal', display: 'flex' },
    //                 cellRendererFramework: RidingStatusCardComponent,
    //                 cellRendererParams: (params) => ({
    //                     statusData: getRidingStatusData(params.value),
    //                 }),
    //             },
    //             {
    //                 headerName: "Margin",
    //                 field: "margin",
    //                 sortable: true,
    //                 filter: true,
    //                 flex: 1, // Enable auto-sizing for the column
    //                 headerClass: "ag-custom-header",
    //                 // cellStyle: { fontWeight: 'normal' },
    //                 cellStyle: getCellStyle,
    //                 cellRenderer: (params) => {
    //                     let statusData = {
    //                         label: params.value,
    //                     };

    //                     const iconHtml = `<span style="display: flex; align-items: center; justify-content: flex-start;">${params.value}</span>`;

    //                     return iconHtml;
    //                     // let statusData = {
    //                     //     color: UnElectedMarginColor(params.value),
    //                     //     label: params.value,
    //                     // };

    //                     // const iconHtml = `<span style="display: flex; align-items: center; justify-content: flex-start; color: ${statusData.color};">${statusData.label}</span>`;

    //                     // return iconHtml;
    //                 },
    //             },
    //             {
    //                 headerName: "Last Report",
    //                 field: "lastReport",
    //                 sortable: true,
    //                 filter: true,
    //                 flex: 1, // Enable auto-sizing for the column
    //                 headerClass: "ag-custom-header",
    //                 cellStyle: (params) => {

    //                     // Define a function to calculate the background color based on cell value
    //                     const value = params.value || ''; // Get the cell value
    //                     let backgroundColor = "#FFA500"; // Default background color
    //                     let color = "";

    //                     // Customize the background color based on cell value
    //                     if (value.substring(0, 2) < "05") {
    //                         backgroundColor = "";
    //                         color = "#606366";
    //                     } else if (value.substring(0, 2) <= "09") {
    //                         backgroundColor = "#fec94a";
    //                     } else if (value.substring(0, 2) < "15") {
    //                         backgroundColor = "#f79009";
    //                         color = "#ffffff";
    //                     } else {
    //                         backgroundColor = "#d82c20";
    //                         color = "#ffffff";
    //                     } // Add more conditions as needed

    //                     return { "background-color": backgroundColor, color: color };
    //                 }, // Replace with your desired background color
    //                 cellRenderer: (params) => {
    //                     return `<span class="px-2" style="font-weight: normal;">${params.value || '12:00'}</span>`;
    //                 },
    //             },
    //         ];
    //     }
    // }


}
