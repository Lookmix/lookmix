import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
import * as utils from './../utils';

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

  logout(tokenJTI)
  {
    return this.httpClient.put(`${environment.API_URL}/` + 
        `auth/token/${tokenJTI}`, {});
  }

  refreshToken()
  {
    return this.httpClient.post(`${environment.API_URL}/` + 
        `auth/refresh`, {})
  }

  // Tests Only
  testToken()
  {
    this.httpClient.post(`${environment.API_URL}/protected`, {})
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

  // Tests Only
  isAuthenticated(): boolean 
  {
    const isAuthenticated = utils.isTokenValid('access_token_data');

    console.log(isAuthenticated);

    return isAuthenticated;
  }
}
