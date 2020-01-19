import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService 
{
  tituloBarraSuperior: string;
  estiloRoupa: string = "m";

  constructor() { }
}
