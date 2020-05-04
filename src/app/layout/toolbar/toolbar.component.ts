import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, tap, concatMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SegurancaService } from 'src/app/services/seguranca.service';
import { ShareDataService } from '../../services/share-data.service';
import * as utils from './../../utils';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit
{
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
      private snackBar: MatSnackBar,
      private segurancaService: SegurancaService,
      public shareDataService: ShareDataService, 
      public router: Router) 
  {}

  ngOnInit()
  {}

  exibirMenu() 
  {
    return !this.isInvalidRoute() && !this.isMobile();
  }

  setBackground()
  {
    const background = this.shareDataService.
        backgroundsLogin[this.router.url.replace('/', '').replace('-', '')];
    
    if (background && !this.shareDataService.temaNoturno)
    {
      return background;
    }
    return 'initial';
  }

  private isMobile()
  {
    return this.shareDataService.isSmall || this.shareDataService.isXSmall;
  }

  private isInvalidRoute()
  {
    return this.router.url === '/login' || this.router.url === '/nova-conta' ||
        this.router.url === '/';
  }

  logout()
  {
    const tokenJTI = utils.getTokenJTI('access_token_data');

    if (!utils.isTokenValid('access_token_data'))
    {
      const observable = this.segurancaService.refreshToken()
          .pipe(
              tap(response => 
              {
                utils.setLocalStorageTokenData(response);
              }),
              concatMap(() => this.segurancaService.logout(tokenJTI)));
      this.limparLocalStorageERedirecionar(observable);
    }
    else
    {
      this.limparLocalStorageERedirecionar(this.segurancaService.logout(tokenJTI));
    }
  }

  private limparLocalStorageERedirecionar(observable: Observable<any>)
  {
    observable.subscribe(
        () => 
        {
          utils.clearLocalStorageTokenData();
          
          this.router.navigate(['login']);        
        }, 
        error => 
        {
          this.snackBar.open('Ocorreu um erro ao tentar sair, ' 
              + 'por favor, tente novamente', '', {duration: 3500});
  
          console.log(error);
        }); 
  }
}
