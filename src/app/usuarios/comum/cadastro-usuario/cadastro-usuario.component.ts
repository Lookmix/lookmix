import { Component, OnInit, HostListener } from '@angular/core';
import { ShareDataService } from 'src/app/services/share-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent implements OnInit 
{
  form: FormGroup;
  tipoCampoSenha = 'password';
  screenWidth;
  
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
      private snackBar: MatSnackBar,
      public platform: Platform, private formBuilder: FormBuilder, 
      public router: Router) 
  {
    this.shareDataService.tituloBarraSuperior = 'Nova conta';
  }

  ngOnInit() 
  {
    this.createForm();
    
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

  validarUsername()
  {
    const username = (this.form.get('username').value as string)
        .toLocaleLowerCase();
    if (username)
    {
      this.usuarioService.isUsernameValido(username)
          .subscribe(
            data => 
            {
              if (!data['is_unique'])
              {
                this.form.get('username').setErrors({notUnique: true})
              }
            }, 
            error => 
            {
              this.form.get('username').setValue('')
  
              this.snackBar.open(
                  'Erro de conexão, por favor, digite o nome de usuário novamente', '', 
                  {duration: 4000, panelClass: 'snack-bar-error'}
              );
              console.log(error);
            });
    }
  }

  validarTelefone()
  {
    const controlTelefone = this.form.get('numero');

    if (controlTelefone.value && controlTelefone.valid)
    {
      this.usuarioService.isTelefoneValido(controlTelefone.value)
          .subscribe(
            data => 
            {
              if (!data['is_unique'])
              {
                this.form.get('numero').setErrors({notUnique: true})
              }
            }, 
            error => 
            {
              this.form.get('numero').setValue('');
  
              this.snackBar.open(
                  'Erro de conexão, por favor, digite o telefone novamente', '', 
                  {duration: 4000, panelClass: 'snack-bar-error'}
              );
              console.log(error);
            });
    }
  }
}
