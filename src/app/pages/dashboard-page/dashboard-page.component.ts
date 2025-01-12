import {Component, OnInit} from '@angular/core';
import {NgxUiLoaderService} from "ngx-ui-loader";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  constructor(private ngxService: NgxUiLoaderService) {
  }

  ngOnInit() {
    this.showLoaders();
  }

  showLoaders() {
    /*this.ngxService.startLoader("loader-1");
    this.ngxService.startLoader("loader-2");
    this.ngxService.startLoader("loader-3");
    this.ngxService.startLoader("loader-4");
    this.ngxService.startLoader("loader-5");
    this.ngxService.startLoader("loader-6");
*/
    setTimeout(() => {
      /*this.ngxService.stopLoader("loader-1");
      this.ngxService.stopLoader("loader-2");
      this.ngxService.stopLoader("loader-3");
      this.ngxService.stopLoader("loader-4");
      this.ngxService.stopLoader("loader-5");
      this.ngxService.stopLoader("loader-6");*/
    }, 1000);
  }

}
