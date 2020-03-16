import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } 
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

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { SpinnerComponent } from './layout/spinner/spinner.component';
import { GuardaRoupaComponent } from './usuarios/comum/guarda-roupa/guarda-roupa.component';
import { ConfiguracoesComponent } from './usuarios/comum/configuracoes/configuracoes.component';
import { LooksSemanaisComponent } from './usuarios/comum/looks-semanais/looks-semanais.component';
import { CardRoupaComponent } from './layout/card-roupa/card-roupa.component';
import { LoginComponent } from './seguranca/login/login.component';
import { DashboardComponent } from './usuarios/admin/dashboard/dashboard.component';
import { CadastroUsuarioComponent, ConfirmacaoNumeroDialogComponent } from './usuarios/comum/cadastro-usuario/cadastro-usuario.component';
import { LogoComponent } from './layout/logo/logo.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpInterceptorService } from './services/http-interceptor.service'
import { environment } from '../environments/environment';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import * as utils from './utils'
// import { HttpXsrfCookieExtractorService } from './services/http-xsrf-cookie-extractor.service';

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
    DashboardComponent,
    CadastroUsuarioComponent,
    ConfirmacaoNumeroDialogComponent,
    LogoComponent
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
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgxMaskModule.forRoot(options),
    // todo: essa lógica só é executada no memento quem o módulo é criado,
    // ou seja, não atende à necessidade de mudança dinâmica.
    HttpClientXsrfModule.withOptions({
      cookieName: utils.isTokenValid('access_token_data') ? 
          'csrf_access_token' : 'csrf_refresh_token',
      headerName: 'X-CSRF-TOKEN',
    }),
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: HttpInterceptorService, 
      multi: true
    },
    // todo: Testar essa alternativa para escolher entre o refresh ou 
    // access token
    // { 
    //   provide: HttpXsrfTokenExtractor, 
    //   useClass: HttpXsrfCookieExtractorService
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
