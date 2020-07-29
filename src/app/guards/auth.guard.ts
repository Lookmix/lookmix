import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as utils from './../utils';
import { SegurancaService } from '../services/seguranca.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SpinnerComponent } from '../layout/spinner/spinner.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate
{
  private whiteListRoutes = [
    'login',
    'nova-conta'
  ]

  constructor(private segurancaService: SegurancaService,
      private snackBar: MatSnackBar,
      private router: Router,
      private dialog: MatDialog)
  {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  {    
    const url = next.url[0].path;

    if (this.whiteListRoutes.includes(url))
    {
      return this.permitirNavegarParaLoginOuNovaConta();
    }
    if (utils.isTokenValid('access_token_data'))
    {
      const localStorageDadosUrlAnterior = utils.getFromLocalStorageDadosUrlAnterior();

      if (localStorageDadosUrlAnterior)
      {
        utils.setInLocalStorageDadosUrlAnterior(localStorageDadosUrlAnterior['url'], false);
      }
      return true;
    }
    else if (utils.isTokenValid('refresh_token_data'))
    {
      this.renovarTokenERedirecionar(url);

      return false;
    }
    this.router.navigate(['login']);

    const msg: string = 'Por questões de segurança você precisa entrar na sua conta novamente.';

    this.snackBar.open(msg, '', {duration: 4500});

    return false;
  }
  
  private renovarTokenERedirecionar(url)
  {
    const dialogSpinnerRef = this.abrirSpinnerCarregamento();

    this.segurancaService.refreshToken()
        .subscribe(
            data => 
            {
              utils.setLocalStorageTokenData(data);

              const localStorageDadosUrlAnterior = utils.getFromLocalStorageDadosUrlAnterior();

              utils.setInLocalStorageDadosUrlAnterior(localStorageDadosUrlAnterior['url'], true)

              this.router.navigate([url]);

              dialogSpinnerRef.close();
            }, 
            error => 
            {
              utils.clearLocalStorageTokenData();
              
              this.router.navigate(['login']);

              dialogSpinnerRef.close();

              this.snackBar.open('Devido à um erro de rede você precisa entrar novamente.', 
                  '', {duration: 4500}) 

              console.log(error);
            });
  }

  private abrirSpinnerCarregamento(): MatDialogRef<SpinnerComponent>
  {
   return this.dialog.open(SpinnerComponent, {
      disableClose: true,
      minWidth: '200px',
      backdropClass: 'backdrop-dialog',
      data: {
        titulo: "Carregando..."
      }
    });
  }

  private permitirNavegarParaLoginOuNovaConta(): boolean
  {
    if (utils.isTokenValid('access_token_data') || 
        utils.isTokenValid('refresh_token_data'))
    {
      this.router.navigate(['home'])

      return false;
    }
    return true;
  }
}