import { Injectable } from '@angular/core';
import { HttpXsrfTokenExtractor } from '@angular/common/http';
import * as utils from './../utils'

@Injectable({
  providedIn: 'root'
})
export class HttpXsrfCookieExtractorService extends 
    HttpXsrfTokenExtractor {

  getToken()
  {
    const tokenName = utils.isTokenValid('access_token_data') ? 
        'csrf_access_token' : 'csrf_refresh_token'

    return tokenName;
  }
}
