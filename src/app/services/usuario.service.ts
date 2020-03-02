import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService 
{
  private endpoint: string = 'usuarios';

  constructor(private httpClient: HttpClient) 
  {

  }

  cadastrar()
  {}

  atualizar()
  {}

  getById()
  {}

  getAll()
  {}

  excluir()
  {}

  isUsernameValido(username): Observable<any>
  {
    return this.httpClient.get(`${environment.API_URL}/${this.endpoint}` +
        `/is_username_unique/${username}`);
  }

  isTelefoneValido(telefone): Observable<any>
  {
    return this.httpClient.get(`${environment.API_URL}/${this.endpoint}` +
        `/is_phone_unique/${telefone}`);
  }
}
