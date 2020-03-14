import { NgModule, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, 
    HTTP_INTERCEPTORS,
    HttpXsrfTokenExtractor} from '@angular/common/http';


@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor 
{ 
  constructor(private tokenExtractor: HttpXsrfTokenExtractor) {}

  intercept(request: HttpRequest<any>, 
      next: HttpHandler): Observable<HttpEvent<any>> 
  {
    // console.log(request.url);
    
    const xsrfToken = this.tokenExtractor.getToken() as string;
    
    let setHeaders = {"Content-Type": "application/json"}

    if (xsrfToken !== null) 
    {
      setHeaders["X-CSRF-TOKEN"] = xsrfToken
    }
    const requestModificada = request.clone({
      withCredentials: true,
      setHeaders: setHeaders
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
