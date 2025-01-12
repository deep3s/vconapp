import { Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";

interface IPageMenus {
  name: string;
  icon: string;
  tabUrl: string;
  tabName: string;
}

@Component({
  selector: "app-manage-ers",
  templateUrl: "./manage-ers.component.html",
  styleUrls: ["./manage-ers.component.scss"],
})
export class ManageErsComponent {
  tabMenus: IPageMenus[] = [
    {
      name: "Manage Settings",
      icon: "visibility",
      tabUrl: "manageERS/manage-settings",
      tabName: "Manage Settings",
    },
    {
      name: "Edit Ridings",
      icon: "edit_location",
      tabUrl: "manageERS/edit-ridings",
      tabName: "Manage Ridings",
    },
  ];

  constructor(public router: Router) {}

  handleTabMenuClick(url): void {
    this.router.navigateByUrl(url);
  }
}
