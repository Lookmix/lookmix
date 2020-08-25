import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import * as utils from './../utils';
import * as uuid from 'uuid';

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
  tabGuardaRoupaSelecionada: boolean = false;
  guardaRoupaEscolhido: any;
  listaGuardaRoupas: any[] = [
    {
      id: uuid.v4(), 
      nome: 'Casual'
    },
    {
      id: uuid.v4(), 
      nome: 'Social'
    }
  ];
  listaEstacoesDoAno: any[] = [
    {
      id: uuid.v4(), 
      nome: 'Primavera'
    },
    {
      id: uuid.v4(), 
      nome: 'Verão'
    },
    {
      id: uuid.v4(), 
      nome: 'Outono'
    },
    {
      id: uuid.v4(), 
      nome: 'Inverno'
    },
  ];
  listaOcasioes: any[] = [
    {
      id: uuid.v4(),
      nome: 'Básico'
    },
    {
      id: uuid.v4(), 
      nome: 'Trabalho'
    },
    {
      id: uuid.v4(), 
      nome: 'Faculdade'
    },
    {
      id: uuid.v4(), 
      nome: 'Festa'
    },
    {
      id: uuid.v4(), 
      nome: 'Viagem'
    },
    {
      id: uuid.v4(), 
      nome: 'Atividades físicas'
    },
    {
      id: uuid.v4(), 
      nome: 'Shopping'
    },
    {
      id: uuid.v4(), 
      nome: 'Parques e praças'
    },
    {
      id: uuid.v4(), 
      nome: 'Praia'
    },
  ]
  urlAnterior: string;

  whiteListMenuButton = [
    '/home'
  ]

  backgroundsLogin = 
  {
    login: '#ffb6c1ad', //#f873ad (v2)   #ffb6c1ad   #fcd4da   lightpink
    novaconta: '#8341a1d4',//  #8341a1   #8341a1d4   #7941a1a1   #7941a1   '#4b0082bd'
  }
  constructor(private breakPointObserver: BreakpointObserver, 
      private router: Router,
      private meta: Meta, public activatedRoute: ActivatedRoute) 
  {
    this.estiloGuardaRoupa = localStorage.getItem('estiloGuardaRoupa');
    this.temaNoturno = localStorage.getItem('temaNoturno') === 'true';
    const guardaRoupaEscolhido = JSON.parse(localStorage.getItem('guardaRoupaEscolhido'));
    this.guardaRoupaEscolhido = guardaRoupaEscolhido !== null ? guardaRoupaEscolhido : undefined;
    this.urlAnterior = utils.getFromLocalStorageDadosUrlAnterior() ? 
        utils.getFromLocalStorageDadosUrlAnterior()['url'] : '';

    this.atualizarMetaTagTheme();

    this.breakPointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ])
    .subscribe(result => 
    {
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
    this.router.events
        .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
        .subscribe((events) => 
        {
          if (!utils.getFromLocalStorageDadosUrlAnterior() || 
              !utils.getFromLocalStorageDadosUrlAnterior()['renovouTokenDuranteRedirecionamento'])
          {
            this.urlAnterior = events[0].urlAfterRedirects;
  
            utils.setInLocalStorageDadosUrlAnterior(this.urlAnterior, false);
          }
          let routeData = events[1].state.root.firstChild.data;

          setTimeout(() => {
            if (!this.temaNoturno)
            {
              this.meta.updateTag({name:'theme-color', content: routeData.corTema});
            }
          });
        });
  }

  atualizarMetaTagTheme(cor?: string, rota?: string)
  {
    if (this.temaNoturno)
    {
      this.meta.updateTag({name:'theme-color', content:'#212121'});
    }
    else if (cor)
    {
      this.meta.updateTag({name: 'theme-color', content: cor})
    }
    else if (rota)
    {
      const background = this.backgroundsLogin[rota];

      if (background && !this.temaNoturno)
      {
        setTimeout(() => {
          this.meta.updateTag({name: 'theme-color', content: background})
        });
      }
    }
    else
    {
      this.meta.updateTag({name:'theme-color', content: 'initial'});
    }
  }


}
