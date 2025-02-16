import { Component } from '@angular/core';

@Component({
  selector: 'app-team-members-page',
  templateUrl: './team-members-page.component.html',
  styleUrls: ['./team-members-page.component.scss']
})
export class TeamMembersPageComponent {


  dropdowns: { [key: string]: boolean } = { optionsDropdown: false };

  toggleDropdown(event: Event, dropdownName: string) {
    event.stopPropagation();
    this.dropdowns[dropdownName] = !this.dropdowns[dropdownName];
  }

  copyShareLink(event: Event) {
    event.stopPropagation();
    console.log("Share link copied!");
  }

  options = [
    'Name (A–Z)',
    'Name (Z–A)',
    'Surname (A–Z)',
    'Surname (Z–A)',
    'Started at (oldest first)',
    'Started at (newest first)',
    'Rating (highest first)',
    'Rating (lowest first)',
    'Updated at (oldest first)',
    'Updated at (newest first)'
  ];

  selectedOption = 'Custom order';

  selectOption(option: string) {
    this.selectedOption = option;
  }


  users = [
    { name: "Tejaswini G", email: "vcon.tejaswinig@gmail.com", phone: "+91 73384 92236", image: "assets/tejaswini.png" },
    { name: "Wendy Smith (Demo)", email: "", phone: "", image: "assets/wendy.png" }
  ];


}
