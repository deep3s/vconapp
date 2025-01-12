import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {AgGridAngular} from "ag-grid-angular";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {ApplicationService} from "../../services/application/application.service";
import {TogglePublishComponent} from "./toggle-publish-component/toggle-publish.component";
import {NoImageComponent} from "./no-image/no-image.component";
import * as moment from "moment";

@Component({
  selector: 'app-tracker-page',
  templateUrl: './tracker-page.component.html',
  styleUrls: ['./tracker-page.component.scss']
})
export class TrackerPageComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  appliedThemeClassOnTable = 'ag-theme-material';
  idCols = [
    {
      headerName: 'Article Id', field: 'article_id',
      search: true, filter: 'agTextColumnFilter',
      width: 100, pivot: true, type: 'dimension',
    },
    {
      headerName: 'Apple Id', field: 'apple_article_id',
      search: true, filter: 'agTextColumnFilter',
      width: 100, pivot: true, type: 'dimension',
    }
  ]
  trackersColumnDefs = [
    {
      headerName: 'Slugline', headerClass: 'text-center', field: 'article_slugline', search: true, filter: 'agTextColumnFilter',
      width: 200, pivot: true, type: 'dimension',
    },
    {
      headerName: 'Category', field: 'article_category',
      search: true, filter: 'agTextColumnFilter',
      width: 100, pivot: true, type: 'dimension',
    },
    {
      headerName: 'Last Attempt Date', field: 'last_attempt_date',
      search: true, filter: 'agTextColumnFilter',
      width: 140, pivot: true, type: 'dimension',
    },
    /*{
      headerName: 'Unlock Time', field: 'unlock_time',
      search: true, filter: 'agTextColumnFilter',
      width: 140, pivot: true, type: 'dimension',
    },*/
    {
      headerName: 'Status', field: 'status',
      search: true, filter: 'agTextColumnFilter',
      cellRendererFramework: NoImageComponent,
      width: 90, pivot: true, type: 'dimension',
    },
    {
      headerName: 'Source', field: 'source',
      search: true, filter: 'agTextColumnFilter',
      width: 70, pivot: true, type: 'dimension',
    },
    {
      headerName: 'Language', field: 'language',
      search: true, filter: 'agTextColumnFilter',
      width: 90, pivot: true, type: 'dimension',
    },
    {
      headerName: 'Unlock', field: 'published',
      suppressMenu: true,
      headerClass: 'text-center',
      search: true, filter: 'agTextColumnFilter',
      cellRendererFramework: TogglePublishComponent,
      width: 50, pivot: true, type: 'dimension',
    },
  ];
  mobileTrackersColumnDefs = [
    {
      headerName: 'Slugline', headerClass: 'text-center', field: 'article_slugline', search: true, filter: 'agTextColumnFilter',
      width: 300, pivot: true, type: 'dimension',
    },
    {
      headerName: 'Category', field: 'article_category',
      search: true, filter: 'agTextColumnFilter',
      width: 150, pivot: true, type: 'dimension',
    },
    {
      headerName: 'Last Attempt Date', field: 'last_attempt_date',
      search: true, filter: 'agTextColumnFilter',
      width: 240, pivot: true, type: 'dimension',
    },
    {
      headerName: 'Status', field: 'status',
      search: true, filter: 'agTextColumnFilter',
      cellRendererFramework: NoImageComponent,
      width: 120, pivot: true, type: 'dimension',
    },
    {
      headerName: 'Source', field: 'source',
      search: true, filter: 'agTextColumnFilter',
      width: 120, pivot: true, type: 'dimension',
    },
    {
      headerName: 'Language', field: 'language',
      search: true, filter: 'agTextColumnFilter',
      width: 150, pivot: true, type: 'dimension',
    },
    {
      headerName: 'Unlock', field: 'published',
      suppressMenu: true,
      headerClass: 'text-center',
      search: true, filter: 'agTextColumnFilter',
      cellRendererFramework: TogglePublishComponent,
      width: 80, pivot: true, type: 'dimension',
    },
  ];
  trackerCols: any = [...this.trackersColumnDefs];
  categories: any = [];
  statuses: any = [];
  sources: any = [];
  languages: any = [];
  dateRanges: any = [
    {id: 'Today', name: 'Today'},
    {id: 'Yesterday', name: 'Yesterday'},
    {id: 'Last Week', name: 'Last Week'},
    {id: 'Last Month', name: 'Last Month'},
  ];
  selectedCategory = null;
  selectedStatus = null;
  selectedSource = null;
  selectedLanguage = null;
  selectedDateRange = null;

  pageNumbers = [
    {
      id: 1,
      name: 10,
    },
    {
      id: 2, name: 25,
    },
    {
      id: 3,
      name: 50,
    },
  ];
  selectedRowsPerPage = this.pageNumbers[0].name;

  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  defaultColDefForFullScreenCard = {
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
  };

  gridApis: any = [];
  gridApi;
  gridColumnApi;
  gridColumnApis = [];
  currentAgGridPage = 0;
  totalAgGridPages = 0;
  searchText = '';
  selectedDates: any;
  alwaysShowCalendars: boolean;
  ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  }
  invalidDates: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];

  trackersOriginal: any = [
    {
      "article_slugline": "MARCHÉS-MONDIAUX",
      "published": true,
      "last_attempt_date": "March 30, 2023",
      "unlock_time": "07:43:50 AM",
      "status": "Published",
      "locked": true,
      "article_category": "Affaires",
      "source": "PC",
      "article_id": "42aea1f8-2873-424c-be8e-33204fd0487b",
      "language": "FR",
      "apple_article_id": "30df36d2-6428-4eea-aefe-5c95924acb58"
    },
    {
      "article_slugline": "EU-Europe-China",
      "published": false,
      "last_attempt_date": "March 30, 2023",
      "unlock_time": "07:43:50 AM",
      "status": "Published",
      "article_category": "Science",
      "source": "AP",
      "article_id": "01d9de62-481d-4e19-8bcc-a9646e4276d4",
      "language": "EN",
      "apple_article_id": "b7cb0c71-d75c-4d8c-89f7-d4e8c06ec06f"
    },
    {
      "article_slugline": "EU-Germany-Britain-Royals",
      "published": false,
      "last_attempt_date": "March 30, 2023",
      "unlock_time": "07:43:50 AM",
      "status": "Published",
      "article_category": "Entertainment",
      "source": "AP",
      "article_id": "f453b9bf-e80e-4ab8-851e-e9a467a2a970",
      "language": "EN",
      "apple_article_id": "30dc82d4-18ec-4142-b794-61ddb881e86e"
    },
    {
      "article_slugline": "EU-Germany-Britain-Royals-Cheese",
      "published": false,
      "last_attempt_date": "March 30, 2023",
      "unlock_time": "07:43:50 AM",
      "status": "Published",
      "article_category": "Lifestyles",
      "source": "AP",
      "article_id": "14ddacd5-a093-4d9c-8ece-378375ce5af6",
      "language": "EN",
      "apple_article_id": "f12dbe98-37ca-43a3-bebc-e848283fccd1"
    },
    {
      "article_slugline": "EU-REL-Vatican-Indigenous",
      "published": false,
      "last_attempt_date": "March 30, 2023 ",
      "unlock_time": "07:43:50 AM",
      "status": "Published",
      "article_category": "Business",
      "source": "AP",
      "article_id": "9ae16859-2db9-4ebb-9a22-8cb53a11cddb",
      "language": "EN",
      "apple_article_id": "21e0d49d-6afd-4224-882f-cccd655a7904"
    },
    {
      "article_slugline": "US-Congress-Energy",
      "published": false,
      "last_attempt_date": "March 30, 2023 ",
      "unlock_time": "07:43:50 AM",
      "status": "Published",
      "article_category": "Environment",
      "source": "AP",
      "article_id": "65b65b2d-8d41-4616-84cc-9ceff763ce77",
      "language": "EN",
      "apple_article_id": "1b7d93c0-3343-428d-8c6b-aea3c0c1f5ee"
    },
    {
      "article_slugline": "NerdWallet-BNPL-Weddings",
      "published": false,
      "last_attempt_date": "March 30, 2023 ",
      "unlock_time": "07:43:50 AM",
      "status": "No image",
      "article_category": "Lifestyles",
      "source": "AP",
      "article_id": "2dc83a78-313b-47f8-961d-07c91dd812e2",
      "language": "EN",
      "apple_article_id": "N/A"
    },
    {
      "article_slugline": "TV-What-To-Stre",
      "unlock_time": "07:43:50 AM",
      "published": false,
      "last_attempt_date": "March 30, 2023 ",
      "status": "Published",
      "article_category": "Entertainment",
      "source": "CP",
      "article_id": "ce8d38d8-3ea3-47bd-a553-bde7d7f3c816",
      "language": "EN",
      "apple_article_id": "419db890-9c93-4c02-a67e-c9fb14f82e96"
    },
    {
      "article_slugline": "AS-China-Hacking",
      "published": false,
      "last_attempt_date": "March 30, 2023 ",
      "unlock_time": "07:43:50 AM",
      "status": "Published",
      "article_category": "Science",
      "source": "AP",
      "article_id": "39dbcbea-772c-44bb-86e6-fed6c1ed8746",
      "language": "EN",
      "apple_article_id": "0d6ddeeb-9931-40cc-b943-7c3a1481cdc6"
    },
    {
      "article_slugline": "AS-Thailand-Wildfires",
      "published": false,
      "last_attempt_date": "March 30, 2023  ",
      "unlock_time": "07:43:50 AM",
      "status": "Published",
      "article_category": "Environment",
      "source": "AP",
      "article_id": "91fc499e-9702-4802-9941-ce6ba4253f3f",
      "language": "EN",
      "apple_article_id": "3279e0dd-7e96-40c2-8192-07d24973a590"
    },
    {
      "article_slugline": "CB-GAZODUC-ARRESTATIONS",
      "published": false,
      "last_attempt_date": "March 30, 2023 ",
      "unlock_time": "07:43:50 AM",
      "status": "Published",
      "article_category": "Politique",
      "source": "PC",
      "article_id": "e2bbc1f2-6743-4fce-9091-74945cb94698",
      "language": "FR",
      "apple_article_id": "f3f6bf52-1f80-4aa6-9af9-b893dbc254d6"
    },
    {
      "article_slugline": "EU-Finland-Russia-Intelligence",
      "published": false,
      "last_attempt_date": "March 30, 2023 ",
      "unlock_time": "07:43:50 AM",
      "status": "Published",
      "article_category": "Science",
      "source": "AP",
      "article_id": "f2afd1ff-8cf9-4ca1-b5fa-6a9a0c88d140",
      "language": "EN",
      "apple_article_id": "26ed18b1-d7b3-4b7b-b6f5-0fff99d0e556"
    },
    {
      "article_slugline": "In-The-News",
      "published": false,
      "last_attempt_date": "March 30, 2023 ",
      "unlock_time": "07:43:50 AM",
      "status": "Published",
      "article_category": "National",
      "source": "CP",
      "article_id": "09f64454-6066-426e-bced-31bea9f5fc22",
      "language": "EN",
      "apple_article_id": "efd92dd8-84be-4077-ae98-f02d1b333f0e"
    },
    {
      "article_slugline": "AS-China-Alibaba",
      "published": false,
      "last_attempt_date": "March 30, 2023 ",
      "unlock_time": "07:43:50 AM",
      "status": "Published",
      "article_category": "Science",
      "source": "AP",
      "article_id": "329e07a8-37c6-4506-a30e-22a3cf4d2b0e",
      "language": "EN",
      "apple_article_id": "e891e390-9030-483a-bc69-b5fcc975275c"
    },
    {
      "article_slugline": "US-TikTok-Propaganda-Labels",
      "published": false,
      "last_attempt_date": "March 30, 2023  ",
      "unlock_time": "07:43:50 AM",
      "status": "Published",
      "article_category": "Science",
      "source": "AP",
      "article_id": "aed47d74-9766-4d39-8323-274ae8f8df2c",
      "language": "EN",
      "apple_article_id": "930bafe4-9dcd-4dc9-ad74-ca468662fa83"
    },
    {
      "article_slugline": "TEN-Pickleball-Slam-Roddick",
      "published": false,
      "last_attempt_date": "March 30, 2023 ",
      "unlock_time": "07:43:50 AM",
      "status": "Published",
      "article_category": "Sports",
      "source": "AP",
      "article_id": "0a9a4d22-8adf-4897-ae04-cf1508a67ea1",
      "language": "EN",
      "apple_article_id": "b9a23945-e368-4f28-bcfc-bab557b97c49"
    },
    {
      "article_slugline": "EU-Spain-Wildfires",
      "published": false,
      "last_attempt_date": "March 30, 2023  ",
      "unlock_time": "07:43:50 AM",
      "status": "No image",
      "article_category": "Environment",
      "source": "AP",
      "article_id": "ae8aed1a-7199-4676-b18f-54222b742fa0",
      "language": "EN",
      "apple_article_id": "N/A"
    },
    {
      "article_slugline": "EU-Climate-Renewables",
      "published": false,
      "last_attempt_date": "March 30, 2023 ",
      "unlock_time": "07:43:50 AM",
      "status": "Published",
      "article_category": "Environment",
      "source": "AP",
      "article_id": "988b8692-a4de-4c20-963f-f1a0c63ee98a",
      "language": "EN",
      "apple_article_id": "b0215493-a478-4e5d-b562-42a704677134"
    },
    {
      "article_slugline": "BKN-Mavericks-Irving's-Frustration",
      "published": false,
      "last_attempt_date": "March 30, 2023 ",
      "unlock_time": "07:43:50 AM",
      "status": "Published",
      "article_category": "Sports",
      "source": "AP",
      "article_id": "248874b9-61a7-41e7-8c04-e34eba790b77",
      "language": "EN",
      "apple_article_id": "21bce689-09b3-481d-8058-2e5ef1a671b3"
    },
    {
      "article_slugline": "TEN-Umpire-Corruption",
      "published": false,
      "last_attempt_date": "March 30, 2023 ",
      "unlock_time": "07:43:50 AM",
      "status": "No image",
      "article_category": "Sports",
      "source": "AP",
      "article_id": "4e0a78af-3823-40f8-9816-5cbf7aa034b9",
      "language": "EN",
      "apple_article_id": "N/A"
    },
    {
      "article_slugline": "RUSSIE-JOURNALISTE-ARRESTATION",
      "published": false,
      "last_attempt_date": "March 30, 2023 ",
      "unlock_time": "07:43:50 AM",
      "status": "Published",
      "article_category": "International",
      "source": "AP",
      "article_id": "184ac7c3-68b3-47ae-8a27-aea0b889fe77",
      "language": "FR",
      "apple_article_id": "229370d5-7ca8-4f1a-bc14-9e741877b367"
    },
    {
      "article_slugline": "AGRESSION-PENSIONNAT-AUTOCHTONE",
      "published": false,
      "last_attempt_date": "March 30, 2023 ",
      "unlock_time": "07:43:50 AM",
      "status": "Published",
      "article_category": "Nouvelles Générales",
      "source": "PC",
      "article_id": "458f6dbf-c9ac-4e14-9352-5d5b8e3f2e15",
      "language": "FR",
      "apple_article_id": "115dff1e-2cdf-47d0-ae20-ddea37db8f32"
    },
    {
      "article_slugline": "NÉ-ENQUÊTE-PUBLIQUE-TUERIE",
      "published": false,
      "last_attempt_date": "March 30, 2023 ",
      "unlock_time": "07:43:50 AM",
      "status": "Published",
      "article_category": "Politique",
      "source": "PC",
      "article_id": "36462dcd-fd6d-4e76-8086-7f3369bdc9ad",
      "language": "FR",
      "apple_article_id": "b71083fd-dfb4-4024-bb43-c8166bc9d22d"
    },
    {
      "article_slugline": "Alta-Oilpatch-Earthquake",
      "published": false,
      "last_attempt_date": "March 30, 2023 ",
      "unlock_time": "07:43:50 AM",
      "status": "Published",
      "article_category": "Alberta",
      "source": "CP",
      "article_id": "ed9af335-104b-4825-ac8f-3172e8c08fc2",
      "language": "EN",
      "apple_article_id": "d68baa81-faf0-4dff-b159-71eff4e16f0e"
    },
    {
      "article_slugline": "MONTRÉAL-FUSILLADE",
      "published": false,
      "last_attempt_date": "March 30, 2023 ",
      "unlock_time": "07:43:50 AM",
      "status": "Published",
      "article_category": "Nouvelles Générales",
      "source": "PC",
      "article_id": "77104648-c937-4482-a971-2ad4e9f1e2e4",
      "language": "FR",
      "apple_article_id": "a8bffcd5-b795-4a23-8703-f32c41e3e982"
    },
    {
      "article_slugline": "FedBudget-Tax-Filing",
      "published": false,
      "last_attempt_date": "March 30, 2023 ",
      "unlock_time": "07:43:50 AM",
      "status": "Published",
      "article_category": "Politics",
      "source": "CP",
      "article_id": "a7a8a01c-4ce3-4efa-b534-878ccb6efa77",
      "language": "EN",
      "apple_article_id": "14ac53fa-c7cc-4b0d-9616-4700a406c8e2"
    },
    {
      "article_slugline": "Yukon-Overdose-Crisis",
      "published": false,
      "last_attempt_date": "March 30, 2023 ",
      "unlock_time": "07:43:50 AM",
      "status": "Published",
      "article_category": "National",
      "source": "CP",
      "article_id": "f7d4c386-a34d-4e59-9f1e-367fcf510fa8",
      "language": "EN",
      "apple_article_id": "e4ba3c90-67a8-4941-a63a-272ab938a417"
    },
    {
      "article_slugline": "NS-Mass-Shooting-Inquiry",
      "published": false,
      "last_attempt_date": "March 30, 2023 ",
      "unlock_time": "07:43:50 AM",
      "status": "Published",
      "article_category": "Politics",
      "source": "CP",
      "article_id": "5c060d97-a26b-49d6-902a-a6ae6f0e3094",
      "language": "EN",
      "apple_article_id": "fe308343-656b-4af2-8131-4c0cb935756d"
    },
    {
      "article_slugline": "TTC-Violence-Social-Support",
      "published": false,
      "last_attempt_date": "March 30, 2023",
      "unlock_time": "07:43:50 AM",
      "status": "Published",
      "article_category": "Ontario",
      "source": "CP",
      "article_id": "14807e25-60cb-42bb-9988-48f89714328f",
      "language": "EN",
      "apple_article_id": "cb51ec1e-072e-47f3-b67e-bc373c4ade5f"
    },
    {
      "article_slugline": "BUDGET-FÉDÉRAL-PRESTATIONS",
      "published": false,
      "last_attempt_date": "March 30, 2023",
      "unlock_time": "07:43:50 AM",
      "status": "Published",
      "article_category": "Nouvelles Générales",
      "source": "PC",
      "article_id": "14d4cff1-b16f-4b63-8de8-4ded516eef87",
      "language": "FR",
      "apple_article_id": "2b55d267-c5f4-4a95-acfe-65d04e6f759b"
    },
    {
      "article_slugline": "Crime-Residential-School",
      "published": false,
      "last_attempt_date": "March 30, 2023",
      "unlock_time": "07:43:50 AM",
      "status": "Published",
      "article_category": "National",
      "source": "CP",
      "article_id": "7d23b88e-841f-45ed-9492-2090b0e03d67",
      "language": "EN",
      "apple_article_id": "25933fec-2781-46dc-87de-5585f8b1c369"
    },
    {
      "article_slugline": "CAR-F1-Australian-GP-Alonso",
      "published": false,
      "last_attempt_date": "March 30, 2023",
      "unlock_time": "07:43:50 AM",
      "status": "Published",
      "article_category": "Sports",
      "source": "AP",
      "article_id": "4dbf0a6f-7db5-43e2-b1d0-072fabce6c41",
      "language": "EN",
      "apple_article_id": "4c361d97-d0d2-4053-b10f-d4fcf4e099d8"
    },
    {
      "article_slugline": "BKC-UAB-North-Texas-Preview",
      "published": false,
      "last_attempt_date": "March 30, 2023",
      "unlock_time": "07:43:50 AM",
      "status": "No image",
      "article_category": "Sports",
      "source": "AP",
      "article_id": "3b12db08-8892-4271-8ab8-33e6caf28ef8",
      "language": "EN",
      "apple_article_id": "N/A"
    },
    {
      "article_slugline": "HKN-Panthers-Canadiens-Preview",
      "published": false,
      "last_attempt_date": "March 30, 2023",
      "unlock_time": "07:43:50 AM",
      "status": "No image",
      "article_category": "Sports",
      "source": "AP",
      "article_id": "41a01028-0311-4882-9c13-8570f394d74e",
      "language": "EN",
      "apple_article_id": "N/A"
    },
    {
      "article_slugline": "CRI-Indian-Premier-League-Preview",
      "published": false,
      "last_attempt_date": "March 30, 2023",
      "unlock_time": "07:43:50 AM",
      "status": "Published",
      "article_category": "Sports",
      "source": "AP",
      "article_id": "e8973663-86e4-4d63-9cb8-3316071255d5",
      "language": "EN",
      "apple_article_id": "bba0dbb7-6614-4126-a4ef-a25e5b4006e9"
    },
    {
      "article_slugline": "HKN-Stars-Coyotes-Preview",
      "published": false,
      "last_attempt_date": "March 30, 2023",
      "unlock_time": "07:43:50 AM",
      "status": "No image",
      "article_category": "Sports",
      "source": "AP",
      "article_id": "4e9f04b4-a712-406b-b269-f740822bf6ca",
      "language": "EN",
      "apple_article_id": "N/A"
    },
    {
      "article_slugline": "HKN-Capitals-Lightning-Preview",
      "published": false,
      "last_attempt_date": "March 30, 2023",
      "unlock_time": "07:43:50 AM",
      "status": "No image",
      "article_category": "Sports",
      "source": "AP",
      "article_id": "d62eea89-75a2-4abd-ab24-d7ceafee1010",
      "language": "EN",
      "apple_article_id": "N/A"
    },
    {
      "article_slugline": "Financial-Markets",
      "published": false,
      "last_attempt_date": "March 30, 2023",
      "unlock_time": "07:43:50 AM",
      "status": "Published",
      "article_category": "Business",
      "source": "AP",
      "article_id": "16e6e91e-938c-4a37-9669-e266366653ab",
      "language": "EN",
      "apple_article_id": "50b1e41f-7c5c-4c79-8bee-02f9b3da2c72"
    },
    {
      "article_slugline": "BKN-Kings-Trail-Blazers",
      "published": false,
      "last_attempt_date": "March 30, 2023",
      "unlock_time": "07:43:50 AM",
      "status": "Published",
      "article_category": "Sports",
      "source": "AP",
      "article_id": "1f800dd9-5e1c-4f39-8e60-b17e10199d34",
      "language": "EN",
      "apple_article_id": "ebd762ea-3bdd-4dd6-a08c-0dabfbae7470"
    }
  ];
  trackers: any = [];
  showIdColumns = false;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.onFirstDataRendered();
  }

  constructor(private ngxService: NgxUiLoaderService, public applicationService: ApplicationService) {
    this.alwaysShowCalendars = true;
  }

  isInvalidDate = (m: moment.Moment) => {
    return this.invalidDates.some(d => d.isSame(m, 'day'))
  }

  dateRangeUpdate(): void {
    console.log(this.selectedDates);
  }

  exportCSV() {
    this.gridApi.exportDataAsCsv();
  }

  ngOnInit() {
    this.showLoaders();
    this.trackers = [...this.trackersOriginal];

    this.registerSubmenuEvents();
    this.generateFilters();
  }

  showIdCols(event: any) {
    if (this.showIdColumns) {
      this.trackerCols = [this.trackersColumnDefs[0], ...this.idCols,
        ...this.trackersColumnDefs.slice(1, this.trackersColumnDefs.length)];
    } else {
      this.trackerCols = [...this.trackersColumnDefs];
    }

    this.onFirstDataRendered();
  }

  generateFilters() {
    let categories = {}, statuses = {}, sources = {},
      languages = {};
    this.trackersOriginal.map(item => {
      categories[item.article_category] = true;
      statuses[item.status] = true;
      sources[item.source] = true;
      languages[item.language] = true;
    })

    this.categories = Object.keys(categories).map(item => {
      return {id: item, name: item}
    });
    this.statuses = Object.keys(statuses).map(item => {
      return {id: item, name: item}
    });
    this.sources = Object.keys(sources).map(item => {
      return {id: item, name: item}
    });
    this.languages = Object.keys(languages).map(item => {
      return {id: item, name: item}
    });
  }

  searchTrackers() {
    let searchText = this.searchText || '';
    this.trackers = this.trackersOriginal.filter(item => {
      return item.article_slugline.toLowerCase().indexOf(searchText.toLowerCase()) >= 0
        || item.apple_article_id.toLowerCase().indexOf(searchText.toLowerCase()) >= 0
        || item.article_id.toLowerCase().indexOf(searchText.toLowerCase()) >= 0
    });
  }

  clearAllFilters() {
    this.selectedCategory = null;
    this.selectedStatus = null;
    this.selectedSource = null;
    this.selectedLanguage = null;
    this.selectedDateRange = null;

    this.applyFiltersAndSearch();
  }

  applyFiltersAndSearch() {
    this.searchTrackers();

    if (this.selectedCategory) {
      this.trackers = this.trackers.filter(item => item.article_category === this.selectedCategory);
    }
    if (this.selectedStatus) {
      this.trackers = this.trackers.filter(item => item.status === this.selectedStatus);
    }
    if (this.selectedSource) {
      this.trackers = this.trackers.filter(item => item.source === this.selectedSource);
    }
    if (this.selectedLanguage) {
      this.trackers = this.trackers.filter(item => item.language === this.selectedLanguage);
    }
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
      this.searchText = searchText;
      this.applyFiltersAndSearch()
    });

    this.applicationService.getPinnedMenuOpen().subscribe(menuOpened => {
      this.onFirstDataRendered();
    });

    this.applicationService.getDarkMode().subscribe(isDarkMode => {
      this.appliedThemeClassOnTable = isDarkMode !== undefined && !isDarkMode ? 'ag-theme-alpine-dark' : 'ag-theme-material';
    });

    this.applicationService.getTogglePublish().subscribe((data) => {
      this.trackersOriginal = this.trackersOriginal.map((item) => {
        if (item.article_slugline === data.article) {
          item.published = data.published;
        }

        return item;
      });
      this.gridApi.redrawRows();
    })
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
        if (window.innerWidth > 992) {
          api.setColumnDefs(this.trackersColumnDefs);
          api.sizeColumnsToFit();
        } else {
          api.setColumnDefs(this.mobileTrackersColumnDefs);
          //this.autoSizeAll(false);
        }
      });
    }, 300, true);
  }

  goToAgGridLastPage(): void {
    this.pageChanged(this.totalAgGridPages);
  }

  pageChanged(currentPage): void {
    this.gridApi.paginationGoToPage(currentPage - 1);

    return currentPage;
  }

  showLoaders() {
    this.ngxService.startLoader("loader-1");

    setTimeout(() => {
      this.ngxService.stopLoader("loader-1");
    }, 1000);
  }


}
