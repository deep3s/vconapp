import {Component, NgZone} from '@angular/core';
import {AgRendererComponent} from 'ag-grid-angular';
import {MatDialog} from "@angular/material/dialog";
import {MyRidingsModalComponent} from "../../ridings/my-ridings-modal/my-ridings-modal.component";
import {DUMMY_DATA} from "../../../../shared/dummyData";

@Component({
  selector: 'view-ridings-component',
  templateUrl: './view-ridings-component.html',
  styleUrls: ['./view-ridings-component.scss']
})

export class ViewRidingsComponent implements AgRendererComponent {

  params: any;
  districtVote: any = DUMMY_DATA.DistrictVote;
  // {
  //   "district_id": 1,
  //   "polls": {
  //     "total_polls": "126",
  //     "reported_polls": "125",
  //     "percentage_reported": "99"
  //   },
  //   "candidates": [
  //     {
  //       "name": "Dufour Pierre",
  //       "votes": "9801",
  //       "party": "CAQ",
  //       "vote_percentage": "47",
  //       "margin": "6757"
  //     },
  //     {
  //       "name": "Matte Jean-Maurice",
  //       "votes": "3044",
  //       "party": "LIB",
  //       "vote_percentage": "14",
  //       "margin": "206"
  //     },
  //     {
  //       "name": "Gingras Benjamin",
  //       "votes": "2838",
  //       "party": "QS",
  //       "vote_percentage": "13",
  //       "margin": "274"
  //     },
  //     {
  //       "name": "Rouleau Jacline",
  //       "votes": "2564",
  //       "party": "PQ",
  //       "vote_percentage": "12",
  //       "margin": "78"
  //     },
  //     {
  //       "name": "Perron-Tellier Maxym",
  //       "votes": "2486",
  //       "party": "PC",
  //       "vote_percentage": "11",
  //       "margin": "N/A"
  //     }
  //   ]
  // };

  constructor(
    private ngZone: NgZone,
    public dialog: MatDialog) {
  }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    return false;
  }

  openRidings(): void {
    this.districtVote.ridingName = this.params.data.party_leader + "'s Riding: "
        + this.params.data.party_seat;
    const dialogRef = this.dialog.open(MyRidingsModalComponent, {
      width: '900px',
      disableClose: true, 
      data: {ridings: [this.districtVote]}
    });
    this.ngZone.run(() => {

    });
  }

}
