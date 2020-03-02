import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment'

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
}
