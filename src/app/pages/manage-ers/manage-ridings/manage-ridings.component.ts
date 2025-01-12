import {Component, OnInit} from "@angular/core";
import {
    ColDef,
    GridApi,
    GridOptions,
    GridReadyEvent, ISelectCellEditorParams, ITextCellEditorParams,IRowNode
} from "ag-grid-community";
import {PartyCardComponent} from "../../election-reporting-system-page/party-card/party-card.component";
import {AgChartOptions} from "ag-charts-community";
import {ApplicationService} from "../../../services/application/application.service";
import {OverviewService} from "../../../services/overview/overview.service";
import {CandidateNamesComponent} from "../../election-reporting-system-page/ridings/candidate-names/candidate-names.component";
import { DUMMY_DATA } from "../../../shared/dummyData";
import { getPartyColor } from "../../../shared/parties-constants";
import {PARTIES} from "../../../shared/parties-constants";
import { HandleColumnVisibleChange, ALERT_CONSTANTS, getDefaultColDef } from '../../../shared/constants';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAlertModelComponent } from "../delete-alert-model/delete-alert-model.component";
import { EditRecordModelComponent } from "../edit-record-model/edit-record-model.component";


@Component({
    selector: "app-manage-ridings",
    templateUrl: "./manage-ridings.component.html",
    styleUrls: ["./manage-ridings.component.scss"],
})
export class ManageRidingsComponent implements OnInit {
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
    selectedRowsPerPage = 10;
    currentAgGridPage = 0;
    totalAgGridPages = 0;
    ridingColumnDefs: ColDef[] = [
        {
            headerName: "Id",
            field: "districtId",
            sortable: true,
            filter: true,
            flex: 1, // Enable auto-sizing for the column
            headerClass: "ag-custom-header",
        },
        {
            headerName: "Riding Name",
            field: "ridingName",
            sortable: true,
            filter: true,
            flex: 2, // Enable auto-sizing for the column
            headerClass: "ag-custom-header",
        },
        {
            headerName: "Candidate Names",
            field: "candidateNames",
            sortable: true,
            filter: true,
            flex: 4, // Enable auto-sizing for the column
            headerClass: "ag-custom-header",
            cellRenderer: CandidateNamesComponent
        },
    ];

    private ridingGridApi!: GridApi<any>;
    ridingGridOptions: GridOptions = {};
    public originalRidingRowData!: any[];
    public ridingRowData!: any[];

    private manitobaGridApi!: GridApi<any>;
    manitobaGridOptions: GridOptions = {};
    public manitobaRowData!: any[];
    manitobaColumnDefs: ColDef[] = [
        {
            headerName: "Candidate Name",
            field: "name",
            sortable: true,
           // editable: true,
            cellEditor: 'agTextCellEditor',
            cellEditorParams: {
                maxLength: 180,
            } as ITextCellEditorParams,
            filter: true,
            flex: 3, // Enable auto-sizing for the column
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
          //  editable: true,
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: ['PCP', "NDP", "MLP", "GPM", "IND"],
            } as ISelectCellEditorParams,
        },
        {
            headerName: 'Action',
            headerClass: "ag-custom-header",
            flex: 1, // Enable auto-sizing for the column
            cellRenderer: (params) => {
                // Create a container for the icon
                const container = document.createElement('div');
                container.className = 'icon-container'; // Class for alignment

                // Create the editicon element
                const editIcon = document.createElement('i');
                editIcon.className = 'ri-close-circle-fill ri-pencil-line';
                editIcon.style.paddingRight = '10px'; // Add padding-right
                //editIcon.title = 'Edit'; // Tooltip text
                editIcon.addEventListener('click', () => this.onCandidateEditRow(params));
                container.appendChild(editIcon);

                // Create the remove icon element
                const removeIcon = document.createElement('i');
                removeIcon.className = 'ri-close-circle-fill icon-remove';
                //removeIcon.title = 'Delete'; // Tooltip text
               // icon="padding:2px;";
               removeIcon.addEventListener('click', () => this.onRemoveRow(params));

                container.appendChild(removeIcon);
                return container;
            }
          }
    ];
    selectedViewOption: any = {};
    viewOptions = [
        {icon: "ssid_chart", selected: true},
        {icon: "bar_chart", selected: false},
    ];
    selectedRiding: any = {};
    ridingSearchText = "";

    allPrevs: any = DUMMY_DATA.RidingData[0].candidates;
    //[{id: "1", name: "Carlo Roleu"}];
    selectedPrev: any = {};

    allParties: any = PARTIES.partiesDropDown;
    // [
    //     {id: "1", name: "PCP"},
    //     {id: "2", name: "NDP"},
    //     {id: "3", name: "MLP"},
    //     {id: "4", name: "GPM"}
    // ];
    selectedParty: any = {};

    allWinners: any =  PARTIES.partiesDropDown;
    // [
    //     {id: "PCP", name: "PCP"},
    //     {id: "GP", name: "PCP"},
    // ];
    selectedWinner: any = {};

    allCallers: any = [{id: "1", name: "Tyler Griffin"}];
    selectedCaller: any = {};
    callerNotes = '';
    addCandidateName = '';
    addCandidateParty: any = '';
    showAddCandidateSection = false;

    constructor(public applicationService: ApplicationService,
                public overviewService: OverviewService,   
                public dialog: MatDialog) {
    }

    // Function to handle button click events
    // onCellClicked(event: any): void {
    //     alert("x");
    //     if (event.event.target && event.event.target.dataset.actionType === 'remove') {
    //         this.removeRow(event.node);
    //     }
    // }

    // // Function to remove the row
    // onRemoveRow(node: any): void {
    //     const rowIndex = node.rowIndex;
    //     this.manitobaRowData.splice(rowIndex, 1);
    //     node.gridOptions.api.setRowData(this.manitobaRowData);
    // }

    onRemoveRow(params: any): void {
        const rowIndex = params.node.rowIndex;
        // this.manitobaRowData.splice(rowIndex, 1);
        // params.api.setRowData(this.manitobaRowData);
        const data = params.data;
        const dialogRef = this.dialog.open(DeleteAlertModelComponent, {
            width: '700px',
            disableClose: true, 
            data: {
              name: "Alert",
              message :`${ALERT_CONSTANTS.deleteCandidate} "${data.name}"?`
            }
          });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.manitobaRowData.splice(rowIndex, 1); 
                this.manitobaGridApi.setRowData(this.manitobaRowData); // Update ag-Grid data
            }
        });
      }

      onCandidateEditRow(params: any): void {
        const rowIndex = params.node.rowIndex;
        const candidateData = params.data;
        const dialogRef = this.dialog.open(EditRecordModelComponent, {
            width: '700px',
            disableClose: true, 
            data: {
                title: "Candidate",
                selecteRecord: candidateData
            },
          });

        dialogRef.afterClosed().subscribe(result => {
            debugger
            if (result) {
                this.manitobaRowData[rowIndex] = { ...result };
                this.manitobaGridApi.setRowData(this.manitobaRowData); // Update ag-Grid data
            }
        });
      }

    addCandidate() {
        const dialogRef = this.dialog.open(DeleteAlertModelComponent, {
            width: '700px',
            disableClose: true, 
            data: {
                name: "Alert",
                message: `${ALERT_CONSTANTS.addCandidate}`
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.manitobaRowData = [...this.manitobaRowData, {
                    id: this.manitobaRowData.length,
                    name: this.addCandidateName,
                    party: this.selectedParty
                }];
                this.showAddCandidateSection = false;
                this.manitobaGridApi.redrawRows();
            }
            else{
                this.showAddCandidateSection = false;
            }
        });
       
    }

    openAddCandidateSection() {
        this.showAddCandidateSection = true;
    }

    ngOnInit() {
        this.selectedCaller = this.allCallers[0];
        this.selectedWinner = this.allWinners[0];
        this.selectedPrev = this.allPrevs[0];
        this.selectedViewOption = this.viewOptions[0];
        this.ridingGridOptions = {
            columnDefs: this.ridingColumnDefs,
            rowData: this.ridingRowData,
            defaultColDef: getDefaultColDef(),
            suppressRowClickSelection: true,
            rowSelection: "single",
            suppressMovableColumns: true,
            onColumnVisible: (params) => HandleColumnVisibleChange(params),
        };

        this.manitobaGridOptions = {
            columnDefs: this.manitobaColumnDefs,
            rowData: this.manitobaRowData,
            defaultColDef: getDefaultColDef(),
            suppressRowClickSelection: true,
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
    }

    onViewOptionChange(opt) {
        this.selectedViewOption = opt;
        this.viewOptions = this.viewOptions.map((item) => {
            item.selected = item.icon === opt.icon;

            return item;
        });
    }

    ridingOnGridReady(params: GridReadyEvent<any>) {
        this.ridingRowData = DUMMY_DATA.RidingData;
        this.ridingGridApi = params.api;
        this.overviewService.getAllDistricts().subscribe(
            districts => {
                this.originalRidingRowData = [];
                this.overviewService.getDistrictVotes().subscribe(
                    candidates => {
                        //districts = districts.splice(0, 20);
                        districts.map(ds => {
                            let district = candidates.find(cd => cd.district_id == ds.districtId);

                            this.originalRidingRowData.push({
                                districtId: ds.districtId,
                                ridingName: ds.districtName,
                                candidateNames: district.candidates.map(cdt => cdt.name).join(),
                                candidates: district.candidates
                            })
                        })

                        this.ridingRowData = [...this.originalRidingRowData];
                        this.selectRidingMethod(this.ridingRowData[0]);

                    }, err => {

                    })
            }, err => {
            })
    }

    selectRidingMethod(riding) {
        this.selectedRiding = riding;
        let candidates = this.selectedRiding.candidates;
        this.manitobaRowData = candidates;
    }

    manitobaOnGridReady(params: GridReadyEvent<any>) {
        this.manitobaGridApi = params.api;
    }

    // searchRidings() {
    //     if (!this.ridingSearchText) {
    //         this.ridingRowData = [...this.originalRidingRowData];

    //         return;
    //     }

    //     this.ridingRowData = this.originalRidingRowData.filter((rd) => {
    //         return (
    //             rd.ridingName
    //                 .toLowerCase()
    //                 .indexOf(this.ridingSearchText.toLowerCase()) > -1
    //             || rd.candidateNames
    //                 .toLowerCase()
    //                 .indexOf(this.ridingSearchText.toLowerCase()) > -1
    //         );
    //     });
    // }

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
        this.selectedRiding = params.api.getSelectedRows()[0];
        this.selectRidingMethod(params.api.getSelectedRows()[0]);
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
        setTimeout(
            () => {
                this.ridingGridApi.sizeColumnsToFit();
            // Select the first row
            const firstRowNode: IRowNode | undefined = this.ridingGridApi.getDisplayedRowAtIndex(0);
            if (firstRowNode) {
              firstRowNode.setSelected(true);
              this.onSelectionChanged({ api: this.ridingGridApi });
            }
            },
            500,
            true
        );
    }

    applyPrev() {
    }

    saveChanges() {
        let id = this.selectedRiding.districtId;
        let reqData = {
            "likely_winner": this.selectedWinner,
            "caller_notes": this.callerNotes,
            "caller_name": this.selectedCaller
        };

        this.overviewService.saveDistrict(id, reqData).subscribe(data => {

        }, err => {

        });
    }
}
