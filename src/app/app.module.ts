import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpXsrfTokenExtractor } 
    from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRippleModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { SpinnerComponent } from './layout/spinner/spinner.component';
import { GuardaRoupaComponent } from './funcionalidades/guarda-roupa/guarda-roupa.component';
import { ConfiguracoesComponent } from './funcionalidades/configuracoes/configuracoes.component';
import { LooksSemanaisComponent } from './funcionalidades/looks-semanais/looks-semanais.component';
import { CardRoupaComponent } from './funcionalidades/guarda-roupa/card-roupa/card-roupa.component';
import { LoginComponent, RecuperacaoSenhaComponent } from './seguranca/login/login.component';
import { CadastroUsuarioComponent, ConfirmacaoNumeroDialogComponent } from './funcionalidades/cadastro-usuario/cadastro-usuario.component';
import { LogoComponent } from './layout/logo/logo.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpInterceptorService } from './services/http-interceptor.service'
import { environment } from '../environments/environment';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { HttpXsrfTokenExtractorService } from './services/http-xsrf-token-extractor.service';
import { MenuNavegacaoComponent } from './layout/menu-navegacao/menu-navegacao.component';
import { ListaGuardaRoupasComponent } from './funcionalidades/guarda-roupa/lista-guarda-roupas/lista-guarda-roupas.component';
import { AcoesToolbarGuardaRoupaComponent, FormularioNovaPecaDialogComponent } from './layout/toolbar/acoes-toolbar-guarda-roupa/acoes-toolbar-guarda-roupa.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SpinnerComponent,
    GuardaRoupaComponent,
    ConfiguracoesComponent,
    LooksSemanaisComponent,
    CardRoupaComponent,
    LoginComponent,
    CadastroUsuarioComponent,
    ConfirmacaoNumeroDialogComponent,
    LogoComponent,
    RecuperacaoSenhaComponent,
    MenuNavegacaoComponent,
    ListaGuardaRoupasComponent,
    AcoesToolbarGuardaRoupaComponent,
    FormularioNovaPecaDialogComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTabsModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatRippleModule,
    MatSelectModule,
    MatChipsModule,
    MatButtonToggleModule,
    
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgxMaskModule.forRoot(options),
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: HttpInterceptorService, 
      multi: true
    },
    { 
      provide: HttpXsrfTokenExtractor, 
      useClass: HttpXsrfTokenExtractorService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
