import { Injectable, ExistingSansProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import * as moment from 'moment';
import 'moment/locale/pt-br';

@Injectable({
  providedIn: 'root'
})
export class SegurancaService implements ExistingSansProvider
{
  private endpoint: string = 'auth';

  constructor(private httpClient: HttpClient) { }


  login(dadosLogin)
  {
    const body = JSON.stringify(dadosLogin);

    return this.httpClient.post(`${environment.API_URL}/` + 
        `${this.endpoint}/login`, body, {withCredentials: true});
  }

  isAuthenticated(): boolean 
  {
    const access_token_data = JSON.parse(localStorage.getItem('access_token_data'));

    const horaAtual = moment(new Date());
    const horaExpiracao = moment(new Date(access_token_data['expires'])).utcOffset(180);
    // console.log(horaAtual, horaExpiracao, horaAtual.isBefore(horaExpiracao));
    return horaAtual.isBefore(horaExpiracao);
  }

  testToken()
  {
    this.httpClient.post(`${environment.API_URL}/protected`, {}, {withCredentials: false})
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

  useExisting()
  {

  }
}
