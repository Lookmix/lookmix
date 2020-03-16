import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { take, catchError, retryWhen, delay,
    concat, concatMap } from 'rxjs/operators';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, 
    HTTP_INTERCEPTORS,
    HttpXsrfTokenExtractor} from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SegurancaService } from './seguranca.service';
import * as utils from './../utils';
import { Router } from '@angular/router';


@Injectable()
export class HttpInterceptorService implements HttpInterceptor 
{ 
  private requestPendente;

  private blackListEnpoints = [
    'api/auth/refresh',
    'api/auth/login',
    'api/usuarios/is_username_unique',
    'api/usuarios/is_phone_unique'
  ]

  constructor(private tokenExtractor: HttpXsrfTokenExtractor,
      private segurancaService: SegurancaService,
      private snackBar: MatSnackBar,
      private router: Router) {}


  intercept(request: HttpRequest<any>, 
      next: HttpHandler): Observable<HttpEvent<any>> 
  {    
    const xsrfToken = this.tokenExtractor.getToken() as string;

    let headers = this.setHeaders(request, xsrfToken);

    const requestModificada = request.clone({
      withCredentials: true,
      setHeaders: headers
    });
    if (!utils.isTokenValid('access_token_data')
        && !this.blackListEnpoints.includes(request.url))
    {
      if (utils.isTokenValid('refresh_token_data'))
      {
        this.requestPendente = requestModificada;

        this.getNewTokenWithRefreshToken()
            .subscribe(
              data => 
              {
                utils.setLocalStorageTokenData(data);

                // todo: ainda não foi testado (requestPendente -> request 
                // que seria executada caso o access-token estivesse válido)
                return next.handle(this.requestPendente);
              }, 
              error => 
              {
                this.snackBar.open(error, '', {
                  duration: 4000, 
                  panelClass: 'snack-bar-error', 
                  verticalPosition: 'bottom', 
                  horizontalPosition: 'end'
                })
              }
            );
      }
      else
      {
        this.redirecionarParaLogin();
      }
    }
    else
    {
      return next.handle(requestModificada);
    }
  }

  private setHeaders(request, xsrfToken)
  {
    let headers;

    if (!request.url.includes('api/upload'))
    {
      headers = {"Content-Type": "application/json"}
    }
    if (xsrfToken !== null) 
    {
      headers["X-CSRF-TOKEN"] = xsrfToken
    }
    return headers;
  }

  private redirecionarParaLogin()
  {
    this.router.navigate(['login']);

    this.snackBar.open('Por questões de segurança, ' +
        'você precisa entrar na sua conta novamente.', '', 
    {
      duration: 4500, 
      verticalPosition: 'bottom', 
      horizontalPosition: 'end'
    }) 
  }

  private getNewTokenWithRefreshToken(): Observable<any>
  {
    return this.segurancaService.refreshToken()
        .pipe(
          take(1),
          catchError(err => 
          {
            return throwError(err);
          }),
          retryWhen(errors =>
            errors.pipe(
              concatMap(result => 
              {
                return throwError(result);
              }),
              delay(2500),
              take(4),
              concatMap(() => throwError('Erro de rede. ' +
                  'Você está conectado à internet?'))
            )
          )
        );
  }
}