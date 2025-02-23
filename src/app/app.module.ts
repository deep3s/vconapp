import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxUiLoaderConfig, NgxUiLoaderModule } from "ngx-ui-loader";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import {
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MsalBroadcastService,
  MsalGuard,
  MsalGuardConfiguration,
  MsalInterceptor,
  MsalInterceptorConfiguration,
  MsalRedirectComponent,
  MsalService
} from "@azure/msal-angular";
import {
  BrowserCacheLocation,
  InteractionType,
  IPublicClientApplication,
  LogLevel,
  PublicClientApplication,
} from "@azure/msal-browser";
import { AppHttpInterceptor } from "./app-http-interceptor.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
const isIE =
  window.navigator.userAgent.indexOf("MSIE ") > -1 ||
  window.navigator.userAgent.indexOf("Trident/") > -1; // Remove this line to use Angular Universal
export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message);
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {

      clientId: "55e3f693-a983-43d6-9d8d-492cdb497130",
      // clientId: '3fba556e-5d4a-48e3-8e1a-fd57c12cb82e', // PPE testing environment
      authority:
        "https://login.microsoftonline.com/d582622a-9311-4f15-a699-0c81b11c407f",
      // authority: 'https://login.windows-ppe.net/common', // PPE testing environment
      // redirectUri: "https://tcp-ep-dev.crossleafhosting.com/",
      // postLogoutRedirectUri: "https://tcp-ep-dev.crossleafhosting.com/#/login",
      redirectUri: "https://ers-dev.crossleafhosting.com/",
      postLogoutRedirectUri: "https://ers-dev.crossleafhosting.com/#/login",
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE, // set to true for IE 11. Remove this line to use Angular Universal
    },
    system: {
      allowNativeBroker: false, // Disables WAM Broker
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false,
      },
    },
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set("https://graph.microsoft.com/v1.0/me", [
    "user.read",
  ]);
  // protectedResourceMap.set('https://graph.microsoft-ppe.com/v1.0/me', ['user.read']); // PPE testing environment

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ["user.read"],
    },
    loginFailedRoute: "/login",
  };
}
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor: "#359e00",
  pbThickness: 4,
  pbColor: "#359e00",
  overlayColor: "rgba(203, 203, 203, 0.6)",
};

@NgModule({
  declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatButtonModule,
      MatSelectModule,
      MatInputModule,
      MatInputModule,
      DragDropModule
    ],
  providers: [

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  bootstrap: [AppComponent, MsalRedirectComponent],
})
export class AppModule {}
