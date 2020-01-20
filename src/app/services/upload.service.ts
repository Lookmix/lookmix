import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpCliet: HttpClient) { }

  uploadFile(files: Set<File>)
  {
    const formData = new FormData();

    let i = 0;
    for (let file of files)
    {
      formData.append('file'+i, file, file.name);
      i++;
    }
    // formData.set('files', files, file.name)

    return this.httpCliet.post(environment.API_URL + 'upload', formData);
  }
}
