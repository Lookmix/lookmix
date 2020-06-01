import { Component, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/services/share-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-acoes-toolbar-guarda-roupa',
  templateUrl: './acoes-toolbar-guarda-roupa.component.html',
  styleUrls: ['./acoes-toolbar-guarda-roupa.component.scss']
})
export class AcoesToolbarGuardaRoupaComponent implements OnInit 
{
  constructor(public shareDataService: ShareDataService, 
      public router: Router, private dialog: MatDialog) 
  {}

  ngOnInit(): void 
  {}

  adicionarPecaRoupa()
  {
    this.dialog.open(FormularioNovaPecaDialogComponent, {
      width: '100%',
      height: '95%',
      disableClose: true,
      backdropClass: 'backdrop-dialog',
      id: 'containerDialogFormularioNovaPeca',
      position: {
        top: '9%'
      }
    });
  }
}


@Component({
  selector: 'app-formulario-nova-peca-dialog',
  templateUrl: './formulario-nova-peca-dialog.component.html',
  styleUrls: ['./formulario-nova-peca-dialog.component.scss']
})
export class FormularioNovaPecaDialogComponent 
{
  constructor(public shareDataService: ShareDataService)
  {

  }
}