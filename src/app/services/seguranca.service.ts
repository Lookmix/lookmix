import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import * as utils from './../utils';
import * as moment from 'moment';
import 'moment/locale/pt-br';

@Injectable({
  providedIn: 'root'
})
export class SegurancaService 
{
  private endpoint: string = 'auth';

  constructor(private httpClient: HttpClient) { }

  login(dadosLogin)
  {
    const body = JSON.stringify(dadosLogin);

    return this.httpClient.post(`${environment.API_URL}/` + 
        `${this.endpoint}/login`, body, {withCredentials: true});
  }

  refreshToken()
  {
    return this.httpClient.post(`${environment.API_URL}/` + 
        `${this.endpoint}/refresh`, {}, {withCredentials: true})
  }

  testToken()
  {
    this.httpClient.post(`${environment.API_URL}/protected`, {}, 
        {withCredentials: false})
            .subscribe(
              data => 
              {
                console.log(data);
              }, 
              error => 
              {
                console.log(error);
              }
            );
  }

  isAuthenticated(): boolean 
  {
    const isAuthenticated = utils.isTokenValid('access_token_data');

    console.log(isAuthenticated);

    return isAuthenticated;
  }
}
