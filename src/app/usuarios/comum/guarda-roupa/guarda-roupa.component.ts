import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerComponent } from '../../../layout/spinner/spinner.component';
import { ShareDataService } from '../../../services/share-data.service';

@Component({
  selector: 'app-guarda-roupa',
  templateUrl: './guarda-roupa.component.html',
  styleUrls: ['./guarda-roupa.component.scss']
})
export class GuardaRoupaComponent implements OnInit {

  guardaRoupa = {
    mangaCurta: [],
    mangaLonga: [],
    pecasUnicas: [],
    roupasBaixo: [],
    calcados: [],
    acessorios: {
      cabeca: [],
      pescoco: [],
      bracos: [],
      pernas: []
    }
  }
  
  combinacoes = [];

  constructor
    (
      public dialog: MatDialog, 
      public shareDataService: ShareDataService
    ) 
  {
    this.shareDataService.tituloBarraSuperior = "Guarda-roupa";
  }

  ngOnInit()
  { }

  gerarCombinacoes()
  {
    const dialogRef = this.dialog.open(SpinnerComponent, {
      disableClose: true
    });
    dialogRef.afterOpened().subscribe(() => 
    {
      // for (let roupaCima of this.roupasCima)
      // {
      //   for (let roupaBaixo of this.roupasBaixo)
      //   {
      //     for (let calcado of this.calcados)
      //     {
      //       let vestimenta = {roupaCima: roupaCima, roupaBaixo: roupaBaixo, calcado: calcado};
  
      //       this.combinacoes.push(vestimenta);
      //     }
      //   }
      // }
      dialogRef.close();
    });
  }

  atualizarGuardaRoupa(pecas, categoriaPeca, tipoAcessorio?)
  {
    if (tipoAcessorio)
    {
      this.guardaRoupa[categoriaPeca][tipoAcessorio] = pecas;      
    }
    else
    {
      this.guardaRoupa[categoriaPeca] = pecas;
    }
  }
}

export interface Combinacao
{
  roupaCima: Imagem;
  roupaBaixo: Imagem;
  calcado: Imagem;
}

export interface Imagem
{
  id: any;
  file?: string|ArrayBuffer;
}