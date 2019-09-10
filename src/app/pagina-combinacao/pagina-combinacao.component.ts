import { Component, OnInit } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerComponent } from '../spinner/spinner.component';


@Component({
  selector: 'app-pagina-combinacao',
  templateUrl: './pagina-combinacao.component.html',
  styleUrls: ['./pagina-combinacao.component.scss']
})
export class PaginaCombinacaoComponent implements OnInit 
{
  roupasCima: Imagem[] = [
    // "Camiseta mostarda", 
    // "Camiseta branca com ancoras", 
    // "Camiseta preta polo", 
    // "Camiseta roxa",
    // "Camiseta branca polo",
    // "Camiseta DC",
    // "Camiseta Metallica",
    // "Camiseta social jeans",
    // "Camiseta branca manga longa Volcom",
    // "Camiseta vermelha Volcom",
    // "Camiseta vermelha caveira Volcom"
  ];
  roupasBaixo: Imagem[] = [
    // "Calça preta",
    // "Calça bege",
    // "Calça jeans",
    // "Calça marrom"
  ];
  calcados: Imagem[] = [
    // "Tênis preto",
    // "Tênia nike",
    // "Tênis branco",
    // "Tênis hocks bege"
  ];
  combinacoes = []

  constructor(public dialog: MatDialog) {}

  // openDialog() 
  // {
  //   const dialogRef = this.dialog.open(SpinnerComponent, {
  //     disableClose: true
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

  ngOnInit()
  {
    // this.gerarCombinacoes();
  }

  gerarCombinacoes()
  {
    const dialogRef = this.dialog.open(SpinnerComponent, {
      disableClose: true
    });
    dialogRef.afterOpened().subscribe(() => 
    {
      for (let roupaCima of this.roupasCima)
      {
        for (let roupaBaixo of this.roupasBaixo)
        {
          for (let calcado of this.calcados)
          {
            let vestimenta = {roupaCima: roupaCima, roupaBaixo: roupaBaixo, calcado: calcado};
  
            this.combinacoes.push(vestimenta);
          }
        }
      }
      dialogRef.close();
    });
  }

  readURL(event, tipoVestimenta) 
  {
    if (event.target.files && event.target.files[0]) 
    {
      const file = event.target.files[0];

      const reader = new FileReader();

      const imagem: Imagem = {id: uuid()};
            
      reader.onload = (e => 
      {
        imagem.file = reader.result;

        if (tipoVestimenta === 'roupaCima')
        {
          this.roupasCima.push(imagem)
        }
        else if (tipoVestimenta === 'roupaBaixo')
        {
          this.roupasBaixo.push(imagem);
        }
        else
        {
          this.calcados.push(imagem);
        }
        // this.galeria.push(imagem)
      });
      reader.readAsDataURL(file);
    }
  }

  excluirImagem(imagem)
  {
    // this.galeria.splice(this.galeria.indexOf(imagem), 1)
    'url('+imagem.caminhoSistemaArquivos+') bottom center / cover no-repeat rgb(60, 60, 60)';
  }


}

export interface Vestimenta
{
  roupaCima: Imagem;
  roupaBaixo: Imagem;
  calcado: Imagem;
}

export interface Imagem
{
  id: any;
  file?: string|ArrayBuffer;
}