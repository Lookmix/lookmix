import { Component, OnInit } from '@angular/core';
import { ShareDataService } from './../../services/share-data.service';

@Component({
  selector: 'app-pagina-configuracoes',
  templateUrl: './pagina-configuracoes.component.html',
  styleUrls: ['./pagina-configuracoes.component.scss']
})
export class PaginaConfiguracoesComponent implements OnInit 
{
  estiloGuardaRoupa: string;
  temaNoturno: boolean;

  constructor(public shareDataService: ShareDataService) 
  {
    this.shareDataService.tituloBarraSuperior = "Configurações";
  }

  ngOnInit() 
  {
    this.estiloGuardaRoupa = this.shareDataService.estiloGuardaRoupa;
    this.temaNoturno = this.shareDataService.temaNoturno;
  }

  setEstiloGuardaRoupa(event) 
  {
    localStorage.setItem('estiloGuardaRoupa', event.value);

    this.shareDataService.estiloGuardaRoupa = event.value;

    this.estiloGuardaRoupa = this.shareDataService.estiloGuardaRoupa;
  }

  setTemaNoturno(event) 
  {
    localStorage.setItem('temaNoturno', event.checked)

    this.shareDataService.temaNoturno = event.checked;
    
    this.temaNoturno = this.shareDataService.temaNoturno;
  }
}
