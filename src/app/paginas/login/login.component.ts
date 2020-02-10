import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
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
  isMobile: boolean

  constructor(private formBuilder: FormBuilder, public router: Router,
      private breakPointObserver: BreakpointObserver, 
      public shareDataService: ShareDataService) 
  {
    this.breakPointObserver.observe([
      Breakpoints.XSmall
    ])
    .subscribe(result => {
      if (result.matches)
      {
        this.isMobile = true;
      }
      else
      {
        this.isMobile = false;
      }
    });
  }

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
}
