import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerComponent } from '../../layout/spinner/spinner.component';
import { ShareDataService } from '../../services/share-data.service';
import { SegurancaService } from 'src/app/services/seguranca.service';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-guarda-roupa',
  templateUrl: './guarda-roupa.component.html',
  styleUrls: ['./guarda-roupa.component.scss']
})
export class GuardaRoupaComponent implements OnInit, AfterViewInit
{
  @ViewChild('tabGroupGuardaRoupa', {static: true}) tabGroupGuardaRoupa: MatTabGroup;

  // deprecated
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

  constructor(public dialog: MatDialog, 
      public shareDataService: ShareDataService,
      private segurancaService: SegurancaService
    ) 
  {
    //this.shareDataService.tituloBarraSuperior = 'Guarda-roupa';
  }

  ngOnInit()
  { }

  ngAfterViewInit()
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

  // deprecated
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

  tokenExpires()
  {
    this.segurancaService.isAuthenticated();
  }

  protectedEndpoint()
  {
    this.segurancaService.testToken();
  }

  realinharInkBar()
  {
    this.tabGroupGuardaRoupa.realignInkBar();
  }
}
