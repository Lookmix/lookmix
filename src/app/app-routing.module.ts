import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardaRoupaComponent } from './usuarios/comum/guarda-roupa/guarda-roupa.component';
import { LooksSemanaisComponent } from './usuarios/comum/looks-semanais/looks-semanais.component';
import { LoginComponent } from './seguranca/login/login.component';
import { ConfiguracoesComponent } from './usuarios/comum/configuracoes/configuracoes.component';
import { CadastroUsuarioComponent } from './usuarios/comum/cadastro-usuario/cadastro-usuario.component';



const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo: 'guarda-roupa'
  },
  {
    path: 'guarda-roupa',
    component: GuardaRoupaComponent,
  },
  {
    path: 'look-semanal',
    component: LooksSemanaisComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  // {
  //   path: 'look-aleatorio',
  //   data: {tituloBarraSuperior: 'Look aleatório'}
  // },
  {
    path: 'configuracoes',
    component: ConfiguracoesComponent
  },
  {
    path: 'nova-conta',
    component: CadastroUsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
