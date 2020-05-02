import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  cadastrar(usuario): Observable<any>
  {
    return this.httpClient.post(`${environment.API_URL}/${this.endpoint}` +
        `/save`, usuario);
  }

  atualizar()
  {}

  atualizarSenha(phone, newPassword): Observable<any>
  {
    return this.httpClient.put(`${environment.API_URL}/${this.endpoint}` +
        `/update_password/${phone}`, {password: newPassword});
  }

  getById()
  {}

  getAll()
  {}

  excluir()
  {}

  isUsernameValido(username): Observable<any>
  {
    const encodedUsername = encodeURIComponent(username);
    
    return this.httpClient.get(`${environment.API_URL}/${this.endpoint}` +
        `/is_username_unique/${encodedUsername}`);
  }

  isTelefoneValido(telefone): Observable<any>
  {
    return this.httpClient.get(`${environment.API_URL}/${this.endpoint}` +
        `/is_phone_unique/${telefone}`);
  }

  sendVerifyCode(phone): Observable<any>
  {
    return this.httpClient.get(`${environment.API_URL}/${this.endpoint}` +
        `/send_verify_code`, {params: new HttpParams().set('phone', phone)});
  }

  verifyCode(request_id, code): Observable<any>
  {
    let httpParams = new HttpParams();

    httpParams = httpParams.append('request_id', request_id);
    httpParams = httpParams.append('code', code);

    return this.httpClient.get(`${environment.API_URL}/${this.endpoint}` +
        `/verify_code`, {params: httpParams});
  }
}
