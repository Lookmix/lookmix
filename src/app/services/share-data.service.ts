import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService
{
  tituloBarraSuperior: string;
  estiloGuardaRoupa: string;
  temaNoturno: boolean;

  constructor() 
  {
    this.estiloGuardaRoupa = localStorage.getItem('estiloGuardaRoupa');
    this.temaNoturno = localStorage.getItem('temaNoturno') === 'true';
  }
}
