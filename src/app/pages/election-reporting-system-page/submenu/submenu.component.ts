import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ElementRef, Renderer2
} from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { FormControl } from "@angular/forms";
import { ApplicationService } from "../../../services/application/application.service";
import { Router } from "@angular/router";
import { ERS_CONSTANTS, getElectionDropDownBackgroundColor } from '../../../shared/constants';
import {ElectionService} from "../../../services/election/election.service";

@Component({
  selector: "submenu",
  templateUrl: "./submenu.component.html",
  styleUrls: ["./submenu.component.scss"],
})
export class SubmenuComponent implements OnInit {
  electionsList: any;
  selectedElection: any;

  constructor(private route: Router, public electionService: ElectionService,
              private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit() {
    //this.electionsList = ERS_CONSTANTS.groupElectionsList;

    this.getAllElections();

    // Initialize with the first item from the list
    setTimeout(() => {
      const backgroundColor = getElectionDropDownBackgroundColor(this.electionsList[0].groupName);
      const selectContainer = this.el.nativeElement.querySelector('.ng-select-container');
      this.renderer.setStyle(selectContainer, 'background-color', backgroundColor);
      this.renderer.setStyle(selectContainer, 'color', 'white'); // Set text color to white
    }, 100); // Adjust delay if needed
  }

  getAllElections(){
    this.electionService.getElectionsList().subscribe(data => {
      this.electionsList = data.map(elec=>{
            return {
              id: elec.election_id,
              active: elec.active,
              groupName: elec.active ? ERS_CONSTANTS.ElectionGroupNames.Active : ERS_CONSTANTS.ElectionGroupNames.ReadOnly,
              name: elec.election_name_eng
            }
          }
      )

      this.selectedElection = this.electionsList[0].name;

      // Initialize with the first item from the list
      setTimeout(() => {
        const backgroundColor = getElectionDropDownBackgroundColor(this.electionsList[0].groupName);
        const selectContainer = this.el.nativeElement.querySelector('.ng-select-container');
        this.renderer.setStyle(selectContainer, 'background-color', backgroundColor);
        this.renderer.setStyle(selectContainer, 'color', 'white'); // Set text color to white
      }, 100); // Adjust delay if needed
    }, err => console.log(err));
  }

  adjustDropdownWidth() {
    setTimeout(() => {

      // Apply styles to the scroll-host
      const scrollHost = document.querySelector('.ng-dropdown-panel .scroll-host') as HTMLElement;
      if (scrollHost) {
        scrollHost.style.position = 'absolute';
        scrollHost.style.float = 'left';
        scrollHost.style.right = '0';
        scrollHost.style.opacity = '1';
        scrollHost.style.border = '1px solid #ccc';
        scrollHost.style.display = 'block';
        scrollHost.style.backgroundColor = 'white';
      }

      // Apply styles to the dropdown panel items
      const dropdownPanelItems = document.querySelector('.ng-dropdown-panel .ng-dropdown-panel-items') as HTMLElement;
      if (dropdownPanelItems) {
        dropdownPanelItems.style.overflowX = 'auto';
        dropdownPanelItems.style.display = 'flex'; // Ensures horizontal layout
        dropdownPanelItems.style.flexWrap = 'nowrap'; // Prevents wrapping
        //dropdownPanelItems.style.scrollbarWidth = 'thin'; // Firefox
        dropdownPanelItems.style.maxHeight = '290px';
      }

      const dropdownItems = document.querySelectorAll('.ng-dropdown-panel .ng-dropdown-panel-items .ng-option');
      let maxWidth = 0;

      // Find the maximum width
      dropdownItems.forEach((item: Element) => {
        const itemWidth = item.getBoundingClientRect().width;
        if (itemWidth > maxWidth) {
          maxWidth = itemWidth;
        }
      });

      // Apply the maximum width to all items
      dropdownItems.forEach((item) => {
        const element = item as HTMLElement; // Cast the Element to HTMLElement
        const itemWidth = element.getBoundingClientRect().width;
        element.style.width = `${maxWidth}px`;
        // Other HTMLElement specific logic
      });
    }, 0); // Delay to ensure the dropdown items are rendered before calculating
  }

  goToManageERS() {
    this.route.navigate(['/'])
  }

  onElectionChange(item: any): void {
    this.selectedElection = item;

    this.electionService.setElectionId(this.selectedElection.id);
  }

  // Method to update the background color
  updateSelectBackgroundColor() {
    const backgroundColor = getElectionDropDownBackgroundColor(this.selectedElection?.groupName);
    // const backgroundColor = this.selectedElection?.backgroundColor || 'default-color';
    const selectContainer = this.el.nativeElement.querySelector('.ng-select-container');
    this.renderer.setStyle(selectContainer, 'background-color', backgroundColor);
    this.renderer.setStyle(selectContainer, 'color', 'white'); // Set text color to white
    this.selectedElection = this.selectedElection.name;
  }
}
