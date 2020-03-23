import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { take, catchError, retryWhen, delay,
    map, concatMap, switchMap, tap } from 'rxjs/operators';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, 
    HTTP_INTERCEPTORS,
    HttpXsrfTokenExtractor,
    HttpClient,
    HttpResponse} from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as utils from './../utils';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Injectable()
export class HttpInterceptorService implements HttpInterceptor 
{ 
  private requestPendente: HttpRequest<any>;

  private whiteListEnpoints = [
    'api/auth/refresh',
    'api/auth/login',
    'api/usuarios/is_username_unique',
    'api/usuarios/is_phone_unique'
  ]

  constructor(private tokenExtractor: HttpXsrfTokenExtractor,
      private httpClient: HttpClient,
      private snackBar: MatSnackBar,
      private router: Router) {}

  intercept(request: HttpRequest<any>, 
      next: HttpHandler): Observable<HttpEvent<any>> 
  {    
    const xsrfToken = this.tokenExtractor.getToken() as string;

    let headers = this.setHeaders(request.url, xsrfToken);

    const requestModificada = request.clone({
      withCredentials: true,
      setHeaders: headers
    });
    const isUrlIntoWhiteList = this.whiteListEnpoints.filter(endpoint => 
        request.url.includes(endpoint))[0] !== undefined;

    if (!utils.isTokenValid('access_token_data') && !isUrlIntoWhiteList)
    {
      if (utils.isTokenValid('refresh_token_data'))
      {
        this.requestPendente = requestModificada;

        return this.refreshToken()
            .pipe(
                tap(response => 
                {
                  utils.setLocalStorageTokenData(response);
                  // console.log(response);
                }),
                concatMap(() => this.httpClient.request(this.requestPendente)))
      }
      else
      {
        this.redirecionarParaLogin();
      }
    }
    else
    {
      return next.handle(requestModificada)
          // .pipe(
          //     // tap(result => {console.log(result); return result}),
          //     take(1),
          //     catchError(err => 
          //     {
          //       console.log(err);
          //       return throwError(err);
          //     }),
          //     retryWhen(errors =>
          //         errors.pipe(
          //             delay(2500),
          //             take(4),
          //             concatMap(() => throwError('Erro de rede. ' +
          //                 'Você está conectado à internet?'))
          //         )
          //     ),
          // );
    }
  }

  private setHeaders(url, xsrfToken)
  {
    let headers = {};

    if (!url.includes('api/upload'))
    {
      headers['Content-Type'] = 'application/json'
    }
    if (xsrfToken !== null) 
    {
      headers['X-CSRF-TOKEN'] = xsrfToken
    }
    return headers;
  }

  private redirecionarParaLogin()
  {
    this.router.navigate(['login']);

    this.snackBar.open('Por questões de segurança ' +
        'você precisa entrar na sua conta novamente.', '', 
    {
      duration: 4500, 
      verticalPosition: 'bottom', 
      horizontalPosition: 'center'
    }) 
  }

  private refreshToken()
  {
    return this.httpClient.post(`${environment.API_URL}/` + 
        `auth/refresh`, {})
        // .pipe(
        //     take(1),
        //     catchError(err => 
        //     {
        //       return throwError(err);
        //     }),
        //     retryWhen(errors =>
        //         errors.pipe(
        //             concatMap(result => 
        //             {
        //               return throwError(result);
        //             }),
        //             delay(2500),
        //             take(4),
        //             concatMap(() => throwError('Erro de rede. ' +
        //                 'Você está conectado à internet?'))
        //         )
        //     ),
        // );
  }

  private getNewTokenWithRefreshToken()
  {
    // return this.refreshToken()
    //     .pipe(
    //         take(1),
    //         catchError(err => 
    //         {
    //           return throwError(err);
    //         }),
    //         retryWhen(errors =>
    //             errors.pipe(
    //                 concatMap(result => 
    //                 {
    //                   return throwError(result);
    //                 }),
    //                 delay(2500),
    //                 take(4),
    //                 concatMap(() => throwError('Erro de rede. ' +
    //                     'Você está conectado à internet?'))
    //             )
    //         ),
    //     )
    //     .subscribe(
    //         response => 
    //         {              
    //           utils.setLocalStorageTokenData(response);
              
    //           this.httpClient.request(this.requestPendente).subscribe();
    //         }, 
    //         error => 
    //         {
    //           console.log(error);
    //             // this.snackBar.open(error, '', {
    //             //   duration: 4000, 
    //             //   panelClass: 'snack-bar-error', 
    //             //   verticalPosition: 'bottom', 
    //             //   horizontalPosition: 'end'
    //             // })
    //         });
  }
}