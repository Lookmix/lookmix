import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/services/share-data.service';
import { SegurancaService } from 'src/app/services/seguranca.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit 
{
  tipoCampoSenha = 'password';
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

  updateMetaTag(rota)
  {
    this.shareDataService.atualizarMetaTagTheme(undefined, rota);
  }

  entrar()
  {
    if (this.form.valid)
    {
      this.segurancaService.login(this.form.value)
          .subscribe(
            data =>
            {
              localStorage.setItem("access_token_data",
                  JSON.stringify(data["access_token_data"]));
              localStorage.setItem("refresh_token_data",
                  JSON.stringify(data["refresh_token_data"]));

              this.router.navigate(['guarda-roupa']);
            },
            error =>
            {
              this.snackBar.open(
                  'Erro de conexão, por favor, tente entrar novamente', '', 
                  {duration: 4000, panelClass: 'snack-bar-error'}
              );
              console.log(error);
            }
          );
    }
  }
}
