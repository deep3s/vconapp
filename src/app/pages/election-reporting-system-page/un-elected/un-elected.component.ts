import { Component, HostListener, OnInit } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import {
    ColDef,
    GridApi,
    GridOptions,
    GridReadyEvent
} from "ag-grid-community";
import { ApplicationService } from "src/app/services/application/application.service";
import { ElectionReportingService } from "src/app/services/election-reporting/election-reporting.service";
import { UnelectedService } from 'src/app/services/un-elected/unelected.service';
import { OverviewService } from "../../../services/overview/overview.service";
import { UNELECTED_CARDS } from '../../../shared/card-constants';
import { getDefaultColDef, getRidingStatusData, HandleColumnVisibleChange, RIDING_STATUS_LIST, UnElectedMarginColor, reformatDate } from "../../../shared/constants";
import { DUMMY_DATA } from "../../../shared/dummyData";
import { getPartyColor } from "../../../shared/parties-constants";
import { PartyCardComponent } from "../party-card/party-card.component";
import { RidingEyeCardComponent } from "../riding-eye-card/riding-eye-card.component";
import { RidingStatusCardComponent } from "../riding-status-card/riding-status-card.component";
import { StatusCardComponent } from "../status-card/status-card.component";
import { TableLegendModalComponent } from './table-legend-modal/table-legend-modal.component';
import {Router} from "@angular/router";

interface IVotingData {
    id: number;
    party: string;
    votes: string;
    pop: string;
    elected: number;
    leading: number;
    el: number;
    elPercentage: string;
}

interface IUndecidedOrCalledData {
    district_id: string;
    name: string;
    party: string;
    votes: string;
    vote_percentage: string;
    margin: string;
    total_polls: string;
    reported_polls: string;
    percentage_reported: string;
    status: string;
    lastReport: string;
}

@Component({
    selector: "app-un-elected",
    templateUrl: "./un-elected.component.html",
    styleUrls: ["./un-elected.component.scss"],
})
export class UnElectedComponent implements OnInit {
    tableLegands = RIDING_STATUS_LIST;//DUMMY_DATA.TableLegands;
    submenuSearchText = "";
    appliedThemeClassOnTable = "ag-theme-material";
    status = {
        KILLED: 'KILLED',
        RECONSIDER: 'RECONSIDER',
        ELECTED: 'ELECTED'
    }

    defaultColDef = {
        flex: 1,
        minWidth: 30,
        resizable: true,
    };
    private votingGridApi!: GridApi<IVotingData>;
    votingGridOptions: GridOptions = {};
    public votingRowData!: any[];

    private undecidedRidingsGridApi;
    private undecidedRidingsGridColumnApi;
    undecidedRidingsGridOptions: GridOptions = {};
    public undecidedRidingsRowData!: any[];

    private calledRidingsGridApi;
    private calledRidingsGridColumnApi;
    calledRidingsGridOptions: GridOptions = {};
    public calledRidingsRowData!: any[];

    votingColumnDefs: ColDef[];

    undecidedRidingsColumnDefs: ColDef[];

    calledRidingsColumnDefs: ColDef[];

    constructor(
        public applicationService: ApplicationService,
        private electionReportingService: ElectionReportingService,
        public router: Router,
        private unelectedService: UnelectedService,
        private overviewService: OverviewService,
        public dialog: MatDialog,

    ) {
        this.setColumnDefs();
    }

    ngOnInit(): void {
        this.votingGridOptions = {
            columnDefs: this.votingColumnDefs,
            rowData: this.votingRowData,
            defaultColDef: getDefaultColDef(),
            suppressRowClickSelection: true,
            rowSelection: "multiple",
            suppressMovableColumns: true,
            onColumnVisible: (params) => HandleColumnVisibleChange(params),
        };
        this.undecidedRidingsGridOptions = {
            columnDefs: this.undecidedRidingsColumnDefs,
            rowData: this.undecidedRidingsRowData,
            defaultColDef: getDefaultColDef(),
            suppressRowClickSelection: true,
            rowSelection: "multiple",
            suppressMovableColumns: true,
            onColumnVisible: (params) => HandleColumnVisibleChange(params),
            rowHeight: 30,
            getRowStyle: this.changeRowColor
        };
        this.calledRidingsGridOptions = {
            columnDefs: this.calledRidingsColumnDefs,
            rowData: this.calledRidingsRowData,
            defaultColDef: getDefaultColDef(),
            suppressRowClickSelection: true,
            rowSelection: "multiple",
            suppressMovableColumns: true,
            onColumnVisible: (params) => HandleColumnVisibleChange(params),
            rowHeight: 30
        };
        this.applicationService.getDarkMode().subscribe((isDarkMode) => {
            this.appliedThemeClassOnTable =
                isDarkMode !== undefined && !isDarkMode
                    ? "ag-theme-alpine-dark"
                    : "ag-theme-material";
        });

    }
    //    changeRowColor(params) {
    //         if (params.data.party === 'PC') {
    //             return { 'background-color': '#red' };
    //         }
    //     }
    changeRowColor(params: any): { 'color': string } | undefined {
        if (params.data != undefined) {
            if (params.data.party == 'PC') {
                return { 'color': 'rgb(43, 86, 159)' };
            }
            else if (params.data.party == 'MLP') {
                return { 'color': 'rgb(215, 25, 32)' };
            }
            else if (params.data.party == 'GPM') {
                return { 'color': 'rgb(0, 162, 34)' };
            }
        }
        return { 'color': 'rgb(215, 25, 32)' };
    }
    getVotingDetails() {
        this.unelectedService.getVotingDetails().subscribe(data => {
            this.votingRowData = data;
        }, err => console.log(err));
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

    performKilledAction(params: any) {
        const rowIndex = params.node.rowIndex;
        const rowData = params.node.data;
        var killedRecord = rowData;
        killedRecord.status = "KILLED";

        var data = {
            "election_id": "MB23",
            "riding_id": killedRecord.districtId
        }
        this.unelectedService.updateElectionKilledActions(data).subscribe(r => {
            this.fillUndecidedAndDecidedRidings();
        }, err => {
            console.log(err);
        })
        // this.calledRidingsRowData.splice(rowIndex, 1);
        // this.calledRidingsGridApi.setRowData(this.calledRidingsRowData); // Update ag-Grid data

        // this.undecidedRidingsRowData.push(killedRecord);
        // this.undecidedRidingsGridApi.setRowData(this.undecidedRidingsRowData);
    }

    performReconsiderAction(params: any) {
        const rowIndex = params.node.rowIndex;
        const rowData = params.node.data;
        var reconsiderRecord = rowData;
        reconsiderRecord.status = "RECONSIDER";

        var data = {
            "election_id": "MB23",
            "riding_id": reconsiderRecord.districtId
        }
        this.unelectedService.updateElectionReconsiderActions(data).subscribe(r => {
            this.fillUndecidedAndDecidedRidings();
        }, err => {
            console.log(err);
        })
        // this.calledRidingsRowData[rowIndex] = reconsiderRecord;
        // this.calledRidingsGridApi.setRowData(this.calledRidingsRowData);
    }

    performElectAction(params: any) {
        const rowIndex = params.node.rowIndex;
        const rowData = params.node.data;
        var electedRecord = rowData;
        electedRecord.status = "ELECTED";

        var d = {
            "election_id": "MB23",
            "riding_id": electedRecord.districtId
        }
        this.unelectedService.updateElectionCallActions(d).subscribe(r => {
            this.fillUndecidedAndDecidedRidings();
        }, err => {
            console.log(err);
        })
        // this.undecidedRidingsRowData.splice(rowIndex, 1);
        // this.undecidedRidingsGridApi.setRowData(this.undecidedRidingsRowData); // Update ag-Grid data

        // this.calledRidingsRowData.push(electedRecord);
        // this.calledRidingsGridApi.setRowData(this.calledRidingsRowData);
    }

    fillUndecidedAndDecidedRidings(liveData=false) {
       // this.undecidedRidingsGridApi.setRowData(this.undecidedRidingsRowData);
       // this.calledRidingsGridApi.setRowData(this.calledRidingsRowData);
        this.unelectedService.getUndecidedCalledRidings(liveData).subscribe(data => {
            this.undecidedRidingsRowData = [];
            this.calledRidingsRowData = [];
            data.map((c) => {
                if (c.elected_candidate_id == 0)
                    this.undecidedRidingsRowData.push({
                        elected_candidate_id: c.elected_candidate_id,
                        districtId: c.riding_id,
                        ridingName: c.riding_name_eng,
                        party: (c.leading_parties == null || c.leading_parties.length==0) ? 'N/A' : c.leading_parties[0].party_short_eng,
                        leading_parties: c.leading_parties,
                        reported_polls: c.polls_reporting,
                        total_polls: c.total_polls,
                        percentage_reported: Math.round(c.polls_reporting / c.total_polls * 100).toFixed(0),
                        status: 'DEFAULT',
                        margin: (c.leading_candidate_margin == '') ? '0' : c.leading_candidate_margin,
                        lastReport: reformatDate(c.last_updated)
                    })
                else
                    this.calledRidingsRowData.push({
                        elected_candidate_id: c.elected_candidate_id,
                        districtId: c.riding_id,
                        ridingName: c.riding_name_eng,
                        party: c.elected_party_short_eng,
                        reported_polls: c.polls_reporting,
                        elected_party_short_eng: c.elected_party_short_eng,
                        total_polls: c.total_polls,
                        percentage_reported: Math.round(c.polls_reporting / c.total_polls * 100).toFixed(0),
                        status: 'DEFAULT',
                        margin: (c.leading_candidate_margin == '') ? '0' : c.leading_candidate_margin,
                        lastReport: reformatDate(c.last_updated)
                    })
            }
            )

            console.log('********this.undecidedRidingsRowData', this.undecidedRidingsRowData)

            // this.calledRidingsRowData=this.undecidedRidingsRowData.filter(u=>{
            //     return u.elected_candidate_id>0;
            // });

            // Update both grids with a timeout to avoid rendering conflicts
        setTimeout(() => {
            if (this.undecidedRidingsGridApi) {
                this.undecidedRidingsGridApi.setRowData(this.undecidedRidingsRowData);
            }
            if (this.calledRidingsGridApi) {
                this.calledRidingsGridApi.setRowData(this.calledRidingsRowData);
            }
        }, 0);
            //this.electionReportingService.updateElectionReportingTiles(UNELECTED_CARDS);
            //params.api.sizeColumnsToFit();
            //this.getRidings();
        }, err => console.log(err));
    }

    votingOnGridReady(params: GridReadyEvent<IVotingData>) {
        this.votingGridApi = params.api;
        // this.getVotingDetails();
        this.votingRowData = DUMMY_DATA.UnElectedVotingData;
    }

    checkBothGridsReady() {
        if (this.undecidedRidingsGridApi && this.calledRidingsGridApi) {
            // Both grids are ready, now load the data
            this.fillUndecidedAndDecidedRidings();

            setInterval(() => {
                if(this.router.url === '/ers/unElected'){
                    //this.fillUndecidedAndDecidedRidings();
                }
            }, 5000)

        }
    }

    unDecidedOnGridReady(params: GridReadyEvent<IUndecidedOrCalledData>) {
        // this.undecidedRidingsRowData = [];
        // this.calledRidingsRowData = [];
        this.undecidedRidingsGridApi = params.api;
        this.undecidedRidingsGridColumnApi = params.columnApi;
        this.checkBothGridsReady();

    }

    fillCalledRidings(){

    }
    calledOnGridReady(params: GridReadyEvent<IUndecidedOrCalledData>) {
        // this.calledRidingsRowData = [];
        this.calledRidingsGridApi = params.api;
        this.calledRidingsGridColumnApi = params.columnApi;
        this.checkBothGridsReady();

    }

    onSubmitSelectRegion() {
    }

    onQuickFilterChanged() {
        this.votingGridApi.setQuickFilter(
            (document.getElementById("quickFilter") as HTMLInputElement).value
        );
        this.undecidedRidingsGridApi.setQuickFilter(
            (document.getElementById("quickFilter") as HTMLInputElement).value
        );
        this.calledRidingsGridApi.setQuickFilter(
            (document.getElementById("quickFilter") as HTMLInputElement).value
        );
    }

    clearSearch() {
        this.submenuSearchText;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.setColumnDefs();
        this.undecidedRidingsGridApi.setColumnDefs(this.undecidedRidingsColumnDefs);
        this.undecidedRidingsGridColumnApi.autoSizeAllColumns();
        this.calledRidingsGridApi.setColumnDefs(this.calledRidingsColumnDefs);
        this.calledRidingsGridColumnApi.autoSizeAllColumns();
    }

    setColumnDefs() {
        //alert(window.innerWidth);
        this.setVotingColumnDefs();
        this.setUndecidedRidingsColumnDefs();
        this.setCalledRidingsColumnDefs();
    }

    setVotingColumnDefs() {
        if (window.innerWidth < 1120) {
            this.votingColumnDefs = [
                {
                    headerName: "Party",
                    field: "party",
                    sortable: true,
                    filter: true,
                    width: 150, pivot: true, type: 'dimension',
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
                    width: 150, pivot: true, type: 'dimension',
                    headerClass: "ag-custom-header",
                },
                {
                    headerName: "Popular Vote %",
                    field: "pop",
                    sortable: true,
                    filter: true,
                    width: 200, pivot: true, type: 'dimension',
                    headerClass: "ag-custom-header",
                },
                {
                    headerName: "Elected",
                    field: "elected",
                    sortable: true,
                    filter: true,
                    width: 150, pivot: true, type: 'dimension',
                    headerClass: "ag-custom-header",
                },
                {
                    headerName: "Leading",
                    field: "leading",
                    sortable: true,
                    filter: true,
                    width: 150, pivot: true, type: 'dimension',
                    headerClass: "ag-custom-header",
                },
                {
                    headerName: "L&E",
                    field: "el",
                    sortable: true,
                    filter: true,
                    width: 150, pivot: true, type: 'dimension',
                    headerClass: "ag-custom-header",
                },
                {
                    headerName: "L&E %",
                    field: "elPercentage",
                    sortable: true,
                    filter: true,
                    width: 150, pivot: true, type: 'dimension',
                    headerClass: "ag-custom-header",
                },
            ]
        } else {
            this.votingColumnDefs = [
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
                    headerName: "Popular Vote %",
                    field: "pop",
                    sortable: true,
                    filter: true,
                    flex: 1, // Enable auto-sizing for the column
                    headerClass: "ag-custom-header",
                },
                {
                    headerName: "Elected",
                    field: "elected",
                    sortable: true,
                    filter: true,
                    flex: 1, // Enable auto-sizing for the column
                    headerClass: "ag-custom-header",
                },
                {
                    headerName: "Leading",
                    field: "leading",
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
                    field: "elPercentage",
                    sortable: true,
                    filter: true,
                    flex: 1, // Enable auto-sizing for the column
                    headerClass: "ag-custom-header",
                },
            ]
        }
    }
    getCellStyle(params: any) {
        if (params.data != undefined) {
            if (params.data.party == 'PC') {
                return { color: 'rgb(43, 86, 159)', fontWeight: 'normal' };
            }
            else if (params.data.party == 'MLP') {
                return { color: 'rgb(215, 25, 32)', fontWeight: 'normal' };
            }
            else if (params.data.party == 'GPM') {
                return { color: 'rgb(0, 162, 34)', fontWeight: 'normal' };
            }
            else if (params.data.party == 'NDP') {
                return { color: 'rgb(207, 119, 46)', fontWeight: 'normal' };
            }
            else if (params.data.party == 'GPM') {
                return { color: 'rgb(0, 162, 34)', fontWeight: 'normal' };
            }
        }
        return { color: '#000', fontWeight: 'normal' }; // Default style
    }

    setUndecidedRidingsColumnDefs() {
        if (window.innerWidth < 1707) {
            this.undecidedRidingsColumnDefs = [
                {
                    headerName: "#",
                    field: "districtId",
                    sortable: true,
                    filter: true,
                    width: 80,
                    cellStyle: this.getCellStyle,
                    headerClass: "ag-custom-header"
                },
                {
                    headerName: "Riding Name",
                    field: "ridingName",
                    sortable: true,
                    filter: true,
                    width: 150,
                    cellStyle: this.getCellStyle,
                    headerClass: "ag-custom-header",
                    cellRendererFramework: RidingEyeCardComponent,
                    cellRendererParams: (params) => ({
                        statusData: {
                            label: params?.value || "",
                        },
                    }),
                },
                {
                    headerName: "Leading Parties",
                    field: "party",
                    sortable: true,
                    filter: true,
                    width: 200,
                    cellStyle: this.getCellStyle,
                    headerClass: "ag-custom-header",
                    cellRendererFramework: PartyCardComponent,
                    cellRendererParams: (params) => ({
                        partyData: params.data.leading_parties.map(lp => {
                            return {
                                color: getPartyColor(lp.party_short_eng),
                                label: lp.party_short_eng
                            }
                        }),
                    }),
                },
                {
                    headerName: "Polls Reporting",
                    field: "reported_polls",
                    sortable: true,
                    filter: true,
                    width: 145,
                    cellStyle: this.getCellStyle,
                    headerClass: "ag-custom-header",
                    cellRendererFramework: StatusCardComponent,
                    cellRendererParams: (params) => {
                        return {
                            statusData: {
                                color: "", // Default color
                                iconName: "", // Default icon
                                label: (params.data != undefined) ? params?.value + "/" + params.data.total_polls + "" + "  " + "(" + params.data.percentage_reported + "%" + ")" || "" : "",
                            },
                        };
                    },
                },
                {
                    headerName: "Margin",
                    field: "margin",
                    sortable: true,
                    filter: true,
                    width: 87,
                    headerClass: "ag-custom-header",
                    cellStyle: this.getCellStyle,
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
            this.undecidedRidingsColumnDefs = [
                {
                    headerName: "#",
                    field: "districtId",
                    sortable: true,
                    filter: true,
                    width: 80,
                    cellStyle: this.getCellStyle,
                    headerClass: "ag-custom-header"
                },
                {
                    headerName: "Riding Name",
                    field: "ridingName",
                    sortable: true,
                    filter: true,
                    flex: 1, // Enable auto-sizing for the column
                    cellStyle: this.getCellStyle,
                    headerClass: "ag-custom-header",
                    cellRendererFramework: RidingEyeCardComponent,
                    cellRendererParams: (params) => ({
                        statusData: {
                            label: params?.value || "",
                        },
                    }),
                },
                {
                    headerName: "Leading Parties",
                    field: "party",
                    sortable: true,
                    filter: true,
                    flex: 1, // Enable auto-sizing for the column
                    cellStyle: this.getCellStyle,
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
                    cellStyle: this.getCellStyle,
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
                    headerName: "Margin",
                    field: "margin",
                    sortable: true,
                    filter: true,
                    flex: 1, // Enable auto-sizing for the column
                    headerClass: "ag-custom-header",
                    //cellStyle: { fontWeight: 'normal' },
                    cellStyle: this.getCellStyle,
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

    setCalledRidingsColumnDefs() {
        //calledRidingsColumnDefs
        if (window.innerWidth < 1707) {
            this.calledRidingsColumnDefs = [
                {
                    headerName: "#",
                    field: "districtId",
                    sortable: true,
                    filter: true,
                    width: 80, pivot: true, type: 'dimension',
                    cellStyle: this.getCellStyle,
                    headerClass: "ag-custom-header"
                },
                {
                    headerName: "Riding Name",
                    field: "ridingName",
                    sortable: true,
                    filter: true,
                    width: 150, pivot: true, type: 'dimension',
                    cellStyle: this.getCellStyle,
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
                    width: 100, pivot: true, type: 'dimension',
                    cellStyle: this.getCellStyle,
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
                    width: 145, pivot: true, type: 'dimension',
                    cellStyle: this.getCellStyle,
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
                    width: 80, pivot: true, type: 'dimension',
                    headerClass: "ag-custom-header",
                    cellStyle: { fontWeight: 'normal', display: 'flex' },
                    cellRendererFramework: RidingStatusCardComponent,
                    cellRendererParams: (params) => ({
                        statusData: getRidingStatusData(params.data.elected_candidate_id),
                    }),
                },
                {
                    headerName: "Margin",
                    field: "margin",
                    sortable: true,
                    filter: true,
                    width: 87, pivot: true, type: 'dimension',
                    headerClass: "ag-custom-header",
                    // cellStyle: { fontWeight: 'normal' },
                    cellStyle: this.getCellStyle,
                    cellRenderer: (params) => {

                        let statusData = {
                            color: UnElectedMarginColor(params.value),
                            label: params.value,
                        };

                        const iconHtml = `<span style="display: flex; align-items: center; justify-content: flex-start;">${params.value}</span>`;

                        return iconHtml;
                    },
                },
                {
                    headerName: "Last Report",
                    field: "lastReport",
                    sortable: true,
                    filter: true,
                    width: 120, pivot: true, type: 'dimension',
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
            this.calledRidingsColumnDefs = [
                {
                    headerName: "#",
                    field: "districtId",
                    sortable: true,
                    filter: true,
                    width: 80, pivot: true, type: 'dimension',
                    cellStyle: this.getCellStyle,
                    headerClass: "ag-custom-header"
                },
                {
                    headerName: "Riding Name",
                    field: "ridingName",
                    sortable: true,
                    filter: true,
                    flex: 1, // Enable auto-sizing for the column
                    cellStyle: this.getCellStyle,
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
                    cellStyle: this.getCellStyle,
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
                    cellStyle: this.getCellStyle,
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
                    // cellStyle: { fontWeight: 'normal' },
                    cellStyle: this.getCellStyle,
                    cellRenderer: (params) => {
                        let statusData = {
                            label: params.value,
                        };

                        const iconHtml = `<span style="display: flex; align-items: center; justify-content: flex-start;">${params.value}</span>`;

                        return iconHtml;
                        // let statusData = {
                        //     color: UnElectedMarginColor(params.value),
                        //     label: params.value,
                        // };

                        // const iconHtml = `<span style="display: flex; align-items: center; justify-content: flex-start; color: ${statusData.color};">${statusData.label}</span>`;

                        // return iconHtml;
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

    // Conditional styling function for row styles
    getRowStyle(params: any) {
        if (params.data.party == 'PC') {
            return { backgroundColor: 'lightcoral' }; // Style if price > 50000
        }
        return null; // Default style
    }

    // Conditional styling function for row classes
    getRowClass(params: any) {
        if (params.data.party == 'PC') {
            return 'high-price'; // CSS class if price > 50000
        }
        return null; // Default class
    }

    openCalledRidingsLegendModal() {
        this.dialog.open(TableLegendModalComponent, {
            width: '500px',
            disableClose: true,
            data: {
                title: "Called Ridings Table Legend"
            }
        });
        return;
    }

    openUndecidedRidingsLegendModal() {
        this.dialog.open(TableLegendModalComponent, {
            width: '500px',
            disableClose: true,
            data: {
                title: "Undecided Ridings Table Legend"
            }
        });
        return;
    }
}
