import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { retryWhen, delay, concatMap, tap } from 'rxjs/operators';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, 
    HttpXsrfTokenExtractor, HttpClient} from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as utils from './../utils';
import { Router } from '@angular/router';
import { SegurancaService } from './seguranca.service';


@Injectable()
export class HttpInterceptorService implements HttpInterceptor 
{ 
  private requestPendente: HttpRequest<any>;

  private whiteListEnpoints = [
    'api/auth/refresh',
    'api/auth/login',
    'api/auth/token',
    'api/usuarios/is_username_unique',
    'api/usuarios/is_phone_unique'
  ]

  constructor(private tokenExtractor: HttpXsrfTokenExtractor,
      private httpClient: HttpClient,
      private snackBar: MatSnackBar,
      private router: Router, 
      private segurancaService: SegurancaService) {}

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

        return this.renovarTokenEExecutarRequestInterceptada();
      }
      else
      {
        this.redirecionarParaLogin();
      }
    }
    else
    {
      return this.executarRequestInterceptada(next, requestModificada)
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
        {duration: 4500}) 
  }

  private renovarTokenEExecutarRequestInterceptada(): Observable<HttpEvent<any>>
  {
    return this.segurancaService.refreshToken()
        .pipe(
            tap(response => 
            {
              utils.setLocalStorageTokenData(response);
            }),
            concatMap(() => this.httpClient.request(this.requestPendente)))
  }

  private executarRequestInterceptada(next: HttpHandler, request): Observable<HttpEvent<any>>
  {
    return next.handle(request)
        .pipe(
            retryWhen(errors =>
                errors.pipe(
                    delay(2500),
                    concatMap((e, index) => 
                        index === 4 ? throwError('Erro de rede, ' + 
                            'Você está conectado à internet?') : of(null)
                      )
                  ),
              ),
          );
  }
}