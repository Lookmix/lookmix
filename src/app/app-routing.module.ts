import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaginaCombinacaoComponent } from './pagina-combinacao/pagina-combinacao.component';


const routes: Routes = [
  {
    path: '',
    component: PaginaCombinacaoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
