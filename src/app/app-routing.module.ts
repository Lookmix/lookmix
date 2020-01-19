import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaginaGuardaRoupaComponent } from './paginas/pagina-guarda-roupa/pagina-guarda-roupa.component';
import { PaginaConfiguracoesComponent } from './paginas/pagina-configuracoes/pagina-configuracoes.component';
import { PaginaLooksSemanaisComponent } from './paginas/pagina-looks-semanais/pagina-looks-semanais.component';


const routes: Routes = [
  {
    path: '',
    component: PaginaGuardaRoupaComponent,
  },
  {
    path: 'guarda-roupa',
    component: PaginaGuardaRoupaComponent,
  },
  {
    path: 'look-semanal',
    component: PaginaLooksSemanaisComponent
  },
  // {
  //   path: 'look-aleatorio',
  //   data: {tituloBarraSuperior: 'Look aleatório'}
  // },
  {
    path: 'configuracoes',
    component: PaginaConfiguracoesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
