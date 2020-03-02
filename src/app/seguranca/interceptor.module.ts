import { NgModule, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, 
    HTTP_INTERCEPTORS} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor 
{ 
  constructor(private cookieService: CookieService) {}

  intercept(request: HttpRequest<any>, 
      next: HttpHandler): Observable<HttpEvent<any>> 
  {
    console.log(request.url)

    const requestModificada = request.clone({
      // headers: request.headers.set("X-CSRF-TOKEN", this.cookieService.get("csrf_access_token"))
      // headers: request.headers.set("X-CSRF-TOKEN", this.cookieService.get("csrf_refresh_token"))
      headers: request.headers.set("Content-Type", "application/json")
      // headers: request.headers.set('Access-Control-Allow-Credentials', 'true'),
    });
    return next.handle(requestModificada);
  }
}
    
@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true,
    },
  ]
})
export class InterceptorModule {}
