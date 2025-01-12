import { Component } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import {
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  IRowNode,
  RowGroupingDisplayType
} from "ag-grid-community";
import { ApplicationService } from "src/app/services/application/application.service";
import { CallElectionService } from "src/app/services/call-election/call-election.service";
import { ElectionReportingService } from "src/app/services/election-reporting/election-reporting.service";
import { CALL_ELECTIONS_CARDS } from '../../../shared/card-constants';
import { HandleColumnVisibleChange, getDefaultColDef } from '../../../shared/constants';
import { PartyCardComponent } from "../party-card/party-card.component";
import { CallSubmitModalComponent } from "./call-submit-modal/call-submit-modal.component";

interface IRidingData {
  id: number;
  name: string;
}

interface IPartyData {
  id: number;
  name: string;
  handle: string;
}

interface ICallTypeData {
  id: number;
  type: string;
  value: string;
}

@Component({
  selector: "app-call-election",
  templateUrl: "./call-election.component.html",
  styleUrls: ["./call-election.component.scss"],
})
export class CallElectionComponent {
  submenuSearchText = "";
  appliedThemeClassOnTable = "ag-theme-material";

  private ridingGridApi!: GridApi<IRidingData>;
  public ridingRowData!: IRidingData[];
  ridingGridOptions: GridOptions = {};

  private partyGridApi!: GridApi<IPartyData>;
  public partyRowData!: IPartyData[];
  partyGridOptions: GridOptions = {};

  private callTypeGridApi!: GridApi<ICallTypeData>;
  public callTypeRowData!: ICallTypeData[];
  callTypeGridOptions: GridOptions = {};
  public calledRowSelection: "single" | "multiple" = "multiple";

  public groupDisplayType: RowGroupingDisplayType = "groupRows";
  public rowGroupPanelShow: "always" | "onlyWhenGrouping" | "never" = "always";
  public groupDefaultExpanded = 1;

  public selectedParty;
  public selectedCallType;
  public frenchSelectedPartyName;
  public englishToFrench = {
    "Progressive Conservative Party of Manitoba (PC)": "Le Parti progressiste-conservateur du Manitoba (PC)",
    "The New Democratic Party of Manitoba (NDP)" : "Le Nouveau Parti démocratique du Manitoba (NPD)",
    "The Manitoba Liberal Party (MLP)": "Parti libéral du Manitoba (MLP)",
    "The Green Party of Manitoba (GPM)": "Le Parti vert du Manitoba (GPM)"
  }

  public translatePartyName(englishPartyName: string) {
    // Check if the name is in the translation object, otherwise, return the original name
    this.frenchSelectedPartyName = this.englishToFrench[englishPartyName];
  }

  public autoGroupColumnDef: ColDef = {
    headerName: "Call Type",
    minWidth: 400,
    cellRendererParams: {
      suppressCount: true,
      checkbox: false,
    },
  };

  ridingColumnDefs: ColDef[] = [
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
      headerName: "Full Party Name",
      field: "name",
      sortable: true,
      filter: true,
      flex: 1, // Enable auto-sizing for the column
      headerClass: "ag-custom-header",
    },
  ];

  partyColumnDefs: ColDef[] = [
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
      headerName: "Code",
      field: "handle",
      sortable: true,
      filter: true,
      width: 100,  // Estimated width to fit 5 characters
      minWidth: 100,  // Minimum width to ensure visibility
      maxWidth: 100,  // Maximum width if needed
      headerClass: "ag-custom-header",
      cellRendererFramework: PartyCardComponent,
      cellRendererParams: (params) => ({
        partyData: {
            color:params.data.party_color, //getPartyColor(params?.value),
            label: params?.value || "",
            // fontSize: "20px",
        },
    }),
    },
    {
      headerName: "Full Name",
      field: "name",
      sortable: true,
      filter: true,
      flex: 2,  // Flexible sizing for other columns
      minWidth: 200,
      headerClass: "ag-custom-header",
    },
  ];

  callTypeColumnDefs: ColDef[] = [
    { headerName: "Call Type Group",field: "type", rowGroup: true, hide: true, sortable: true,headerClass: "ag-custom-header", },
    { headerName: "Call Type",
      field: "value",
      minWidth: 250 , // Enable auto-sizing for the column
      headerClass: "ag-custom-header",
      cellRenderer: (params) => {
        if (params.node.group) {
          return params.value;
        } else {
          return `
            <div style="display: flex; margin-left: 53px;">
              <i class="ri-pencil-line" style="margin-right: 5px;"></i>
              <span>${params.value}</span>
            </div>
          `;
        }
      },
    },
  ];
  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    sortable: false,
  };

  // callTypeColumnDefs: ColDef[] = [
  //   // {
  //   //   headerName: "",
  //   //   field: "id",
  //   //   sortable: true,
  //   //   checkboxSelection: true,
  //   //   width: 70,
  //   //   headerCheckboxSelection: true,
  //   //   cellRenderer: (params) => {
  //   //     return `<input type="checkbox" disabled />`;
  //   //   },
  //   //   headerClass: "ag-custom-header",
  //   // },
  //   {
  //     headerName: "Call Type Group",
  //     field: "type",
  //     sortable: true,
  //     filter: true,
  //     flex: 1, // Enable auto-sizing for the column
  //     headerClass: "ag-custom-header",
  //     rowGroup: true,
  //     hide: true,
  //   },
  //   {
  //     headerName: "",
  //     field: "value",
  //     sortable: true,
  //     filter: true,
  //     flex: 1, // Enable auto-sizing for the column
  //     headerClass: "ag-custom-header",
  //   },
  // ];

  onPartyTypeSelectionChanged(event) {
    this.selectedParty = this.partyGridApi.getSelectedRows()[0];
    this.frenchSelectedPartyName= this.selectedParty.party_name_fr;
    //this.translatePartyName(this.selectedParty.name);
    console.log(this.selectedParty);
    this.refreshCallTypeOnGridReady();
  }

  onCallTypeSelectionChanged(event) {
    this.selectedCallType = this.callTypeGridApi.getSelectedRows()[0];

    console.log(this.selectedCallType);

    if(this.selectedParty && this.selectedCallType){
      const dialogRef = this.dialog.open(CallSubmitModalComponent, {
        width: '1000px',
        disableClose: true,
        data: {
          selectedParty: this.selectedParty,
          selectedCallType: this.selectedCallType,
          frenchSelectedPartyName:this.frenchSelectedPartyName
        }
      });
      return;
    }
  }

  constructor(
    public callElection:CallElectionService,
    public applicationService: ApplicationService,
    private electionReportingService: ElectionReportingService,
    public dialog: MatDialog
  ) {
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
    this.partyGridOptions = {
      columnDefs: this.partyColumnDefs,
      rowData: this.partyRowData,
      defaultColDef: getDefaultColDef(),
      // suppressRowClickSelection: true,
      rowHeight: 30,
      rowSelection: "single",
      suppressMovableColumns: true,
      onSelectionChanged: this.onPartyTypeSelectionChanged.bind(this),
      onColumnVisible: (params) => HandleColumnVisibleChange(params),
    };
    this.callTypeGridOptions = {
      columnDefs: this.callTypeColumnDefs,
      rowData: this.callTypeRowData,
      defaultColDef: getDefaultColDef(),
      // suppressRowClickSelection: true,
      rowHeight: 30,
      rowSelection: "single",
      suppressMovableColumns: true,
      onRowClicked: this.onRowClicked.bind(this),
      onColumnVisible: (params) => HandleColumnVisibleChange(params),
     // onSelectionChanged: this.onCallTypeSelectionChanged.bind(this),
    };
    this.applicationService.getDarkMode().subscribe((isDarkMode) => {
      this.appliedThemeClassOnTable =
        isDarkMode !== undefined && !isDarkMode
          ? "ag-theme-alpine-dark"
          : "ag-theme-material";
    });
  }

  onRowClicked(event) {
    const node = event.node;
    node.setExpanded(!node.expanded);

    this.selectedCallType = this.callTypeGridApi.getSelectedRows()[0];
   // alert(this.selectedCallType);

    if(this.selectedParty && this.selectedCallType){
      const dialogRef = this.dialog.open(CallSubmitModalComponent, {
        width: '1000px',
        disableClose: true,
        data: {
          selectedParty: this.selectedParty,
          selectedCallType: this.selectedCallType,
          frenchSelectedPartyName:this.frenchSelectedPartyName
        }
      });
      return;
    }
  }

  ridingOnGridReady(params: GridReadyEvent<IRidingData>) {
    this.ridingGridApi = params.api;
    this.ridingRowData = [
      { id: 1, name: "Flin Flon" },
      { id: 2, name: "Keewatinook" },
      { id: 3, name: "The Pas-Kameesak" },
      { id: 4, name: "Thompson" },
      { id: 5, name: "Borderland" },
      { id: 6, name: "Dawson Trail" },
      { id: 7, name: "Interlake-Gimil" },
      { id: 8, name: "La Verendrye" },
      { id: 9, name: "Lac du Bonnet" },
      { id: 10, name: "Lakeside" },
    ];
  }

  partyOnGridReady(params: GridReadyEvent<IPartyData>) {
    this.partyGridApi = params.api;
    //this.partyRowData = PARTIES.parties;
    this.callElection.getParties().subscribe(data => {

      this.partyRowData=data.map((c)=>{
          return{
              ...c,
              handle:c.party_short_eng,
              name:c.party_name_eng,
              cellRendererFramework: PartyCardComponent,
              party_color: c.party_color
          }
      }
      )

  //params.api.sizeColumnsToFit();
  //this.getRidings();
  }, err => console.log(err));
    // [
    //   { id: 1, handle: "PCP", name: "Progressive Conservative Party of Manitoba (PC)" },
    //   { id: 2, handle: "NDP", name: "The New Democratic Party of Manitoba (NDP)" },
    //   { id: 3, handle: "MLP", name: "The Manitoba Liberal Party (MLP)" },
    //   { id: 4, handle: "GPM", name: "The Green Party of Manitoba (GPM)" },
    //   // { id: 5, handle: "IND", name: "Independent" },
    // ];
  }

  onPartyFirstDataRendered(){
    setTimeout(() => {
      this.partyGridApi.sizeColumnsToFit();
      // Select the first row
      const firstRowNode: IRowNode | undefined = this.partyGridApi.getDisplayedRowAtIndex(0);
      if (firstRowNode) {
        firstRowNode.setSelected(true);
        this.onPartyTypeSelectionChanged({ api: this.partyGridApi });
        //this.refreshCallTypeOnGridReady();
      }
  }, 500, true);
  }

  refreshCallTypeOnGridReady() {
    this.selectedCallType = undefined;
    // this.callTypeRowData = [
    //   { id: 1, type: "Majority", value: "Default" },
    //   { id: 2, type: "Majority", value: "Custom" },
    //   { id: 3, type: "Minority", value: "Default" },
    //   { id: 4, type: "Minority", value: "Custom" },
    //   {
    //     id: 5,
    //     type: "Elected - Majority / Minority Unknown",
    //     value: "Default",
    //   },
    //   {
    //     id: 6,
    //     type: "Elected - Majority / Minority Unknown",
    //     value: "Custom",
    //   },
    // ];
    this.callTypeRowData = [
      { id: 1, type: "Majority", value: "Submit Call Statement" },
      { id: 2, type: "Minority", value: "Submit Call Statement" },
      {
        id: 3,
        type: "Elected - Majority / Minority Unknown",
        value: "Submit Call Statement",
      },
    ];
  }

  callTypeOnGridReady(params: GridReadyEvent<ICallTypeData>) {
    this.callTypeGridApi = params.api;
    this.callTypeRowData = [
      { id: 1, type: "Majority", value: "Submit Call Statement" },
      { id: 2, type: "Minority", value: "Submit Call Statement" },
      {
        id: 3,
        type: "Elected - Majority / Minority Unknown",
        value: "Submit Call Statement",
      },
    ];
    // this.callTypeRowData = [
    //   { id: 1, type: "Majority", value: "Default" },
    //   { id: 2, type: "Majority", value: "Custom" },
    //   { id: 3, type: "Minority", value: "Default" },
    //   { id: 4, type: "Minority", value: "Custom" },
    //   {
    //     id: 5,
    //     type: "Elected - Majority / Minority Unknown",
    //     value: "Default",
    //   },
    //   {
    //     id: 6,
    //     type: "Elected - Majority / Minority Unknown",
    //     value: "Custom",
    //   },
    // ];

    this.callTypeGridApi.addEventListener('cellClicked', this.onCellClicked.bind(this));
  }

  onCellClicked(params) {
    if (params.event.target.classList.contains('expand-icon')) {
      const node = params.node;
      node.setExpanded(!node.expanded);
    }
  }

  onSubmitSelectRegion() {}

  onQuickFilterChanged() {
    this.ridingGridApi.setQuickFilter(
      (document.getElementById("quickFilter") as HTMLInputElement).value
    );
    this.partyGridApi.setQuickFilter(
      (document.getElementById("quickFilter") as HTMLInputElement).value
    );
    this.callTypeGridApi.setQuickFilter(
      (document.getElementById("quickFilter") as HTMLInputElement).value
    );
  }

  clearSearch() {
    this.submenuSearchText;
  }
}
