import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SegurancaService {

  constructor(private httpClient: HttpClient) { }

  login(dadosLogin)
  {
    const body = JSON.stringify(dadosLogin);

    this.httpClient.post(environment.API_URL, body).subscribe(
      data => 
      {

      }, 
      error => 
      {
        
      }
    )
  }
}
