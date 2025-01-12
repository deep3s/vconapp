import {Component, HostListener, OnInit, SimpleChanges} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {AgChartOptions} from "ag-charts-community";
import {
    ColDef,
    GridApi,
    GridOptions,
    GridReadyEvent,
    IRowNode
} from "ag-grid-community";
import {ApplicationService} from "src/app/services/application/application.service";
import {ElectionReportingService} from "src/app/services/election-reporting/election-reporting.service";
import {RegionService} from "src/app/services/region/region.service";
import {OverviewService} from "../../../services/overview/overview.service";
import {REGION_CARDS} from '../../../shared/card-constants';
import {getRegionBarChart, getRegionLineGraph, getRegionPieChart} from "../../../shared/chart-constants";
import {
    ALERT_CONSTANTS,
    HandleColumnVisibleChange,
    getDefaultColDef,
    getRidingStatusData
} from '../../../shared/constants';
import {getPartyColor} from "../../../shared/parties-constants";
import {DeleteAlertModelComponent} from "../../manage-ers/delete-alert-model/delete-alert-model.component";
import {PartyCardComponent} from "../party-card/party-card.component";
import {Router} from "@angular/router";

interface IRegionData {
    id: number;
    polls: number;
    name: string;
}

interface IRidingData {
    id: number;
    name: string;
}

interface IBrandonWestData {
    id: number;
    ridingName: string;
    party: string;
    votes: string;
    precentage: number;
    margin: string;
    lastReport: string;
}

@Component({
    selector: "app-region",
    templateUrl: "./region.component.html",
    styleUrls: ["./region.component.scss"],
})
export class RegionComponent implements OnInit {
    selectedRegionName: string = "RegionName";
    submenuSearchText = "";
    private regionGridApi!: GridApi<IRegionData>;
    private ridingGridApi!: GridApi<IRidingData>;
    private brandonWestGridApi!: GridApi<IBrandonWestData>;
    appliedThemeClassOnTable = "ag-theme-material";
    selectedRowsPerPage = 8;
    last_updated = '';
    public regionRowData!: any[];
    public ridingRowData!: any[];
    public storeRidingData: any[];
    regionGridOptions: GridOptions = {};
    ridingGridOptions: GridOptions = {};
    callerEmail: string = '';
    public brandonWestRowData!: IBrandonWestData[];
    brandonWestGridOptions: GridOptions = {};

    regionColumnDefs: ColDef[] = [
        // {
        //   headerName: "",
        //   field: "id",
        //   sortable: true,
        //   checkboxSelection: true,
        //   width: 70,
        //   headerCheckboxSelection: true,
        //   cellRenderer: (params) => {
        //     return `<input type="checkbox" disabled />`;
        //   },
        //   headerClass: "ag-custom-header",
        // },
        {
            headerName: "# of Ridings",
            field: "polls",
            sortable: true,
            filter: true,
            width: 120,
            headerClass: "ag-custom-header",
        },
        {
            headerName: "Region Name",
            field: "name",
            sortable: true,
            filter: true,
            flex: 1, // Enable auto-sizing for the column
            headerClass: "ag-custom-header",
        },
    ];

    pieOptions: AgChartOptions = {
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
        data: [],
        series: [
            {
                type: "pie",
                angleKey: "value",
                calloutLabelKey: "label",
                sectorLabelKey: "value",
                sectorLabel: {
                    color: "white",
                    fontWeight: "bold",
                },
            },
        ],
    };

    options: AgChartOptions = {
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
        data: [],
        series: [],
    };

    ridingColumnDefs: ColDef[] = [
        {
            headerName: "#",
            field: "districtId",
            sortable: true,
            // checkboxSelection: true,
            width: 70,
            // headerCheckboxSelection: true,
            // cellRenderer: (params) => {
            //   return `<input type="checkbox" disabled />`;
            // },
            headerClass: "ag-custom-header",
        },
        {
            headerName: "Riding Name",
            field: "ridingName",
            sortable: true,
            filter: true,
            flex: 1, // Enable auto-sizing for the column
            headerClass: "ag-custom-header",
        },
    ];

    private manitobaGridApi!: GridApi<any>;
    manitobaGridOptions: GridOptions = {};
    public manitobaRowData!: any[];
    manitobaColumnDefs: ColDef[];
    selectedRiding: any = {};
    gridApis: any = [];
    gridApi;
    gridColumnApi;
    gridColumnApis = [];
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

    barChartData: any = [];
    barChartSeries: any = [];

    optionsBar: AgChartOptions = {
        data: [...this.barChartData],
        series: [...this.barChartSeries],
    };

    public rowHeight = 30; // Set your row height here
    public gridHeight = 11 * this.rowHeight; // Default gridHeight =0

    constructor(
        public applicationService: ApplicationService,
        public regionService: RegionService,
        public overviewService: OverviewService,
        public router: Router,
        private electionReportingService: ElectionReportingService,
        public dialog: MatDialog
    ) {
        this.setColumnDefs();
        this.regionGridOptions = {
            columnDefs: this.regionColumnDefs,
            rowData: this.regionRowData,
            defaultColDef: getDefaultColDef(),
            // suppressRowClickSelection: true,
            rowSelection: "single",
            rowHeight: this.rowHeight,
            suppressMovableColumns: true,
            onSelectionChanged: this.selectedRegionChanged.bind(this),
            onColumnVisible: (params) => HandleColumnVisibleChange(params),
        };
        this.ridingGridOptions = {
            columnDefs: this.ridingColumnDefs,
            rowData: this.ridingRowData,
            defaultColDef: getDefaultColDef(),
            // suppressRowClickSelection: true,
            rowHeight: this.rowHeight,
            rowSelection: "single",
            suppressMovableColumns: true,
            onSelectionChanged: this.selectedRidingChanged.bind(this),
            onColumnVisible: (params) => HandleColumnVisibleChange(params),
        };
        this.manitobaGridOptions = {
            columnDefs: this.manitobaColumnDefs,
            rowData: this.manitobaRowData,
            defaultColDef: getDefaultColDef(),
            suppressRowClickSelection: true,
            rowHeight: this.rowHeight,
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

        this.electionReportingService.selectedGroupCaller$.subscribe((data) => {
            this.callerEmail = data.email;
            //this.fillRegionRowData()
            this.fillRidingRowData(this.regionId);
            this.onRidingFirstDataRendered();
        });
    }

    selectedRegionChanged(event) {
        var selectedRows = this.regionGridApi.getSelectedRows();

        console.log(selectedRows);
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

    onregionSelectionChanged(params: any): void {
        this.selectRigion(params.api.getSelectedRows()[0]);
    }

    onRegionFirstDataRendered(): void {
        setTimeout(() => {
            this.regionGridApi.sizeColumnsToFit();
            // Select the first row
            const firstRowNode: IRowNode | undefined = this.regionGridApi.getDisplayedRowAtIndex(0);
            if (firstRowNode) {
                firstRowNode.setSelected(true);
                this.onregionSelectionChanged({api: this.regionGridApi});
            }

            // this.gridApis.map((api: any) => {
            //     api.sizeColumnsToFit();
            // });
        }, 500, true);
    }

    regionId = 0;

    selectRigion(region) {
        this.selectedRegionName = region.name;
        this.regionId = region.polls;
        this.fillRidingRowData(this.regionId)
    }

    totalVotes = 0;

    fillRidingRowData(regionId) {
        this.ridingRowData = [];
        this.storeRidingData = [];
        this.overviewService.getAllRidingNames().subscribe(r => {
                const cleanedArray = r.filter(r => Object.keys(r).length > 0);
                this.storeRidingData.push(cleanedArray);
            },
            r => {

            })
        this.overviewService.getRidingNames(regionId, this.callerEmail).subscribe(
            riding => {
                if (this.selectRidingId == '')
                    this.selectRidingId = riding[0].riding_id;
                this.overviewService.getRidings(regionId, this.selectRidingId).subscribe(
                    result => {
                        this.last_updated = result.last_updated;
                        this.totalVotes = result.total_votes;
                        var candidateItems = result.candidates.map(cd => {
                            return {
                                ...cd,
                                "name": cd.firstname,
                                "party": cd.party_short_eng,
                                "votes": cd.votes,
                                "vote_percentage": Math.round((cd.votes / result.total_votes) * 100).toFixed(1) + '%',
                                "margin": cd.margin
                            }
                        })
                        riding.map(ds => {
                            this.ridingRowData.push({
                                "districtId": ds.riding_id,
                                "ridingName": ds.riding_name_eng,
                                "candidateNames": result.candidates.map(cdt => cdt.firstname).join(),
                                "candidates": candidateItems
                            })
                        })

                        this.ridingRowData = [...this.ridingRowData];
                        console.log('************candidateItems', candidateItems)

                        setTimeout(() => this.selectRiding(this.ridingRowData[0]), 500);

                    }, err => {
                        if (err.error.message == "Riding not found") {
                            riding.map(ds => {
                                this.ridingRowData.push({
                                    "districtId": ds.riding_id,
                                    "ridingName": ds.riding_name_eng,
                                    "candidateNames": '',
                                    "candidates": []
                                })
                            })

                            this.ridingRowData = [...this.ridingRowData];
                            console.log('****************this.ridingRowData[0]', this.ridingRowData[0])
                            this.selectRiding(this.ridingRowData[0]);
                        }
                    })


            }, err => {
                console.log('errrrrrrrrrrrrrrr', err.error.message);

            })

    }

    onSelectionChanged(params: any): void {
        this.selectRiding(params.api.getSelectedRows()[0]);
    }


    selectedRidingChanged(event) {
        this.selectRiding(this.regionGridApi.getSelectedRows()[0]);
    }

    ridingOnGridReady(params: GridReadyEvent<any>) {
        this.ridingGridApi = params.api;
        console.log('****************this.ridingRowData', this.ridingRowData)
        //this.fillRidingRowData(this.regionId);
        // console.log('this.regionRowData.length',this.regionRowData)
        // if(this.regionRowData!=undefined)
        //     alert(this.regionRowData[0].polls)
        // else{
        //  var regions=  await this.fillRegionRowData();
        //     console.log('this.regionRowData.length************',regions)

        // }
        // this.ridingGridApi = params.api;
        // this.overviewService.getAllDistricts().subscribe(
        //     districts => {
        //         this.ridingRowData = [];
        //         this.overviewService.getDistrictVotes().subscribe(
        //             candidates => {
        //                 //districts = districts.splice(0, 10);
        //                 districts.map(ds => {
        //                     let district = candidates.find(cd => cd.district_id == ds.districtId);

        //                     this.ridingRowData.push({
        //                         districtId: ds.districtId,
        //                         ridingName: ds.districtName,
        //                         candidateNames: district.candidates.map(cdt => cdt.name).join(),
        //                         candidates: district.candidates
        //                     })
        //                 })

        //                 this.ridingRowData = [...this.ridingRowData];
        //                 this.selectRiding(this.ridingRowData[0]);

        //             }, err => {

        //             })
        //     }, err => {
        //     })
    }

    ngOnInit() {
        this.regionService.getRegions().subscribe(
            (data) => {

                console.log(data);
            },
            (err) => {

                console.log(err);
            }
        );
    }

    onRegionGridReady(params: GridReadyEvent<IRegionData>) {
        this.regionGridApi = params.api;
        //this.regionRowData = DUMMY_DATA.RegionData;
        this.fillRegionRowData();
    }

    fillRegionRowData() {
        this.regionService.getRegions().subscribe(data => {
                this.regionRowData = data.map(r => {
                    return {
                        ...r,
                        polls: r.region_id,
                        name: r.region_name_eng
                    }
                })
            },
            err => {
                console.log('overview error', err)
            });
        return this.regionRowData;
    }

    // onRidingGridReady(params: GridReadyEvent<IRidingData>) {
    //     this.ridingGridApi = params.api;
    //     this.overviewService.getAllDistricts().subscribe(
    //         districts => {
    //             this.overviewService.getDistrictVotes().subscribe(
    //                 candidates => {
    //                     districts = districts.splice(0, 10);
    //                     this.ridingRowData = [];
    //                     districts.map(ds => {
    //                         let district = candidates.find(cd => cd.district_id == ds.districtId);

    //                         this.ridingRowData.push({
    //                             districtId: ds.districtId,
    //                             ridingName: ds.districtName,
    //                             candidateNames: district.candidates.map(cdt => cdt.name).join(),
    //                             candidates: district.candidates
    //                         })
    //                     })

    //                     this.selectRiding(this.ridingRowData[0]);
    //                     this.manitobaRowData=this.ridingRowData[0].candidates;
    //                 }, err => {

    //                 })
    //         }, err => {

    //         })
    // }
    ngOnChanges(changes: SimpleChanges): void {
        const firstRowNode: IRowNode | undefined = this.ridingGridApi.getDisplayedRowAtIndex(0);
        if (firstRowNode) {
            firstRowNode.setSelected(true);
            this.onSelectionChanged({api: this.ridingGridApi});
        }
    }

    onRowDataChanged(params: any): void {
        const firstRowNode: IRowNode | undefined = this.ridingGridApi.getDisplayedRowAtIndex(0);
        if (firstRowNode) {
            firstRowNode.setSelected(true);
            this.onSelectionChanged({api: this.ridingGridApi});
        }
    }

    rendered: boolean;

    onRidingFirstDataRendered(): void {
        setTimeout(() => {
            this.ridingGridApi.sizeColumnsToFit();
            this.ridingGridApi.redrawRows();
            // Select the first row
            const firstRowNode: IRowNode | undefined = this.ridingGridApi.getDisplayedRowAtIndex(0);
            if (firstRowNode) {
                firstRowNode.setSelected(true);
                this.onSelectionChanged({api: this.ridingGridApi});
            }
        }, 500, true);
    }

    selectRidingId = '';
    cItems: any = [];

    selectRiding(riding) {
        this.selectedRiding = riding;
        var candidateItems = [];
        this.cItems = [];
        this.overviewService.getRidings(this.regionId, riding.districtId).subscribe(
            result => {
                this.last_updated = result.last_updated;
                candidateItems = result.candidates.map(cd => {
                    return {
                        ...cd,
                        "name": cd.firstname + ' ' + cd.lastname,
                        "party": cd.party_short_eng,
                        "votes": cd.votes,
                        "vote_percentage": Math.round((cd.votes / result.total_votes) * 100).toFixed(1) + '%',
                        "margin": cd.margin
                    }
                })
                this.cItems = [...candidateItems];
                this.manitobaRowData = candidateItems;
                this.manitobaGridOptions.api?.redrawRows();
                setTimeout(() => {
                    // dynamicallyDrawPieChart
                    this.pieOptions = getRegionPieChart(this.manitobaRowData, this.pieOptions);
                    //dynamicallyDrawLineGraph
                    this.options = getRegionLineGraph(this.manitobaRowData, this.options);

                    //dynamicallyDrawBarChart
                    this.optionsBar = getRegionBarChart(this.manitobaRowData, this.optionsBar);
                }, 500, true);
            }, err => {

            })
        console.log('**********this.selectedRiding.candidates', riding)

        setTimeout(() => {
            // dynamicallyDrawPieChart
            this.pieOptions = getRegionPieChart(this.manitobaRowData, this.pieOptions);
            //dynamicallyDrawLineGraph
            this.options = getRegionLineGraph(this.manitobaRowData, this.options);

            //dynamicallyDrawBarChart
            this.optionsBar = getRegionBarChart(this.manitobaRowData, this.optionsBar);
        }, 500, true);

        /*setInterval(() => {
            if (this.router.url === '/ers/region') {
                var candidateItems = [];
                this.overviewService.getRidingsLiveData(this.regionId, riding.districtId).subscribe(
                    result => {
                        //this.last_updated=result.last_updated;

                        result.candidates.map(cd => {
                            candidateItems = this.cItems.find((item, i) => {
                                return (item.candidate_id == cd.candidate_id) ? {
                                    "name": item.firstname,
                                    "party": item.party_short_eng,
                                    "votes": cd.votes,
                                    "vote_percentage": `${Math.round((cd.votes / result.total_votes) * 100).toFixed(1)}%`,
                                    "margin": cd.margin
                                } : {
                                    "name": item.firstname,
                                    "party": item.party_short_eng,
                                    "votes": item.votes,
                                    "vote_percentage": item.vote_percentage,
                                    "margin": item.margin
                                };
                            })

                        })
                        this.manitobaRowData = candidateItems;
                        this.manitobaGridOptions.api?.redrawRows();// setRowData(this.manitobaRowData);
                    }, err => {

                    })
            }
        }, 5000)*/
    }

    manitobaOnGridReady(params: GridReadyEvent<any>) {
        // this.manitobaGridApi = params.api;
    }


    onSubmitSelectRegion() {
    }

    onRidingOrRegionSearch() {
        this.regionRowData = [];
        this.ridingRowData = [];
        this.storeRidingData[0].map(data => {
            if (data.region_name_eng.toLowerCase().includes(this.submenuSearchText.toLowerCase())
                || data.riding_name_eng.toLowerCase().includes(this.submenuSearchText.toLowerCase())
                || data.riding_id.toString().toLowerCase().includes(this.submenuSearchText.toLowerCase())) {
                if (this.regionRowData.length === 0) {
                    this.regionRowData.push({
                        "polls": data.region_id,
                        "name": data.region_name_eng
                    })
                }
                var reg = (this.regionRowData.some(reg => reg.polls != data.region_id && reg.name != data.region_name_eng))
                if (reg)
                    this.regionRowData.push({
                        "polls": data.region_id,
                        "name": data.region_name_eng
                    })
                if (this.ridingRowData.length === 0) {
                    this.ridingRowData.push({
                        "districtId": data.riding_id,
                        "ridingName": data.riding_name_eng
                    })
                }
                var rid = (this.ridingRowData.some(reg => reg.districtId != data.riding_id && reg.ridingName != data.riding_name_eng))
                if (rid)
                    this.ridingRowData.push({
                        "districtId": data.riding_id,
                        "ridingName": data.riding_name_eng
                    })
            }
        })
        this.regionRowData = this.regionRowData.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.polls === value.polls && t.name === value.name
            ))
        )
        this.ridingRowData = this.ridingRowData.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.districtId === value.districtId && t.ridingName === value.ridingName
            ))
        )

        setTimeout(() => {
            const firstRegionRowNode: IRowNode | undefined = this.regionGridApi.getDisplayedRowAtIndex(0);
            if (firstRegionRowNode) {
                firstRegionRowNode.setSelected(true);
            }

            const firstRowNode: IRowNode | undefined = this.ridingGridApi.getDisplayedRowAtIndex(0);
            if (firstRowNode) {
                firstRowNode.setSelected(true);
            }

        }, 500)
    }

    clearSearch() {
        this.submenuSearchText;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.setColumnDefs();
    }

    setColumnDefs() {
        const screenWidth = window.innerWidth;
        //alert("screenWidth: "+screenWidth);
        if (screenWidth < 988) {
            this.manitobaColumnDefs = [
                {
                    headerName: "Candidate Name",
                    field: "firstname",
                    sortable: true,
                    filter: true,
                    width: 200, pivot: true, type: 'dimension',
                    headerClass: "ag-custom-header",
                },
                {
                    headerName: "Party",
                    field: "party_short_eng",
                    sortable: true,
                    filter: true,
                    width: 100, pivot: true, type: 'dimension',
                    headerClass: "ag-custom-header",
                    cellRendererFramework: PartyCardComponent,
                    cellRendererParams: (params) => ({
                        partyData: {
                            color: getPartyColor(params.value),
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
                    width: 100, pivot: true, type: 'dimension',
                    headerClass: "ag-custom-header",
                },
                {
                    headerName: "%",
                    field: "vote_percentage",
                    sortable: true,
                    filter: true,
                    width: 100, pivot: true, type: 'dimension',
                    headerClass: "ag-custom-header",
                },
                {
                    headerName: "Margin",
                    field: "margin",
                    sortable: true,
                    filter: true,
                    width: 100, pivot: true, type: 'dimension',
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
                            color: getPartyColor(params.value),
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
