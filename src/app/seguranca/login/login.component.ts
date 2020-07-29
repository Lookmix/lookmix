import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/services/share-data.service';
import { SegurancaService } from 'src/app/services/seguranca.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as utils from './../../utils'
import { MatHorizontalStepper } from '@angular/material/stepper';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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

                this.router.navigate(['home']);
              },
              error =>
              {
                let mensagem = error;

                if (error.unauthorized)
                {
                  mensagem = 'O número ou a senha estão incorretos';
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
  tipoCampoSenha: string = 'password'
  exibirSpinnerBotaoNext: boolean = false;
  requestNexmoId: string;
  tentativas = 1;

  formGroupTelefone: FormGroup;
  formGroupCodigo: FormGroup;
  formGroupSenha: FormGroup;

  constructor(private formBuilder: FormBuilder, 
      private dialogRef: MatDialogRef<RecuperacaoSenhaComponent>,
      public shareDataService: ShareDataService,
      private snackBar: MatSnackBar, 
      private usuarioService: UsuarioService)
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

        this.validarNumeroCelular();
      }
      else
      {
        this.formGroupTelefone.markAllAsTouched();
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
      else
      {
        this.formGroupCodigo.markAllAsTouched();
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
      else
      {
        this.formGroupSenha.markAllAsTouched();
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

  private validarNumeroCelular()
  {
    this.usuarioService.isTelefoneValido(this.formGroupTelefone.value['phone'])
        .subscribe(
            successData => 
            {
              if (successData['is_unique'])
              {
                this.snackBar.open('O número informado não pertence a nenhuma conta.', '', 
                {
                  duration: 4000,
                  panelClass: 'snack-bar-error'
                });
                this.exibirSpinnerBotaoNext = false;
                this.valorTextoBotaoProximo = 'ENVIAR'
              }
              else
              {
                this.sendCode()
                    .subscribe(
                        () => 
                        {
                          this.stepper.next();
                          this.exibirSpinnerBotaoNext = false;
                          this.valorTextoBotaoProximo = 'PRÓXIMO';
                          this.valorTextoBotaoVoltar = 'CANCELAR'
                        },
                        errorNexmo => 
                        {
                          this.exibirMsgErroEOcultarSpinnerBotaoNext(errorNexmo);

                          this.exibirSpinnerBotaoNext = false;
                          this.valorTextoBotaoProximo = 'ENVIAR'
                        })
              }
            },
            error => 
            {
              this.exibirMsgErroEOcultarSpinnerBotaoNext(error);

              this.exibirSpinnerBotaoNext = false;
              this.valorTextoBotaoProximo = 'ENVIAR'
            });
  }

  private sendCode(): Observable<any>
  {
    return this.usuarioService.sendVerifyCode(this.formGroupTelefone.value['phone'])
        .pipe(
            tap(nexmoResponse => 
            {
              this.requestNexmoId = nexmoResponse['request_id'];

              return nexmoResponse;
            })
          );
  }

  private verifyCode()
  {
    this.usuarioService.verifyCode(this.requestNexmoId, this.formGroupCodigo.value['codigo'])
        .subscribe(
            data => 
            {
              if (data['is_valid'])
              {
                this.stepper.next();
                this.exibirSpinnerBotaoNext = false;
                this.valorTextoBotaoProximo = 'ATUALIZAR';
                this.valorTextoBotaoVoltar = 'CANCELAR'
              }
              else
              {
                this.formGroupCodigo.get('codigo').setValue('');
                this.exibirSpinnerBotaoNext = false;
                this.valorTextoBotaoProximo = 'PRÓXIMO';

                if (this.tentativas === 3)
                {
                  this.tentativas = 1;

                  this.sendCode()
                      .subscribe(
                          () => 
                          {
                            this.snackBar.open('Suas tentativas esgotaram, um novo código foi enviado para o seu número.', '', 
                            {
                              duration: 5000
                            });
                          }, 
                          error => 
                          {
                            this.exibirMsgErroEOcultarSpinnerBotaoNext(error);

                            this.exibirSpinnerBotaoNext = false;
                            this.valorTextoBotaoProximo = 'PRÓXIMO';
                          });
                }
                else
                {
                  this.exibirMsgErroEOcultarSpinnerBotaoNext(
                        'Código inválido, tente novamente. Você ainda tem ' + 
                        (3 - this.tentativas) + ' tentativa(s).');

                  this.tentativas += 1;
                }
              }
            }, 
            error => 
            {
              this.exibirMsgErroEOcultarSpinnerBotaoNext(error);

              this.exibirSpinnerBotaoNext = false;
              this.valorTextoBotaoProximo = 'PRÓXIMO';
            });
  }

  private atualizarSenha()
  {
    this.usuarioService.atualizarSenha(this.formGroupTelefone.value['phone'], 
        this.formGroupSenha.value['password'])
        .subscribe(
            () => 
            {
              this.snackBar.open('Senha atualizada com sucesso.', '', 
              {
                duration: 4000
              });
              this.closeDialog();
            },
            error => 
            {
              this.exibirMsgErroEOcultarSpinnerBotaoNext(error);

              this.exibirSpinnerBotaoNext = false;
              this.valorTextoBotaoProximo = 'ATUALIZAR';
            }
          )
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

  private exibirMsgErroEOcultarSpinnerBotaoNext(error)
  {
    this.exibirSpinnerBotaoNext = false;

    this.snackBar.open(error, '', {
        duration: 4000, panelClass: 'snack-bar-error'})

    console.log(error);
  }
}