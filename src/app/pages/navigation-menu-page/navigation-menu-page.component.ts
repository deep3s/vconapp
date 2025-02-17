import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation-menu-page',
  templateUrl: './navigation-menu-page.component.html',
  styleUrls: ['./navigation-menu-page.component.scss']
})
export class NavigationMenuPageComponent {
  public isExpanded = false;

  public toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }
}
