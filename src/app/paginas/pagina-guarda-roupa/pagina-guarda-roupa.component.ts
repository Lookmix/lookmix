import { Component, OnInit } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerComponent } from '../../componentes/spinner/spinner.component';
import { ShareDataService } from '../../services/share-data.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-pagina-guarda-roupa',
  templateUrl: './pagina-guarda-roupa.component.html',
  styleUrls: ['./pagina-guarda-roupa.component.scss']
})
export class PaginaGuardaRoupaComponent implements OnInit {

  guardaRoupa = {
    mangaCurta: [],
    mangaLonga: [],
    pecasUnicas: [],
    roupasBaixo: [],
    calcados: [],
    acessorios: []
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

  atualizarGuardaRoupa(roupas, nomeArray)
  {
    this.guardaRoupa[nomeArray] = roupas;
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