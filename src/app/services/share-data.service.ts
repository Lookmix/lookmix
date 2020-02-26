import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';

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

    this.atualizarMetaTagTheme();

    this.breakPointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ])
    .subscribe(result => {
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

    this.router.events.subscribe((data) => 
    {
      if (data instanceof RoutesRecognized) 
      {
        let routeData = data.state.root.firstChild.data;

        setTimeout(() => {
          if (!this.temaNoturno)
          {
            this.meta.updateTag({name:'theme-color', content: routeData.corTema});
          }
        })
      }
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
