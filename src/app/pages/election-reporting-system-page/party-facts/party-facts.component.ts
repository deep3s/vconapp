import { Component, OnInit } from "@angular/core";
import {
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
} from "ag-grid-community";
import { ApplicationService } from "src/app/services/application/application.service";
import { CallElectionService } from "src/app/services/call-election/call-election.service";

interface IPartyFactsData {
  id: number;
  leader: string;
  leaderSince: string;
  leaderSeat: string;
  leaderElection: string;
}

@Component({
  selector: "app-party-facts",
  templateUrl: "./party-facts.component.html",
  styleUrls: ["./party-facts.component.scss"],
})
export class PartyFactsComponent implements OnInit {
  appliedThemeClassOnTable = "ag-theme-material";
  submenuSearchText = "";

  private partyFactsGridApi!: GridApi<IPartyFactsData>;
  public partyFactsRowData!: IPartyFactsData[];
  partyFactsGridOptions: GridOptions = {};

  parties: any = {};//PARTIES.parties;

  partyFactsColumnDefs: ColDef[] = [
    // {
    //   headerName: "",
    //   field: "id",
    //   sortable: false,
    //   checkboxSelection: true,
    //   width: 70,
    //   headerCheckboxSelection: true,
    //   cellRenderer: (params) => {
    //     return `<input type="checkbox" disabled />`;
    //   },
    //   headerClass: "ag-custom-header",
    // },
    {
      headerName: "Leader",
      field: "leader",
      sortable: false,
      filter: false,
      flex: 1, // Enable auto-sizing for the column
      headerClass: "ag-custom-header",
    },
    {
      headerName: "Leader Since",
      field: "leaderSince",
      sortable: false,
      filter: false,
      flex: 1, // Enable auto-sizing for the column
      headerClass: "ag-custom-header",
    },
    {
      headerName: "Leader Seat",
      field: "leaderSeat",
      sortable: false,
      filter: false,
      flex: 1, // Enable auto-sizing for the column
      headerClass: "ag-custom-header",
    },
    {
      headerName: "Leader Election",
      field: "leaderElection",
      sortable: false,
      filter: false,
      flex: 1, // Enable auto-sizing for the column
      headerClass: "ag-custom-header",
    },
  ];

  constructor(public applicationService: ApplicationService,public callElectionService:CallElectionService) {
    this.applicationService.getDarkMode().subscribe((isDarkMode) => {
      this.appliedThemeClassOnTable =
        isDarkMode !== undefined && !isDarkMode
          ? "ag-theme-alpine-dark"
          : "ag-theme-material";
    });

    this.partyFactsGridOptions = {
      columnDefs: this.partyFactsColumnDefs,
      rowData: this.partyFactsRowData,
      defaultColDef: {
        resizable: true,
        filter: "agTextColumnFilter",
      },
      suppressRowClickSelection: true,
      //rowSelection: "multiple",
    };
  }
  ngOnInit(): void {
    this.parties=[];
    this.callElectionService.getPartyFacts().subscribe(data => {
      this.parties=data.map((c)=>{
          return{
              ...c,
              handle:c.party_short_eng,
              party:c.party_short_eng,
              name:c.party_name_eng,
              lastSync:c.last_updated,
              color: c.party_color,
              tableRow:[{
                leader: c.leader,
                leaderSince: c.leader_since,
                leaderSeat: c.leaders_seat,
                leaderElection: c.ridings_won+'/'+c.total_ridings +' seats ('+Math.round((c.ridings_won/c.total_ridings)*100).toFixed(1)+'%)' }
              ]
          }
      }
      )
  }, err => console.log(err));
  }

  partyFactsOnGridReady(params: GridReadyEvent<IPartyFactsData>, card: any) {
    this.partyFactsGridApi = params.api;
    this.partyFactsRowData = card.tableRow;
  }

  onQuickFilterChanged() {
    this.partyFactsGridApi.setQuickFilter(
      (document.getElementById("quickFilter") as HTMLInputElement).value
    );
  }

  clearSearch() {
    this.submenuSearchText;
  }
}
