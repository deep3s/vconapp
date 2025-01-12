import { Component, Input, OnInit } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-riding-eye-card',
  templateUrl: './riding-eye-card.component.html',
  styleUrls: ['./riding-eye-card.component.scss']
})
export class RidingEyeCardComponent implements OnInit, ICellRendererAngularComp {
  @Input() statusData: any = {};
  tooltipContent: SafeHtml;


  constructor(private sanitizer: DomSanitizer) {
    // HTML content for tooltip
    const htmlContent = `
      <div class="caller-tooltip p-3">
  <div class="row">
    <div>Riding Note <a href="/manageERS/edit-ridings" style="color: #3f51b5;">(Edit Notes)</a></div>
  </div>
  <div class="divider"></div>
  <div class="row">
    <div class="col-4">Previous:</div>
    <div class="col-8">Carlo Rouleau</div>
  </div>
  <div class="row">
    <div class="col-4">Likely Winner:</div>
    <div class="col-8">
      <span class="cl-circle"></span>
      PCP
    </div>
  </div>
  <div class="row">
    <div class="col-4">Caller Notes:</div>
    <div class="col-8">
      <div>Pon-cabinet min in seat since 2011 UCP</div>
      <div>Pon-cabinet min in seat since 2011 UCP</div>
    </div>
  </div>
  <div class="row">
    <div class="col-4">Prominent:</div>
    <div class="col-8">Six term city councilor:</div>
  </div>
  <div class="row">
    <div class="col-4">Caller:</div>
    <div class="col-8">Tyler Griffin</div>
  </div>
  <div class="row">
    <div class="col-4">Last Synced:</div>
    <div class="col-8">21:06:54 EDT 10/03/2023</div>
  </div>
</div>
    `;

    // Sanitize the HTML content
    this.tooltipContent = this.sanitizer.bypassSecurityTrustHtml(htmlContent);
  }

  agInit(params: any) {
    this.statusData = params.statusData;
  }

  ngOnInit() { }

  refresh(params: any): boolean {
    this.statusData = params.statusData;
    return true;
  }
}