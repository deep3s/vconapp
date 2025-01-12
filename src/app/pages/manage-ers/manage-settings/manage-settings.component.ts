import {Component, OnInit} from '@angular/core';
import {
    ColDef,
    GridApi,
    GridOptions,
    GridReadyEvent,
    ISelectCellEditorParams,
} from "ag-grid-community";
import {ApplicationService} from "../../../services/application/application.service";
import {ColorPickerComponent} from "./color-picker-component/color-picker-component";
import {OverviewService} from "../../../services/overview/overview.service";
import { DUMMY_DATA } from "../../../shared/dummyData";
import { MANAGE_SETTINGS_CONSTANTS } from "../../../shared/manageSetting-constants";
import {PARTIES} from "../../../shared/parties-constants";
import { ALERT_CONSTANTS, HandleColumnVisibleChange, getDefaultColDef } from '../../../shared/constants';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAlertModelComponent } from "../delete-alert-model/delete-alert-model.component";
import { EditRecordModelComponent } from "../edit-record-model/edit-record-model.component";
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-manage-settings',
    templateUrl: './manage-settings.component.html',
    styleUrls: ['./manage-settings.component.scss']
})
export class ManageSettingsComponent implements OnInit {
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

    callers: string[] = DUMMY_DATA.ManageSetting_Callers;
    ridingColumnDefs: ColDef[] = [
        {
            headerName: "Riding Name",
            field: "ridingName",
            sortable: true,
            filter: true,
            flex: 1, // Enable auto-sizing for the column
            headerClass: "ag-custom-header",
        },
        {
            headerName: 'Caller',
            field: 'caller',
            editable: true,
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: this.callers,
            } as ISelectCellEditorParams,
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
            headerName: "Name",
            field: "name",
            sortable: true,
            filter: true,
            flex: 4, // Enable auto-sizing for the column
            headerClass: "ag-custom-header",
        },
        {
            headerName: "Color",
            field: "color",
            sortable: true,
            filter: true,
            flex: 1, // Enable auto-sizing for the column
            headerClass: "ag-custom-header",
            cellRendererFramework: ColorPickerComponent,
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
               editIcon.addEventListener('click', () => this.onPartyEditRow(params));
               container.appendChild(editIcon);

              // Create the icon element
              const icon = document.createElement('i');
              icon.className = 'ri-close-circle-fill icon-remove';
              icon.addEventListener('click', () => this.onPartyRemoveRow(params));
      
              container.appendChild(icon);
              return container;
            }
          }
    ];

    private callerGridApi!: GridApi<any>;
    callerGridOptions: GridOptions = {};
    public callerRowData!: any[];
    callerColumnDefs: ColDef[] = [
        {
            headerName: "Name",
            field: "name",
            sortable: true,
            filter: true,
            flex: 4, // Enable auto-sizing for the column
            headerClass: "ag-custom-header",
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
                editIcon.addEventListener('click', () => this.onCallerEditRow(params));
                container.appendChild(editIcon);

                // Create the icon element
                const icon = document.createElement('i');
                icon.className = 'ri-close-circle-fill icon-remove';
                icon.addEventListener('click', () => this.onCallerRemoveRow(params));

                container.appendChild(icon);
                return container;
            }
          }
    ];
    selectedViewOption: any = {};
    viewOptions = [
        {icon: 'ssid_chart', selected: true},
        {icon: 'bar_chart', selected: false},
    ];
    selectedRiding: any = {};
    ridingSearchText = '';

    warning_1: any = MANAGE_SETTINGS_CONSTANTS.Warning_1
    warning_2: any = MANAGE_SETTINGS_CONSTANTS.Warning_2
    warning_3: any = MANAGE_SETTINGS_CONSTANTS.Warning_3
    selectedWarning1: any = {};
    selectedWarning2: any = {};
    selectedWarning3: any = {};

    allCallers: any = [
        {id: '1', name: 'Tyler Griffin'},
    ]
    selectedCaller: any = {};

    margins = MANAGE_SETTINGS_CONSTANTS.Margins;

    times = MANAGE_SETTINGS_CONSTANTS.Times;

    addPartyName = '';
    addPartyColor: any = '';
    showAddPartySection = false;

    addCallerName = '';
    showAddCallerSection = false;

    constructor(public applicationService: ApplicationService,
                public overviewService: OverviewService,
                public dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.selectedCaller = this.allCallers[0];
        this.selectedWarning1 = this.warning_1[0];
        this.selectedWarning2 = this.warning_2[0];
        this.selectedWarning3 = this.warning_3[0];
        this.selectedViewOption = this.viewOptions[0];
        this.ridingGridOptions = {
            columnDefs: this.ridingColumnDefs,
            rowData: this.ridingRowData,
            defaultColDef: getDefaultColDef(),
            suppressRowClickSelection: true,
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

        this.callerGridOptions = {
            columnDefs: this.callerColumnDefs,
            rowData: this.callerRowData,
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

    onPartyRemoveRow(params: any): void {
        const rowIndex = params.node.rowIndex;
        const data = params.data;
        // this.manitobaRowData.splice(rowIndex, 1);
        // params.api.setRowData(this.manitobaRowData);
        const dialogRef = this.dialog.open(DeleteAlertModelComponent, {
            width: '700px',
            disableClose: true, 
            data: {
              name: "Alert",
              message :`${ALERT_CONSTANTS.deleteParty} "${data.name}"?`
            }
          });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.manitobaRowData.splice(rowIndex, 1); // Remove the row
                this.manitobaGridApi.setRowData(this.manitobaRowData); // Update ag-Grid data
                //this.manitobaGridApi.redrawRows();
            }
        });
    }

    onPartyEditRow(params: any): void {
        const rowIndex = params.node.rowIndex;
        const partyData = params.data;
        const dialogRef = this.dialog.open(EditRecordModelComponent, {
            width: '550px',
            disableClose: true, 
            data: {
                title: "Party",
                selecteRecord: partyData
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

    onCallerRemoveRow(params: any): void {
        const rowIndex = params.node.rowIndex;
        // this.callerRowData.splice(rowIndex, 1);
        // params.api.setRowData(this.callerRowData);
        const data = params.data;
        const dialogRef = this.dialog.open(DeleteAlertModelComponent, {
            width: '700px',
            disableClose: true, 
            data: {
              name: "Alert",
              message :`${ALERT_CONSTANTS.deleteCaller} "${data.name}"?`
            }
          });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.callerRowData.splice(rowIndex, 1); 
                this.callerGridApi.setRowData(this.callerRowData); // Update ag-Grid data
            }
        });
    }

    onCallerEditRow(params: any): void {
        const rowIndex = params.node.rowIndex;
        const callerData = params.data;
        const dialogRef = this.dialog.open(EditRecordModelComponent, {
            width: '550px',
            disableClose: true, 
            data: {
                title: "Caller",
                selecteRecord: callerData
            },
        });

        dialogRef.afterClosed().subscribe(result => {
            debugger
            if (result) {
                this.callerRowData[rowIndex] = { ...result };
                this.callerGridApi.setRowData(this.callerRowData); // Update ag-Grid data
            }
        });
    }

    addParty() {
        const dialogRef = this.dialog.open(DeleteAlertModelComponent, {
            width: '700px',
            disableClose: true, 
            data: {
                name: "Alert",
                message: `${ALERT_CONSTANTS.addParty}`
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                var addedRowColor = this.addPartyColor;
                if (addedRowColor == "") {
                    addedRowColor = "#000000";
                }
                this.manitobaRowData = [...this.manitobaRowData, {
                    id: this.manitobaRowData.length,
                    name: this.addPartyName,
                    color: addedRowColor
                }];
                this.showAddPartySection = false;
                this.manitobaGridApi.redrawRows();
            }
            else{
                this.showAddPartySection = false;
            }
        });
    }

    openAddPartySection() {
        this.addPartyName="";
        this.addPartyColor="";
        this.showAddPartySection = true;
    }

    openAddCallerSection() {
        this.showAddCallerSection = true;
    }

    addCaller() {
        const dialogRef = this.dialog.open(DeleteAlertModelComponent, {
            width: '700px',
            disableClose: true,
            data: {
                name: "Alert",
                message: `${ALERT_CONSTANTS.addCaller}`
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.callerRowData = [...this.callerRowData, {
                    id: this.callerRowData.length,
                    name: this.addCallerName,
                }];
                this.showAddCallerSection = false;
                this.callerGridApi.redrawRows();
            }
            else{
                this.showAddCallerSection = false;
            }
        });

    }

    onViewOptionChange(opt) {
        this.selectedViewOption = opt;
        this.viewOptions = this.viewOptions.map(item => {
            item.selected = item.icon === opt.icon;

            return item;
        });
    }

    randomIntFromInterval(min, max) { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    ridingOnGridReady(params:any) {
        this.ridingRowData = DUMMY_DATA.CallerRidingData;
        this.ridingGridApi = params.api;
        this.overviewService.getAllDistricts().subscribe(
            districts => {
                this.originalRidingRowData = [];
                //districts = districts.splice(0, 20);
                districts.map(ds => {

                    this.originalRidingRowData.push({
                        districtId: ds.districtId,
                        ridingName: ds.districtName,
                        caller: this.callers[this.randomIntFromInterval(0, 4)]
                    })
                })

                this.ridingRowData = [...this.originalRidingRowData];
            }, err => {
            })

    }

    manitobaOnGridReady(params: GridReadyEvent<any>) {
        this.manitobaGridApi = params.api;
        this.manitobaRowData = PARTIES.parties;
    }

    callerOnGridReady(params: GridReadyEvent<any>) {
        this.callerGridApi = params.api;
        this.callerRowData = MANAGE_SETTINGS_CONSTANTS.CallerRowData;
    }

    // searchRidings() {
    //     if (!this.ridingSearchText) {
    //         this.ridingRowData = [...this.originalRidingRowData];

    //         return;
    //     }

    //     this.ridingRowData = this.originalRidingRowData.filter(rd => {
    //         return (rd.ridingName.toLowerCase().indexOf(this.ridingSearchText.toLowerCase()) > -1
    //             || rd.caller.toLowerCase().indexOf(this.ridingSearchText.toLowerCase()) > -1);
    //     });

    // }

    onQuickFilterChanged() {
        // this.regionGridApi.setQuickFilter(
        //     (document.getElementById("quickFilter") as HTMLInputElement).value
        // );
        this.ridingGridApi.setQuickFilter(
            (document.getElementById("quickFilter") as HTMLInputElement).value
        );
        this.callerGridApi.setQuickFilter(
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
            this.gridApis.map((api: any) => {
                api.sizeColumnsToFit();
            });
        }, 500, true);
    }

    applyPrev() {

    }
    onSaveChanges(): void {
        const dialogRef = this.dialog.open(DeleteAlertModelComponent, {
            width: '700px',
            disableClose: true, 
            data: {
                name: "Alert",
                message: `${ALERT_CONSTANTS.saveManageSetting}`
            }
        });
    }
}
