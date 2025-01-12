import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {AgGridAngular} from "ag-grid-angular";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {MatDialog} from "@angular/material/dialog";
import {PublisherModalComponent} from "./publisher-modal/publisher-modal.component";
import {ApplicationService} from "../../services/application/application.service";
import {
  PublisherThumbnailTooltipComponent
} from "./publisher-thumbnail-tooltip/publisher-thumbnail-tooltip.component";
import {ImageLockedModalComponent} from "./image-locked-modal/image-locked-modal.component";

@Component({
  selector: 'app-publisher-page',
  templateUrl: './publisher-page.component.html',
  styleUrls: ['./publisher-page.component.scss']
})
export class PublisherPageComponent implements OnInit{
  @ViewChild('agGrid') agGrid: AgGridAngular;

  appliedThemeClassOnTable = 'ag-theme-material';
  publisherColumnDef = [
    {
      headerName: 'Image Details',
      suppressMenu: true,
      field: 'thumbnail', search: true,
      width: 30, pivot: true, type: 'dimension',
      tooltipField: 'thumbnail',
      cellRenderer: (params) => `<div class="text-center"><img class="publisher-thumbnail" src=${params.data.thumbnail} /></div>`,
    },
    {
      headerName: 'File Name', field: 'fileName',
      search: true, filter: 'agTextColumnFilter',
      width: 170, pivot: true, type: 'dimension',
    },
    {
      headerName: 'Collection', field: 'collection',
      search: true, filter: 'agTextColumnFilter',
      width: 40, pivot: true, type: 'dimension',
    },
    {
      headerName: 'Date Generated', field: 'date',
      search: true, filter: 'agTextColumnFilter',
      headerClass: 'text-right',
      width: 40, pivot: true, type: 'dimension',
    },
    {
      headerName: 'Edit',
      suppressMenu: true,
      headerClass: 'text-center',
      //headerRenderer: ()=> `<div class="text-center"> Edit </div>`,
      cellRenderer: (params) => `<div class="text-center mt-2 cursor-pointer"
                                  matTooltip="Edit"
                                  matTooltipPosition="below">
                                    <span class="fs-20 material-symbols-rounded medium-icon">
                                      Tune
                                    </span>
                                 </div>`,
      width: 10, pivot: true, type: 'dimension',
    },
  ];
  mobilePublisherColumnDef = [
    {
      headerName: 'Image Details',
      suppressMenu: true,
      field: 'thumbnail', search: true,
      width: 200, pivot: true, type: 'dimension',
      //tooltipField: 'thumbnail',
      cellRenderer: (params) => `<div class="text-center"><img class="publisher-thumbnail" src=${params.data.thumbnail} /></div>`,
    },
    {
      headerName: 'File Name', field: 'fileName',
      search: true, filter: 'agTextColumnFilter',
      width: 300, pivot: true, type: 'dimension',
    },
    {
      headerName: 'Collection', field: 'collection',
      search: true, filter: 'agTextColumnFilter',
      width: 200, pivot: true, type: 'dimension',
    },
    {
      headerName: 'Date Generated', field: 'date',
      search: true, filter: 'agTextColumnFilter',
      headerClass: 'text-right',
      width: 200, pivot: true, type: 'dimension',
    },
    {
      headerName: 'Edit',
      suppressMenu: true,
      headerClass: 'text-center',
      //headerRenderer: ()=> `<div class="text-center"> Edit </div>`,
      cellRenderer: (params) => `<div class="text-center mt-2 cursor-pointer"
                                  matTooltip="Edit"
                                  matTooltipPosition="below">
                                    <span class="fs-20 material-symbols-rounded medium-icon">
                                      Tune
                                    </span>
                                 </div>`,
      width: 80, pivot: true, type: 'dimension',
    },
  ];


  defaultColDef = {
    //sortable: true,
    //filter: true,
    resizable: true,
    //tooltipComponent: PublisherThumbnailTooltipComponent,
  };

  gridApis: any = [];
  gridApi;
  gridColumnApi;
  gridColumnApis = [];
  selectedRowsPerPage = 20;
  currentAgGridPage = 0;
  totalAgGridPages = 0;
  publishersOriginal: any = [
    {
      thumbnail: '/assets/images/cp/Photo_Publisher_Sample_2.png',
      fileName: 'afghanistan_evacuation.jpeg',
      date: '10/11/2022',
      locked: true,
      collection: 'TCP Collection',
      id: 1,
    },
    {
      thumbnail: '/assets/images/cp/Photo_Publisher_Sample_3.png',
      fileName: 'australian_bushfires.jpeg',
      date: '10/11/2022',
      collection: 'TCP Collection',
      id: 1,
    },
    {
      thumbnail: '/assets/images/cp/Photo_Publisher_Sample_4.png',
      fileName: 'beirut_explosion.jpeg',
      date: '10/11/2022',
      collection: 'TCP Collection',
      id: 1,
    },
    {
      thumbnail: '/assets/images/cp/photo_edit.png',
      fileName: 'black_lives_matter_protest.jpeg',
      date: '10/11/2022',
      collection: 'TCP Collection',
      id: 1,
    },
    {
      thumbnail: '/assets/images/cp/photo_edit.png',
      fileName: 'brexit_referendum.jpeg',
      date: '10/11/2022',
      collection: 'TCP Collection',
      id: 1,
    },
    {
      thumbnail: '/assets/images/cp/photo_edit.png',
      fileName: 'capitol_hill_riot.jpeg',
      date: '10/11/2022',
      collection: 'TCP Collection',
      id: 1,
    },
    {
      thumbnail: '/assets/images/cp/photo_edit.png',
      fileName: 'covid-19_vaccination.jpeg',
      date: '10/11/2022',
      collection: 'TCP Collection',
      id: 1,
    },
    {
      thumbnail: '/assets/images/cp/photo_edit.png',
      fileName: 'gaza_conflict.jpeg',
      date: '10/11/2022',
      collection: 'TCP Collection',
      id: 1,
    },
    {
      thumbnail: '/assets/images/cp/photo_edit.png',
      fileName: 'hong_kong_protests.jpeg',
      date: '10/11/2022',
      collection: 'TCP Collection',
      id: 1,
    },
    {
      thumbnail: '/assets/images/cp/photo_edit.png',
      fileName: 'hurricane_ida.jpeg',
      date: '10/11/2022',
      collection: 'TCP Collection',
      id: 1,
    },
    {
      thumbnail: '/assets/images/cp/photo_edit.png',
      fileName: 'india_farmers_protest.jpeg',
      date: '10/11/2022',
      collection: 'TCP Collection',
      id: 1,
    },
    {
      thumbnail: '/assets/images/cp/photo_edit.png',
      fileName: 'myanmar_military_coup.jpeg',
      date: '10/11/2022',
      collection: 'TCP Collection',
      id: 1,
    },
    {
      thumbnail: '/assets/images/cp/photo_edit.png',
      fileName: 'north_korea_missile_test.jpeg',
      date: '10/11/2022',
      collection: 'TCP Collection',
      id: 1,
    },
    {
      thumbnail: '/assets/images/cp/photo_edit.png',
      fileName: 'paris_climate_agreement.jpeg',
      date: '10/11/2022',
      collection: 'TCP Collection',
      id: 1,
    },
    {
      thumbnail: '/assets/images/cp/photo_edit.png',
      fileName: 'rohingya_refugee_crisis.jpeg',
      date: '10/11/2022',
      collection: 'TCP Collection',
      id: 1,
    },
    {
      thumbnail: '/assets/images/cp/photo_edit.png',
      fileName: 'super_typhoon_rolly.jpeg',
      date: '10/11/2022',
      collection: 'TCP Collection',
      id: 1,
    },
    {
      thumbnail: '/assets/images/cp/photo_edit.png',
      fileName: 'syrian_civil_war.jpeg',
      date: '10/11/2022',
      collection: 'TCP Collection',
      id: 1,
    },
    {
      thumbnail: '/assets/images/cp/photo_edit.png',
      fileName: 'tokyo_olympics.jpeg',
      date: '10/11/2022',
      collection: 'TCP Collection',
      id: 1,
    },
    {
      thumbnail: '/assets/images/cp/photo_edit.png',
      fileName: 'united_states_election.jpeg',
      date: '10/11/2022',
      collection: 'TCP Collection',
      id: 1,
    },
    {
      thumbnail: '/assets/images/cp/photo_edit.png',
      fileName: 'yemen_humanitarian_crisis.jpeg',
      date: '10/11/2022',
      collection: 'TCP Collection',
      id: 1,
    },
    {
      thumbnail: '/assets/images/cp/photo_edit.png',
      fileName: 'photo_edit.png',
      date: '10/11/2022',
      collection: 'TCP Collection',
      id: 1,
    },
  ];
  state;
  publishers: any = [];

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.onFirstDataRendered();
  }

  constructor(private ngxService: NgxUiLoaderService,
              public applicationService: ApplicationService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.showLoaders();

    //this.publisherColumnDef = [...this.originalPublisherColumnDef];
    this.publishers = [...this.publishersOriginal];

    this.registerSubmenuEvents();
  }

  registerSubmenuEvents() {
    this.applicationService.onRefreshFromSubmenu().subscribe(() => {
      this.showLoaders();
    });

    this.applicationService.onApplySubmenuDateFilter().subscribe(() => {
      this.showLoaders();
    });

    this.applicationService.onDownloadSubmenuDateFilter().subscribe(() => {
      this.showLoaders();
    });

    this.applicationService.onSubmenuSearch().subscribe((searchText) => {
      this.publishers = this.publishersOriginal.filter(item => {
        return (item.fileName.toLowerCase().indexOf(searchText.toLowerCase()) >= 0 ||
          item.collection.toLowerCase().indexOf(searchText.toLowerCase()) >= 0)
      });
    });

    this.applicationService.getPinnedMenuOpen().subscribe(menuOpened => {
      this.onFirstDataRendered();
    });

    this.applicationService.getDarkMode().subscribe(isDarkMode => {
      this.appliedThemeClassOnTable = isDarkMode!== undefined && !isDarkMode ? 'ag-theme-alpine-dark' : 'ag-theme-material';
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
      this.gridApis.map((api: any) => {
        if (window.innerWidth > 767) {
          api.setColumnDefs(this.publisherColumnDef);
          api.sizeColumnsToFit();
          this.autoSizeAll(false);
        } else {
          api.setColumnDefs(this.mobilePublisherColumnDef);
          //this.autoSizeAll(false);
        }
      });
    }, 500);
  }

  showLoaders() {
    this.ngxService.startLoader("loader-1");

    setTimeout(() => {
      this.ngxService.stopLoader("loader-1");
    }, 1000);
  }

  onRowClicked(params: any): void {
    if(params.api.getSelectedRows()[0].locked){
      const dialogRef = this.dialog.open(ImageLockedModalComponent, {
        width: '500px',
        disableClose: true, 
        data: params.api.getSelectedRows()[0]
      });
      return;
    }
    const dialogRef = this.dialog.open(PublisherModalComponent, {
      width: '1100px',
      disableClose: true, 
      data: params.api.getSelectedRows()[0]
    });
  }

}
