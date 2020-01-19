import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpCliet: HttpClient) { }

  uploadFile(file: File)
  {
    const formData = new FormData();

    formData.set('file', file, file.name)

    return this.httpCliet.post(environment.API_URL + 'upload', formData);
  }
}
