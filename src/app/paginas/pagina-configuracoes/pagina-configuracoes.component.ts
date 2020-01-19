import { Component, OnInit } from '@angular/core';
import { ShareDataService } from './../../services/share-data.service';

@Component({
  selector: 'app-pagina-configuracoes',
  templateUrl: './pagina-configuracoes.component.html',
  styleUrls: ['./pagina-configuracoes.component.scss']
})
export class PaginaConfiguracoesComponent implements OnInit 
{
  estiloRoupa: string;

  constructor(public shareDataService: ShareDataService) { }

  ngOnInit() 
  {
    this.shareDataService.tituloBarraSuperior = "Configurações";
    this.estiloRoupa = this.shareDataService.estiloRoupa;
    // this.estiloRoupa = this.shareDataService.estiloRoupa;
    console.log(this.shareDataService.estiloRoupa);
  }
}
