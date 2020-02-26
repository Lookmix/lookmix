import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/services/share-data.service';

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
      public shareDataService: ShareDataService) 
  {}

  ngOnInit() 
  {
    this.criarFormulario();
  }

  private criarFormulario()
  {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  updateMetaTag(rota)
  {
    this.shareDataService.atualizarMetaTagTheme(undefined, rota);
  }
}
