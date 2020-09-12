import { Component, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/services/share-data.service';
import { PecaRoupa } from 'src/app/models';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-formulario-nova-peca',
  templateUrl: './formulario-nova-peca.component.html',
  styleUrls: ['./formulario-nova-peca.component.scss']
})
export class FormularioNovaPecaComponent implements OnInit
{
  blinking = false;

  /*guardaRoupa = {
    mangaCurta: [],
    mangaLonga: [],
    pecasUnicas: [],
    roupasBaixo: [],
    calcados: [],
    acessorios: {
      cabeca: [],
      pescoco: [],
      bracos: [],
      pernas: []
    }
  }*/
  ocasiaoEscolhida;
  categoriaEscolhida;
  subcategoriaEscolhida;
  pecasRoupa = [

  ];
  categorias = [
    {
      nameGroup: 'Acessórios cabeça',
      listGroup: ['Bonés, chapéus, óculos, brincos ou laços']
    },
    {
      nameGroup: 'Acessórios pescoço',
      listGroup: ['Colares, correntes, gravatas ou cachecóis'],
    },
    {
      nameGroup: 'Roupas de cima',
      listGroup: ['Camisas, camisetas, polos, blusas ou regatas'],
    },
    {
      nameGroup: 'Peças sobrepostas',
      listGroup: ['Casacos, jaquetas, moletons ou sobretudos'],
    },
    {
      nameGroup: 'Peças únicas',
      listGroup: ['Vestidos ou macacões']
    },
    {
      nameGroup: 'Acessórios braços e mãos',
      listGroup: ['Bolsas, pulseiras, relógios, anéis ou luvas']
    },
    {
      nameGroup: 'Pernas',
      listGroup: ['Calças, shorts, saias ou bermudas']
    },
    {
      nameGroup: 'Cintura',
      listGroup: ['Cintos']
    },
    {
      nameGroup: 'Pés',
      listGroup: ['Calçados ou meias']
    }
  ]

  constructor(public shareDataService: ShareDataService)
  {
    this.shareDataService.tituloBarraSuperior = 'Novas peças';
  }

  ngOnInit()
  {

  }

  escolherOcasiao(event)
  {
    // console.log(event);
  }

  atualizarGuardaRoupa(imagensCarregadas)
  {
    console.log(imagensCarregadas);

    // this.teste.push(imagensCarregadas.ultimaImagemAdicionada)

    if (!imagensCarregadas.exclusao)
    {
      const pecaRoupa: PecaRoupa = {
        categoria: undefined,
        estacoesAno: [],
        guardaRoupa: undefined,
        id: uuid(),
        ocasioes: [],
        imagem: imagensCarregadas.ultimaImagemAdicionada
      }
      this.pecasRoupa.push(pecaRoupa);
    }
    else
    {
    //   const matchPeca = this.pecasRoupa.filter(peca => peca.imagem.id === imagensCarregadas.ultimaImagemAdicionada.id)[0];

    //   if (matchPeca)
    //   {
    //     const index = this.pecasRoupa.indexOf(matchPeca); // get id da imagem e comparar
        
    //     this.pecasRoupa.splice(index, 1);
    //   }
    }
    console.log(this.pecasRoupa);
  }

  mudarFormulario(peca)
  {
    console.log(peca);
    this.piscarFormulario();
  }

  setCategoria(event)
  {
    this.subcategoriaEscolhida = event.value;
  }

  private piscarFormulario()
  {
    setTimeout(() => {
      this.blinking = !this.blinking;
    }, 950)
    this.blinking = !this.blinking;
  }
}