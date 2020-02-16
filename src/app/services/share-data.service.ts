import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService
{
  tituloBarraSuperior: string;
  estiloGuardaRoupa: string;
  temaNoturno: boolean;
  isXSmall: boolean;
  isSmall: boolean;

  constructor(private breakPointObserver: BreakpointObserver) 
  {
    this.estiloGuardaRoupa = localStorage.getItem('estiloGuardaRoupa');
    this.temaNoturno = localStorage.getItem('temaNoturno') === 'true';

    this.breakPointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ])
    .subscribe(result => {
      if (result.breakpoints[Breakpoints.XSmall])
      {
        this.isXSmall = true;
        this.isSmall = false;
      }
      else if (result.breakpoints[Breakpoints.Small])
      {
        this.isSmall = true;
        this.isXSmall = false;
      }
      else
      {
        this.isSmall = false;
        this.isXSmall = false;
      }
    });
  }
}
