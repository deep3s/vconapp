import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class InterceptorService implements HttpInterceptor {
 
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
      const key =  'yogKnT5UNT4gFMtaLEURq81xGuV6sOKm7RsBpXao';
      req = req.clone({
      headers: req.headers.set(
          "x-api-key",
          key  
      ),
      url: 'https://1tzyvxi01f.execute-api.us-east-1.amazonaws.com/dev/'
      });
   
    return next.handle(req);
  }
}