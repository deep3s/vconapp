import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { AgChartOptions } from "ag-charts-community";
import { ColDef, GridOptions, IRowNode } from "ag-grid-community";
import { ApplicationService } from "../../../services/application/application.service";
import { ElectionReportingService } from "../../../services/election-reporting/election-reporting.service";
import { OverviewService } from "../../../services/overview/overview.service";
import { RIDING_CARDS } from '../../../shared/card-constants';
import { getRidingBarChart, getRidingLineGraph, getRidingPieChart } from "../../../shared/chart-constants";
import { ALERT_CONSTANTS, HandleColumnVisibleChange, getDefaultColDef } from '../../../shared/constants';
import { getPartyColor } from "../../../shared/parties-constants";
import { DeleteAlertModelComponent } from "../../manage-ers/delete-alert-model/delete-alert-model.component";
import { PartyCardComponent } from "../party-card/party-card.component";
import { MyRidingsModalComponent } from "./my-ridings-modal/my-ridings-modal.component";
@Component({
    selector: 'app-ridings',
    templateUrl: './ridings.component.html',
    styleUrls: ['./ridings.component.scss']
})
export class RidingsComponent implements OnInit {
    appliedThemeClassOnTable = "ag-theme-material";
    defaultColDef = {
        sortable: true,
        filter: true,
        resizable: true,
    };

    columnTypes = {
        dimension: {
            enableRowGroup: true,
            enablePivot: true,
        },
    };
    gridApis: any = [];
    gridApi;
    gridColumnApi;
    gridColumnApis = [];
    selectedRowsPerPage = 12;
    currentAgGridPage = 0;
    totalAgGridPages = 0;
    ridingColumnDefs: ColDef[];

    // private ridingGridApi!: GridApi;
    private ridingGridApi;
    private ridingGridColumnApi;
    ridingGridOptions: GridOptions = {};
    public originalRidingRowData!: any[];
    public ridingRowData!: any[];

    // private manitobaGridApi!: GridApi;
    private manitobaGridApi;
    private manitobaGridColumnApi;
    manitobaGridOptions: GridOptions = {};
    public manitobaRowData!: any[];
    manitobaColumnDefs: ColDef[];
    selectedViewOption: any = {};
    viewOptions = [
        { icon: 'bar_chart', selected: true },
        // {icon: 'pie_chart', selected: false},
        { icon: 'ssid_chart', selected: false },
    ];
    selectedRiding: any = {};
    ridingSearchText = '';
    lastUpdated='';
    pollsReporting='';
    options: AgChartOptions = {
        autoSize: true,
        theme: {
            palette: {
                fills: ['#6839EF', '#F79009', '#D82D21', '#029955', '#D82D21', 'purple'],
                strokes: ['#6839EF', '#F79009', '#D82D21', '#029955', '#D82D21', 'purple'],
            },
            overrides: {
                line: { series: { strokeWidth: 3, marker: { enabled: false } } },
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
            {
                quarter: 'Q1',
                petrol: 0,
                diesel: 0,
                gas: 0,
                elc: 0,
            },
            {
                quarter: 'Q2',
                petrol: 200,
                diesel: 130,
                gas: 90,
                elc: 20,
            },
            {
                quarter: 'Q3',
                petrol: 450,
                diesel: 160,
                gas: 120,
                elc: 40,
            },
            {
                quarter: 'Q4',
                petrol: 500,
                diesel: 200,
                gas: 160,
                elc: 50,
            },
        ],
        series: [
            {
                xKey: 'quarter',
                yKey: 'petrol',
                yName: 'Progressive Conservative Party',
            },
            {
                xKey: 'quarter',
                yKey: 'diesel',
                yName: 'New Democratic Party',
            },
            {
                xKey: 'quarter',
                yKey: 'gas',
                yName: 'Liberal Party',
            },
            {
                xKey: 'quarter',
                yKey: 'elc',
                yName: 'Green Party',
            },
        ],
    };

    optionsPie: AgChartOptions = {
        data: [],
        series: [
            {
                type: 'pie',
                angleKey: 'value',
                calloutLabelKey: 'label',
                sectorLabelKey: 'value',
                sectorLabel: {
                    color: 'white',
                    fontWeight: 'bold',
                },
                fills: ['#6839EF', '#F79009', '#D82D21', '#029955', '#D82D21', 'purple'],
                strokes: ['#6839EF', '#F79009', '#D82D21', '#029955', '#D82D21', 'purple']
            }
        ],
    };
    ridingNotes:any={};
    barChartData: any = [];
    barChartSeries: any = [];

    optionsBar: AgChartOptions = {
        data: [...this.barChartData],
        series: [...this.barChartSeries],
    };

    constructor(public applicationService: ApplicationService,
        public overviewService: OverviewService,
        public electionReportingService: ElectionReportingService,
        public dialog: MatDialog,) {
        this.setColumnDefs();
        // this.ridingRowData = [{districtId: 1, ridingName: 'Kildonan-River East', candidateNames: 'vishwa'},
        // {districtId: 2, ridingName: 'Sherwood Park—Fort Saskatchewan', candidateNames: 'crossleaf'},{districtId: 3, ridingName: 'Edmonton Strathcona', candidateNames: 'crossleaf'},
        // {districtId: 4, ridingName: 'South Okanagan—West Kootenay', candidateNames: 'crossleaf'}]
    }

    ngOnInit() {
        this.selectedViewOption = this.viewOptions[0];
        this.ridingGridOptions = {
            columnDefs: this.ridingColumnDefs,
            rowData: this.ridingRowData,
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
            onColumnVisible: (params) => HandleColumnVisibleChange(params),
        };

        this.applicationService.getDarkMode().subscribe((isDarkMode) => {
            this.appliedThemeClassOnTable =
                isDarkMode !== undefined && !isDarkMode
                    ? "ag-theme-alpine-dark"
                    : "ag-theme-material";
        });

        this.applicationService.getOpenMyRidings().subscribe((isOpen) => {
            if (!isOpen) return;

            const dialogRef = this.dialog.open(MyRidingsModalComponent, {
                width: '1600px',
                disableClose: true,
                data: { ridings: this.originalRidingRowData.slice(0, 8), enableElect: true }
            });
        });


    }

    onViewOptionChange(opt) {
        this.selectedViewOption = opt;
        this.viewOptions = this.viewOptions.map(item => {
            item.selected = item.icon === opt.icon;

            return item;
        });
    }

    ridingOnGridReady(params: any) {
        //this.ridingRowData = DUMMY_DATA.RidingData;
        this.ridingGridApi = params.api;
        this.ridingGridColumnApi =params.columnApi; //For Col defination update
        let totalPolls = 0;
        let reported_polls = 0;
        let ridingId=0;
        this.overviewService.getAllRidingNames().subscribe(
            ridings => {
                if(ridings.length>0)
                    ridingId=ridings[0].riding_id;
                this.ridingRowData=ridings.map(riding=>{
                    return {
                        ...riding,
                        districtId:riding.riding_id,
                        ridingName:riding.riding_name_eng
                    }
                })

                this.selectedRiding=this.ridingRowData[0];
                this.selectCandidatesByRiding(ridingId);

            }, err => {
            })
    }

    manitobaOnGridReady(params: any) {
        this.manitobaGridApi = params.api;
        this.manitobaGridColumnApi =params.columnApi; //For Col defination update
    }

    onQuickFilterChanged() {
        // this.regionGridApi.setQuickFilter(
        //     (document.getElementById("quickFilter") as HTMLInputElement).value
        // );
        this.ridingGridApi.setQuickFilter(
            (document.getElementById("quickFilter") as HTMLInputElement).value
        );
        this.manitobaGridApi.setQuickFilter(
            (document.getElementById("quickFilter") as HTMLInputElement).value
        );
    }

    clearRidingSearch() {
        this.ridingSearchText = "";
        const quickFilterInput = document.getElementById("quickFilter") as HTMLInputElement;
        quickFilterInput.value = "";
        this.onQuickFilterChanged();
    }

    onSelectionChanged(params: any): void {
        this.selectRiding(params.api.getSelectedRows()[0]);
    }

   async selectCandidatesByRiding(id){
        let ridingsData;
       await this.overviewService.getRidingById(id).subscribe(
            data => {
                ridingsData=data.candidates;
                this.lastUpdated=data.last_updated;
                this.pollsReporting=data.polls_reporting+'/'+data.total_polls+ ' '+((data.polls_reporting/data.total_polls*100).toFixed(1));
                this.manitobaRowData=data.candidates.map(candidate=>{
                    return{
                        ...candidate,
                        partyId: candidate.candidate_id,
                        name: candidate.firstname+' '+candidate.lastname,
                        party: candidate.party_short_eng,
                        votes: candidate.votes,
                        vote_percentage:((candidate.votes / data.total_votes)*100).toFixed(1)+'%',
                    }
                })

                let callers = '';
                data.caller.map(cl=>{
                    callers += `${cl.firstname} ${cl.lastname}, `;
                });

                if(callers.length) {
                    callers = callers.substring(0, callers.length - 2);
                }


                this.ridingNotes={
                    previous:data.previous,
                    likelyWinner:'PCP',
                    callerNotes: data.caller_notes,
                    prominent:data.prominent,
                    caller: callers ,
                    lastSynced:data.last_updated
                }


                console.log('*************this.manitobaRowData*********',this.manitobaRowData)
                this.optionsPie= getRidingPieChart(this.manitobaRowData,this.optionsPie);
                this.options =getRidingLineGraph(this.manitobaRowData, this.options);
                //dynamicallyDrawBarChart;
                this.optionsBar = getRidingBarChart(this.manitobaRowData, this.optionsBar);

            }, err => {
            })
            return ridingsData;
    }

    selectRiding(riding) {
        this.selectCandidatesByRiding(riding.riding_id);
         this.selectedRiding = riding;
    }

    electRiding(event, name) {
        event.preventDefault();
        event.stopPropagation();

        const dialogRef = this.dialog.open(DeleteAlertModelComponent, {
            width: '700px',
            disableClose: true,
            data: {
                name: "Alert",
                message: `${ALERT_CONSTANTS.alertText} ${name} ${this.selectedRiding.ridingName}?`
            }
        });

        let reqData = {
            name: this.selectedRiding.ridingName,
            district: 1,
            status: this.selectedRiding.status
        };

        this.overviewService.postElected(reqData).subscribe((res) => {

        }, err => {
        });
    }

    onGridReady(params: any): void {
        this.gridApi = params.api;
        this.gridApis.push(params.api);
        this.gridColumnApi = params.columnApi;

        this.onAgGridPaginationChanged();
    }

    onAgGridPaginationChanged(): void {
    }

    autoSizeAll(skipHeader): void {
        const allColumnIds: any = [];

        this.gridColumnApis.map((api: any) => {
            api.getColumns().forEach((column: any) => {
                allColumnIds.push(column.colId);
            });
            api.autoSizeColumns(allColumnIds, skipHeader);
        });
    }

    onFirstDataRendered(): void {
        setTimeout(() => {
            this.ridingGridApi.sizeColumnsToFit();
            // Select the first row
            const firstRowNode: IRowNode | undefined = this.ridingGridApi.getDisplayedRowAtIndex(0);
            if (firstRowNode) {
                firstRowNode.setSelected(true);
                this.onSelectionChanged({ api: this.ridingGridApi });
            }

            // this.gridApis.map((api: any) => {
            //     api.sizeColumnsToFit();
            // });
        }, 500, true);
    }

    openMyRidnigs() {
        const dialogRef = this.dialog.open(MyRidingsModalComponent, {
            width: '900px',
            disableClose: true,
            data: {}
        });
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.setColumnDefs();

        //For Col defination update
        this.ridingGridApi.setColumnDefs(this.ridingColumnDefs);
        this.ridingGridColumnApi.autoSizeAllColumns();//For Col defination update

        this.manitobaGridApi.setColumnDefs(this.manitobaColumnDefs);
        this.manitobaGridColumnApi.autoSizeAllColumns();//For Col defination update
    }

    setColumnDefs() {
        const screenWidth = window.innerWidth;
        //alert("screenWidth: " + screenWidth);
        this.setRidingColumnDefs();
        this.setManitobaColumnDefs();
    }

    setRidingColumnDefs() {
        // if (window.innerWidth < 960) {
        //     this.ridingColumnDefs = [
        //         {
        //             headerName: "Id",
        //             field: "districtId",
        //             sortable: true,
        //             filter: true,
        //             width: 70, pivot: true, type: 'dimension',
        //             headerClass: "ag-custom-header",
        //         },
        //         {
        //             headerName: "Riding Name",
        //             field: "ridingName",
        //             sortable: true,
        //             filter: true,
        //             width: 140, pivot: true, type: 'dimension',
        //             headerClass: "ag-custom-header",
        //         },
        //         {
        //             headerName: "Candidate Names",
        //             field: "candidateNames",
        //             sortable: true,
        //             filter: true,
        //             width: 300, pivot: true, type: 'dimension',
        //             headerClass: "ag-custom-header",
        //             cellRenderer: CandidateNamesComponent
        //         },
        //     ];
        // }
        // else{
        // }
        this.ridingColumnDefs = [
            {
                headerName: "Id",
                field: "districtId",
                sortable: true,
                filter: true,
                width: 50,
                //flex: 1, // Enable auto-sizing for the column
                headerClass: "ag-custom-header",
            },
            {
                headerName: "Riding Name",
                field: "ridingName",
                sortable: true,
                filter: true,
                flex: 2, // Enable auto-sizing for the column
                headerClass: "ag-custom-header",
            }//,
            // {
            //     headerName: "Candidate Names",
            //     field: "candidateNames",
            //     sortable: true,
            //     filter: true,
            //     flex: 4, // Enable auto-sizing for the column
            //     headerClass: "ag-custom-header",
            //     cellRenderer: CandidateNamesComponent
            // },
        ];
    }

    setManitobaColumnDefs() {
        if (window.innerWidth < 1200) {
            this.manitobaColumnDefs = [
                {
                    headerName: "Candidate Name",
                    field: "name",
                    sortable: true,
                    filter: true,
                    width: 200,
                    headerClass: "ag-custom-header",
                },
                {
                    headerName: "Party",
                    field: "party",
                    sortable: true,
                    filter: true,
                    width: 100,
                    headerClass: "ag-custom-header",
                    cellRendererFramework: PartyCardComponent,
                    cellRendererParams: (params) => ({
                        partyData: {
                            color: getPartyColor(params?.value),
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
                    width: 100,
                    headerClass: "ag-custom-header",
                },
                {
                    headerName: "%",
                    field: "vote_percentage",
                    sortable: true,
                    filter: true,
                    width: 100,
                    headerClass: "ag-custom-header",
                },
                {
                    headerName: "Margin",
                    field: "margin",
                    sortable: true,
                    filter: true,
                    width: 100,
                    headerClass: "ag-custom-header",
                },
                // {
                //     headerName: "Last Report",
                //     field: "leading",
                //     sortable: true,
                //     filter: true,
                //     width: 100, pivot: true, type: 'dimension',
                //     headerClass: "ag-custom-header",
                // },
            ];

        } else {
            this.manitobaColumnDefs = [
                {
                    headerName: "Candidate Name",
                    field: "name",
                    sortable: true,
                    filter: true,
                    flex: 2, // Enable auto-sizing for the column
                    headerClass: "ag-custom-header",
                },
                {
                    headerName: "Party",
                    field: "party",
                    sortable: true,
                    filter: true,
                    flex: 1, // Enable auto-sizing for the column
                    headerClass: "ag-custom-header",
                    cellRendererFramework: PartyCardComponent,
                    cellRendererParams: (params) => ({
                        partyData: {
                            color: getPartyColor(params?.value),
                            label: params?.value || "",
                            // fontSize: "20px",
                        },
                        // partyData: {
                        //     color:
                        //         params.value.toUpperCase() === "PC"
                        //             ? "#6839EF"
                        //             : params.value.toUpperCase() === "PQ"
                        //                 ? "#F69008"
                        //                 : params.value.toUpperCase() === "LIB"
                        //                     ? "#D92C21"
                        //                     : params.value.toUpperCase() === "QS"
                        //                         ? "#029955"
                        //                         : params.value.toUpperCase() === "CAQ"
                        //                             ? "#354055"
                        //                             : "#D82D21", // Default color
                        //     label: params?.value || "",
                        //     // fontSize: "20px",
                        // },
                    }),
                },
                {
                    headerName: "Votes",
                    field: "votes",
                    sortable: true,
                    filter: true,
                    flex: 1, // Enable auto-sizing for the column
                    headerClass: "ag-custom-header",
                },
                {
                    headerName: "%",
                    field: "vote_percentage",
                    sortable: true,
                    filter: true,
                    flex: 1, // Enable auto-sizing for the column
                    headerClass: "ag-custom-header",
                },
                {
                    headerName: "Margin",
                    field: "margin",
                    sortable: true,
                    filter: true,
                    flex: 1, // Enable auto-sizing for the column
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
        }
    }
}
