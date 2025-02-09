import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Add your headers here
    const modifiedRequest = request.clone({
      setHeaders: {
        //"x-api-key": "yogKnT5UNT4gFMtaLEURq81xGuV6sOKm7RsBpXao",
      },
    });

    return next.handle(modifiedRequest);
  }
}
