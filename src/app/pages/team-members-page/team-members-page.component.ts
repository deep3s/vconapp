import { Component } from '@angular/core';

@Component({
  selector: 'app-team-members-page',
  templateUrl: './team-members-page.component.html',
  styleUrls: ['./team-members-page.component.scss']
})
export class TeamMembersPageComponent {

  addMember() {
    console.log("Add Member Clicked");
  }
  dropdowns: { [key: string]: boolean } = { optionsDropdown: false };

  toggleDropdown(event: Event, dropdownName: string) {
    event.stopPropagation();
    this.dropdowns[dropdownName] = !this.dropdowns[dropdownName];
  }

  copyShareLink(event: Event) {
    event.stopPropagation();
    console.log("Share link copied!");
  }
}
