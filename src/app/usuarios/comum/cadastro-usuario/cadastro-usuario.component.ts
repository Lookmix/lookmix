import { Component, OnInit, HostListener } from '@angular/core';
import { ShareDataService } from 'src/app/services/share-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Platform } from '@angular/cdk/platform';

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

  constructor(public shareDataService: ShareDataService, 
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
}
