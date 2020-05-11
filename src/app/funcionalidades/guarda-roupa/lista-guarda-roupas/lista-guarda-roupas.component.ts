import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ShareDataService } from 'src/app/services/share-data.service';
import * as uuid from 'uuid';
import { GuardaRoupaComponent } from '../guarda-roupa.component';


@Component({
  selector: 'app-lista-guarda-roupas',
  templateUrl: './lista-guarda-roupas.component.html',
  styleUrls: ['./lista-guarda-roupas.component.scss']
})
export class ListaGuardaRoupasComponent implements OnInit 
{
  @ViewChild('guardaRoupa', {static: false}) guardaRoupa: GuardaRoupaComponent;

  exibirListaGuardaRoupa = false;

  listaGuardaRoupas = [
    {
      id: uuid.v4(), 
      nome: 'Casual'
    },
    {
      id: uuid.v4(), 
      nome: 'Social'
    }
  ]

  constructor(public shareDataService: ShareDataService) 
  {
    //this.shareDataService.tituloBarraSuperior = 'Seus guarda-roupas';

    this.shareDataService.listaGuardaRoupas = this.listaGuardaRoupas;
  }

  ngOnInit(): void 
  {

  }

  exibirGuardaRoupaEscolhido(guardaRoupa)
  {
    // this.shareDataService.tituloBarraSuperior = guardaRoupa.nome;

    // this.exibirListaGuardaRoupa = !this.exibirListaGuardaRoupa;

    localStorage.setItem('guardaRoupaEscolhido', JSON.stringify(guardaRoupa));

    this.shareDataService.guardaRoupaEscolhido = guardaRoupa;

    this.realinharInkBarDoTabGroupDoGuardaRoupaEscolhido();
  }

  realinharInkBarDoTabGroupDoGuardaRoupaEscolhido()
  {
    if (this.guardaRoupa)
    {
      this.guardaRoupa.realinharInkBar();
    }
  }

}
