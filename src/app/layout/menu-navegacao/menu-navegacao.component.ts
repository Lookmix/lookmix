import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { ShareDataService } from 'src/app/services/share-data.service';
import { ListaGuardaRoupasComponent } from 'src/app/funcionalidades/guarda-roupa/lista-guarda-roupas/lista-guarda-roupas.component';

@Component({
  selector: 'app-menu-navegacao',
  templateUrl: './menu-navegacao.component.html',
  styleUrls: ['./menu-navegacao.component.scss']
})
export class MenuNavegacaoComponent implements OnInit 
{
  @ViewChild('listaGuardaRoupas', {static: true}) listaGuardaRoupas: ListaGuardaRoupasComponent;

  constructor(iconRegistry: MatIconRegistry, 
      sanitizer: DomSanitizer,
      public shareDataService: ShareDataService) 
  {
    iconRegistry.addSvgIcon('guarda-roupa',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/guarda-roupa.svg'));

    this.alterarInformacoesBaseadasNaAbaEscolhida(0);
  }

  ngOnInit(): void 
  { }

  alterarInformacoesBaseadasNaAbaEscolhida(index)
  {
    if (index === 0)
    {
      this.shareDataService.tituloBarraSuperior = 'Looks da semana';
      this.shareDataService.tabGuardaRoupaSelecionada = false;
    }
    else if (index === 1)
    {
      if (!this.shareDataService.guardaRoupaEscolhido)
      {
        this.shareDataService.tituloBarraSuperior = 'Seus guarda-roupas';
      }
      this.shareDataService.tabGuardaRoupaSelecionada = true;

      this.listaGuardaRoupas.realinharInkBarDoTabGroupDoGuardaRoupaEscolhido();
    }
    else if  (index === 2)
    {
      this.shareDataService.tituloBarraSuperior = 'Look aleatório';
      this.shareDataService.tabGuardaRoupaSelecionada = false;
    }
  }


}
