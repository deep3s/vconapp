import { Component, OnInit } from "@angular/core";
import { ApplicationService } from "../../services/application/application.service";

@Component({
  selector: "app-main-layout",
  templateUrl: "./main-layout.component.html",
  styleUrls: ["./main-layout.component.scss"],
})
export class MainLayoutComponent implements OnInit {
  isLoggedIn = false;

  constructor(public applicationService: ApplicationService) {}

  ngOnInit(): void {
    this.applicationService.getLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }
}
