import { Component, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/services/share-data.service';


@Component({
  selector: 'app-lista-divisor-guarda-roupa',
  templateUrl: './lista-divisor-guarda-roupa.component.html',
  styleUrls: ['./lista-divisor-guarda-roupa.component.scss']
})
export class ListaDivisorGuardaRoupaComponent implements OnInit 
{
  exibirDivisor = false;

  constructor(public shareDataService: ShareDataService) 
  {
    this.shareDataService.tituloBarraSuperior = 'Guarda-roupa';
  }

  ngOnInit(): void 
  {}

  exibirDivisoria(divisoria)
  {
    this.shareDataService.tituloBarraSuperior = divisoria;

    this.exibirDivisor = !this.exibirDivisor
  }
}
