import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardaRoupaComponent } from './funcionalidades/guarda-roupa/guarda-roupa.component';
import { LooksSemanaisComponent } from './funcionalidades/looks-semanais/looks-semanais.component';
import { LoginComponent } from './seguranca/login/login.component';
import { ConfiguracoesComponent } from './funcionalidades/configuracoes/configuracoes.component';
import { CadastroUsuarioComponent } from './funcionalidades/cadastro-usuario/cadastro-usuario.component';
import { AuthGuard } from './guards/auth.guard';
import { MenuNavegacaoComponent } from './layout/menu-navegacao/menu-navegacao.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo: 'login',
    data: {
      corTema: '#fff'
    }
  },
  {
    path: 'guarda-roupa',
    component: GuardaRoupaComponent,
    data: {
      corTema: '#fff'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'look-semanal',
    component: LooksSemanaisComponent,
    data: {
      corTema: '#fff'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      corTema: '#ffb6c1ad'
    },
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'look-aleatorio',
  //   data: {tituloBarraSuperior: 'Look aleatório'}
  // },
  {
    path: 'configuracoes',
    component: ConfiguracoesComponent,
    data: {
      corTema: '#fff'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'nova-conta',
    component: CadastroUsuarioComponent,
    data: {
      corTema: '#8341a1d4'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: MenuNavegacaoComponent,
    data: {
      corTema: '#fff'
    },
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { 
      scrollPositionRestoration: 'top',
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
