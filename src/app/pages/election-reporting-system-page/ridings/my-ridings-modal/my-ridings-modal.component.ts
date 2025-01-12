import {AfterViewInit, Component, HostListener, Inject, OnInit, Pipe, PipeTransform} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ColDef, GridApi, GridOptions, GridReadyEvent} from "ag-grid-community";
import {PartyCardComponent} from "../../party-card/party-card.component";
import {ApplicationService} from "../../../../services/application/application.service";
import {OverviewService} from "../../../../services/overview/overview.service";
import { getPartyColor } from "../../../../shared/parties-constants";

@Component({
    selector: 'app-my-ridings-modal',
    templateUrl: './my-ridings-modal.component.html',
    styleUrls: ['./my-ridings-modal.component.scss']
})
export class MyRidingsModalComponent implements OnInit, AfterViewInit {
    appliedThemeClassOnTable = "ag-theme-material";
    private manitobaGridApi!: GridApi<any>;
    manitobaGridOptions: GridOptions = {};
    public manitobaRowData!: any[];
    manitobaColumnDefs: ColDef[] = [
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
        {
            headerName: "Last Report",
            field: "leading",
            sortable: true,
            filter: true,
            flex: 1, // Enable auto-sizing for the column
            headerClass: "ag-custom-header",
        },
    ];
    appliedThemeClass = '';
    dialogData: any = {};

    constructor(private formBuilder: FormBuilder,
                public dialog: MatDialog,
                public applicationService: ApplicationService,
                public overviewService: OverviewService,
                public dialogRef: MatDialogRef<MyRidingsModalComponent>,
                @Inject(MAT_DIALOG_DATA) public data) {
        this.dialogData = data;
    }

    ngAfterViewInit() {

    }

    ngOnInit(): void {
        this.manitobaGridOptions = {
            columnDefs: this.manitobaColumnDefs,
            rowData: this.manitobaRowData,
            defaultColDef: {
                resizable: true,
                filter: "agTextColumnFilter",
            },
            suppressRowClickSelection: true,
            rowSelection: "multiple",
        };

        this.applicationService.getDarkMode().subscribe(isDarkMode => {
            this.appliedThemeClass = isDarkMode !== undefined && !isDarkMode ? 'app-dark-mode' : '';
        });
    }

    manitobaOnGridReady(params: GridReadyEvent<any>) {
        this.manitobaGridApi = params.api;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    electRiding(event) {
        event.preventDefault();
        event.stopPropagation();

        let reqData = {
            name: this.dialogData.ridingName,
            district: 1,
            status: this.dialogData.status
        };

        this.overviewService.postElected(reqData).subscribe((res)=>{

        }, err=>{
        });
    }
}
