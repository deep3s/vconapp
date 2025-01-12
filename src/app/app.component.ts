import { Component, Inject } from "@angular/core";
import { filter, takeUntil } from "rxjs/operators";
import {
  AuthenticationResult,
  EventMessage,
  EventType,
  InteractionStatus,
  PopupRequest,
  RedirectRequest,
} from "@azure/msal-browser";
import { Router } from "@angular/router";
import { ApplicationService } from "./services/application/application.service";
import {
  MSAL_GUARD_CONFIG,
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalService,
} from "@azure/msal-angular";
import { Subject } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "cp-editorial";
  private readonly _destroying$ = new Subject<void>();

  constructor(
    public router: Router,
    private applicationService: ApplicationService,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {}

  ngOnInit() {
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => {
          return (
            msg.eventType === EventType.LOGIN_SUCCESS ||
            msg.eventType === EventType.HANDLE_REDIRECT_END
          );
        })
      )
      .subscribe((result: EventMessage) => {
        if (this.authService.instance.getAllAccounts().length === 0) {
          window.location.pathname = "/";
        } else {
          this.setLoginDisplay();
        }
      });

    /*this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
      })*/
  }

  setLoginDisplay() {
    let isLoggedIn = this.authService.instance.getAllAccounts().length > 0;

    this.applicationService.setLoggedIn(true);
    setTimeout(() => {
      this.router.navigateByUrl("/dash");
    }, 100);
  }
  checkAndSetActiveAccount() {
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
    let activeAccount = this.authService.instance.getActiveAccount();

    if (
      !activeAccount &&
      this.authService.instance.getAllAccounts().length > 0
    ) {
      let accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }

  logout(popup?: boolean) {
    if (popup) {
      this.authService.logoutPopup({
        mainWindowRedirectUri: "/",
      });
    } else {
      this.authService.logoutRedirect();
    }
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
