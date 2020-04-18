import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/services/share-data.service';
import { SegurancaService } from 'src/app/services/seguranca.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as utils from './../../utils'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit 
{
  tipoCampoSenha = 'password';
  textoBotaoEntrar = 'ENTRAR';
  desabilitarBotaoEntrar = false;

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, public router: Router, 
      public shareDataService: ShareDataService, 
      private snackBar: MatSnackBar,
      private segurancaService: SegurancaService) 
  {}

  ngOnInit() 
  {
    this.criarFormulario();
  }

  private criarFormulario()
  {
    this.form = this.formBuilder.group({
      phone: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  redirecionarEAtualizarMetaTag(rota)
  {
    if (!this.desabilitarBotaoEntrar)
    {
      this.router.navigate(['nova-conta'])
      
      this.shareDataService.atualizarMetaTagTheme(undefined, rota);
    }
  }

  entrar()
  {
    if (this.form.valid && !this.desabilitarBotaoEntrar)
    {
      this.textoBotaoEntrar = 'ENTRANDO...'
      this.desabilitarBotaoEntrar = true;

      this.segurancaService.login(this.form.value)
          .subscribe(
              data =>
              {
                utils.setLocalStorageTokenData(data);

                this.router.navigate(['guarda-roupa']);
              },
              error =>
              {
                let mensagem = error;

                if (error.unauthorized)
                {
                  mensagem = 'O telefone ou a senha estão incorretos';
                }
                this.snackBar.open(mensagem, '', {
                    duration: 4000, panelClass: 'snack-bar-error'});

                this.textoBotaoEntrar = 'ENTRAR';
                this.desabilitarBotaoEntrar = false;
                
                console.log(error);
              }
            );
    }
  }
}
