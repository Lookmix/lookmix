import { Injectable, Inject } from '@angular/core';
import { DOCUMENT, ɵparseCookieValue as parseCookieValue } from '@angular/common';
import { HttpXsrfTokenExtractor } from '@angular/common/http';
import * as utils from './../utils'

@Injectable({
  providedIn: 'root'
})
export class HttpXsrfTokenExtractorService implements 
    HttpXsrfTokenExtractor 
{
  constructor(@Inject(DOCUMENT) private doc: any)
  {

  }

  getToken()
  {
    const csrfTokenName = utils.isTokenValid('access_token_data') ? 
        'csrf_access_token' : 'csrf_refresh_token'

    const cookieString = this.doc.cookie || '';

    // console.log(csrfTokenName, cookieString)

    const csrfToken = parseCookieValue(cookieString, csrfTokenName);

    return csrfToken;
  }
}
