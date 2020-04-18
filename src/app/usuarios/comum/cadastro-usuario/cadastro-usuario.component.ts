import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import { ShareDataService } from 'src/app/services/share-data.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent implements OnInit 
{
  form: FormGroup;
  tipoCampoSenha = 'password';
  disableNextButton: boolean = true;
  screenWidth;

  exibirSpinnerNumero: boolean;
  exibirIconeNumeroValido: boolean;
  exibirIconeNumeroInvalido: boolean;
  private subjectNumeroValidation = new Subject();

  exibirSpinnerNomeUsuario: boolean;
  exibirIconeNomeValido: boolean;
  exibirIconeNomeInvalido: boolean;
  private subjectUsernameValidation = new Subject();
  
  @HostListener('window:resize', ['$event'])
  onResize(event?) 
  {
    this.screenWidth = window.innerWidth;
  }

  public customPatterns = { 
    'x': {pattern: new RegExp('[A-Za-z0-9\-\_\.]+')}
  };

  constructor(public shareDataService: ShareDataService, 
      private usuarioService: UsuarioService,
      private snackBar: MatSnackBar, public dialog: MatDialog,
      public platform: Platform, private formBuilder: FormBuilder, 
      public router: Router) 
  {
    this.shareDataService.tituloBarraSuperior = 'Nova conta';
  }

  ngOnInit() 
  {
    this.createForm();

    this.createHttpRequestUsernameValidation();
    this.createHttpRequestNumeroValidation();
    
    this.screenWidth = window.innerWidth;
  }

  private createForm()
  {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      // email: ['', Validators.email],
      numero: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  updateMetaTag(rota)
  {
    this.shareDataService.atualizarMetaTagTheme(undefined, rota);
  }

  setStateNextButton()
  {
    if (this.form.invalid || this.exibirSpinnerNomeUsuario || 
        this.exibirSpinnerNumero)
    {
      this.disableNextButton = true;
    }
    else
    {
      this.disableNextButton = false;
    }
  }
  
  abrirDialogConfirmacaoNumero()
  {
    if (this.form.valid)
    {
      this.dialog.open(ConfirmacaoNumeroDialogComponent, {
        disableClose: true,
        width: '280px',
        backdropClass: 'backdrop-confirmacao-numero'
      })
    }
  }
  
  validarTelefone()
  {
    const controlTelefone = this.form.get('numero');

    if (controlTelefone.value && controlTelefone.valid)
    {
      this.exibirSpinnerNumero = true;
      this.exibirIconeNumeroInvalido = false;
      this.exibirIconeNumeroValido = false;

      this.subjectNumeroValidation.next(controlTelefone.value);
    }
  }

  setInvisibleNumeroInputIcons()
  {
    this.exibirIconeNumeroValido = false;
    this.exibirSpinnerNumero = false;
    this.exibirIconeNumeroInvalido = false;
  }

  private changeInputNumeroStateAfterUniqueValidation(responseData)
  {
    this.exibirSpinnerNumero = false;
      
    if (!responseData['is_unique'])
    {
      this.exibirIconeNumeroInvalido = true;
      this.exibirIconeNumeroValido = false;

      this.form.get('numero').setErrors({notUnique: true})
    }
    else
    {
      this.exibirIconeNumeroValido = true;
      this.exibirIconeNumeroInvalido = false;
    }
    this.setStateNextButton();
  }

  private tratarErroHttpNumeroUnico(error)
  {
    this.exibirSpinnerNumero = false;

    this.form.get('numero').setValue('');

    this.snackBar.open(error, '', 
        {duration: 4500, panelClass: 'snack-bar-error'});

    console.log(error);
  }

  private createHttpRequestNumeroValidation()
  {
    this.subjectNumeroValidation
        .pipe(
            debounceTime(3000),
            map((numero) => this.usuarioService.isTelefoneValido(numero))
          )
        .subscribe(// subscribe do subject
            httpResponse => 
            {
              httpResponse.subscribe( // subscribe da chamada http
                  data => 
                  {
                    this.changeInputNumeroStateAfterUniqueValidation(data)
                  }, 
                  error => 
                  {
                    this.tratarErroHttpNumeroUnico(error);
                  })
            });
  }

  validarUsername()
  {
    const username = 
        (this.form.get('username').value as string).toLocaleLowerCase();
        
    if (username)
    {
      this.exibirSpinnerNomeUsuario = true;
      this.exibirIconeNomeInvalido = false;
      this.exibirIconeNomeValido = false;

      this.subjectUsernameValidation.next(username);
    }
  }

  setInvisibleUsernameInputIcons()
  {
    this.exibirIconeNomeValido = false;
    this.exibirSpinnerNomeUsuario = false;
    this.exibirIconeNomeInvalido = false;
  }

  private changeInputUsernameStateAfterUniqueValidation(result)
  {
    this.exibirSpinnerNomeUsuario = false;
      
    if (!result['is_unique'])
    {
      this.exibirIconeNomeInvalido = true;
      this.exibirIconeNomeValido = false;

      this.form.get('username').setErrors({notUnique: true})
    }
    else
    {
      this.exibirIconeNomeValido = true;
      this.exibirIconeNomeInvalido = false;
    }
    this.setStateNextButton();
  }

  private tratarErroHttpUsernameUnico(error)
  {
    this.exibirSpinnerNomeUsuario = false;

    this.form.get('username').setValue('');

    this.snackBar.open(error, '', 
        {duration: 4500, panelClass: 'snack-bar-error'});

    console.log(error);
  }

  private createHttpRequestUsernameValidation()
  {
    this.subjectUsernameValidation
        .pipe(
            debounceTime(3000),
            map((username) => this.usuarioService.isUsernameValido(username))
          )
        .subscribe(// subscribe do subject
            httpResponse => 
            {
              httpResponse.subscribe( // subscribe da chamada http
                  data => 
                  {
                    this.changeInputUsernameStateAfterUniqueValidation(data)
                  }, 
                  error => 
                  {
                    this.tratarErroHttpUsernameUnico(error);
                  })
            });
  }
}

@Component({
  selector: 'app-confirmacao-numero-dialog',
  templateUrl: './confirmacao-numero-dialog.component.html',
  styleUrls: ['./confirmacao-numero-dialog.component.scss']
})
export class ConfirmacaoNumeroDialogComponent implements OnInit 
{ 
  form: FormGroup; 

  constructor(public shareDataService: ShareDataService, 
      private usuarioService: UsuarioService,
      private snackBar: MatSnackBar,
      public platform: Platform, private formBuilder: FormBuilder, 
      public router: Router) 
  {
  }

  ngOnInit() 
  {    
    this.createForm();
  }

  private createForm()
  {
    this.form = this.formBuilder.group({
      codigo: ['', Validators.required],
    });
  }
}
