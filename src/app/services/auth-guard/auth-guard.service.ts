import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  CanDeactivate,
} from "@angular/router";
import { ApplicationService } from "../application/application.service";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private appService: ApplicationService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.appService.getLoggedInValue()) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
