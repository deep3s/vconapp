import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let modifiedRequest = request.clone({});
        if (request.url.includes('.mappls.com/api')) {

            // Add your headers here
           /* modifiedRequest = request.clone({
                setHeaders: {
                    "Authorization": "Bearer a80aa7bf-0471-453e-b3b0-9bee38ae301e",
                },
            });*/
        }
        return next.handle(modifiedRequest);
    }
}
