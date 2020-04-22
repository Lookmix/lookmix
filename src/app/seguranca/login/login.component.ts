import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/services/share-data.service';
import { SegurancaService } from 'src/app/services/seguranca.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as utils from './../../utils'
import { MatHorizontalStepper } from '@angular/material/stepper';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

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
  ativarEfeitoClique: boolean = false;

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, public router: Router, 
      public shareDataService: ShareDataService, 
      private snackBar: MatSnackBar,
      private segurancaService: SegurancaService,
      private dialog: MatDialog) 
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

  recuperarSenha()
  {
    this.dialog.open(RecuperacaoSenhaComponent, {
      disableClose: true,
      width: '280px',
      backdropClass: 'backdrop-dialog',
      minHeight: '375px',
      maxHeight: '375px'
    })
  }
}

@Component({
  selector: 'app-recuperacao-senha',
  templateUrl: './recuperacao-senha.component.html',
  styleUrls: ['./recuperacao-senha.component.scss']
})
export class RecuperacaoSenhaComponent implements OnInit
{
  @ViewChild('stepper') stepper: MatHorizontalStepper;
  valorTextoBotaoProximo: string = 'ENVIAR';
  valorTextoBotaoVoltar: string = 'CANCELAR';
  exibirSpinnerBotaoNext: boolean = false;


  formGroupTelefone: FormGroup;
  formGroupCodigo: FormGroup;
  formGroupSenha: FormGroup;

  constructor(private formBuilder: FormBuilder, 
      private dialogRef: MatDialogRef<RecuperacaoSenhaComponent>,
      public shareDataService: ShareDataService,
      private snackBar: MatSnackBar)
  {}

  ngOnInit()
  {
    this.createForms();
  }

  isLastStep()
  {
    if (this.stepper)
    {
      return (this.stepper.steps.length - 1) === this.stepper.selectedIndex;
    }
    return false;
  }

  nextStep()
  {
    if (this.stepper.selectedIndex === 0)
    {
      if (this.formGroupTelefone.valid)
      {
        this.valorTextoBotaoProximo = 'ENVIANDO...'
        this.exibirSpinnerBotaoNext = true;

        this.sendCode();
      }
    }
    else if (this.stepper.selectedIndex === 1)
    {
      if (this.formGroupCodigo.valid)
      {
        this.valorTextoBotaoProximo = 'VALIDANDO...'
        this.exibirSpinnerBotaoNext = true;

        this.verifyCode();
      }
    }
    else
    {
      if (this.formGroupSenha.valid)
      {
        this.valorTextoBotaoProximo = 'ATUALIZANDO...'
        this.exibirSpinnerBotaoNext = true;

        this.atualizarSenha();
      }
    }
  }

  previusStep()
  {
    if (this.stepper.selectedIndex === 0)
    {
      this.closeDialog();
    }
    else if (this.stepper.selectedIndex === 1)
    {
      this.valorTextoBotaoProximo = 'ENVIAR'
      this.valorTextoBotaoVoltar = 'CANCELAR'

      this.stepper.previous();
    }
    else
    {
      this.closeDialog();
    }
  }

  closeDialog()
  {
    this.dialogRef.close();
  }

  private sendCode()
  {
    this.stepper.next();
    this.exibirSpinnerBotaoNext = false;
    this.valorTextoBotaoProximo = 'PRÓXIMO';
    this.valorTextoBotaoVoltar = 'VOLTAR'
    
  }

  private verifyCode()
  {
    this.stepper.next();
    this.exibirSpinnerBotaoNext = false;
    this.valorTextoBotaoProximo = 'ATUALIZAR';
    this.valorTextoBotaoVoltar = 'CANCELAR'
  }

  private atualizarSenha()
  {
    setTimeout(() => {
      this.snackBar.open('Senha atualizada com sucesso.', '', {duration: 4000});

      this.closeDialog();
    }, 3000);
  }

  private createForms()
  {
    this.formGroupTelefone = this.formBuilder.group({
      phone: ['', Validators.required]
    });
    this.formGroupCodigo = this.formBuilder.group({
      codigo: ['', Validators.required]
    });
    this.formGroupSenha = this.formBuilder.group({
      password: ['', Validators.required]
    });
  }
}