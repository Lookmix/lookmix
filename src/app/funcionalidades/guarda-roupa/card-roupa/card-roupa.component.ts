import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { v4 as uuid } from 'uuid';
import { UploadService } from 'src/app/services/upload.service';
import { SpinnerComponent } from './../../../layout/spinner/spinner.component';
import { ShareDataService } from 'src/app/services/share-data.service';
import { Imagem } from 'src/app/models';


@Component({
  selector: 'app-card-roupa',
  templateUrl: './card-roupa.component.html',
  styleUrls: ['./card-roupa.component.scss']
})
export class CardRoupaComponent implements OnInit 
{
  roupas: Imagem[] = [];
  roupas2 = [
    '../../../../assets/roupas/1.jpg',
    '../../../../assets/roupas/2.jpg',
    '../../../../assets/roupas/3.jpg',
    '../../../../assets/roupas/4.jpg',
    '../../../../assets/roupas/5.jpg',
    '../../../../assets/roupas/6.jpg',
    '../../../../assets/roupas/7.jpg',
    '../../../../assets/roupas/8.jpg',
    '../../../../assets/roupas/9.jpg',
  ];
  dialogRef: MatDialogRef<SpinnerComponent>;

  @Output() atualizouGuardaRoupa: EventEmitter<any> = new EventEmitter();
  @Output() selecionouPeca: EventEmitter<any> = new EventEmitter();
  @Output() clicouAdicionar: EventEmitter<any> = new EventEmitter();

  constructor(private uploadService: UploadService,
      public shareDataService: ShareDataService,
      private snackBar: MatSnackBar, private dialog: MatDialog) 
  {}

  ngOnInit() 
  {}

  readFile(event) 
  {
    const inputFiles = event.target.files;

    if (event.target.files && inputFiles) 
    {
      if (this.isTipoArquivoValido(inputFiles))
      {
        if (inputFiles.length > 2)
        {
          this.dialogRef = this.dialog.open(SpinnerComponent, {
            disableClose: true,
            data: {
              titulo: "Carregando imagens..."
            }
          });
        };
        this.prepararImagens(inputFiles, event);
      }
      else
      {
        this.snackBar.open('Escolha apenas imagens, o arquivo escolhido não é uma imagem.', '', {duration: 4000, panelClass: 'snack-bar-error'})
      }
    }
  }

  excluirImagem(indice, cardImagem: HTMLElement)
  {
    if (this.roupas[indice].selecionada && this.roupas.length > 1)
    {
      if ((indice + 1) === this.roupas.length)
      {
        this.selecionarPeca(this.roupas[indice - 1], cardImagem)
      }
      else
      {
        this.selecionarPeca(this.roupas[indice + 1], cardImagem)
      }
    }
    this.roupas.splice(indice, 1);

    this.atualizouGuardaRoupa.emit({exclusao: true, listaImagens: this.roupas});
  }

  url(file)
  {
    return 'url('+file+') bottom center / cover no-repeat rgb(60, 60, 60)';
  }

  private prepararImagens(inputFiles: File[], event?)
  {
    for (let inputFile of inputFiles)
    {
      const id = uuid();
      
      const file = new File([inputFile.slice(0, inputFile.size, inputFile.type)], id, {type: inputFile.type});
      
      const imagem: Imagem = {id: id, uploadCompleto: false, falhaUpload: false, 
          fileFormData: inputFile};

      const reader = new FileReader();

      reader.onload = (e => 
      {
        let fileFormData = {inputFile: inputFile, id: id};

        imagem.inputFile = reader.result;
        
        this.roupas.push(imagem);

        this.uploadFile(fileFormData, event);

        this.atualizouGuardaRoupa.emit({ultimaImagemAdicionada: imagem, listaImagens: this.roupas});

        if (this.dialogRef)
        {
          this.dialogRef.close();
        }
      });
      reader.readAsDataURL(file);
    }
  }

  public uploadFile(fileFormData, event, refresh?: boolean)
  {
    const peca = this.roupas.filter(roupa => roupa.id === fileFormData.id)[0];
    
    let fileToUpload;

    if (refresh)
    {
      fileToUpload = fileFormData.fileFormData;
      peca.falhaUpload = false;
      peca.uploadCompleto = false;
    }
    else
    {
      fileToUpload = fileFormData.inputFile;
    }
    this.uploadService.uploadFile(fileToUpload)
        .subscribe(
            () => 
            {
              peca.uploadCompleto = true;
              peca.falhaUpload = false;

              if (event)
              {
                const listaImagens = event.path[1].children;
                const ultimaPecaAdicionada = listaImagens[listaImagens.length - 3]
                this.selecionarPeca(peca, ultimaPecaAdicionada);
              }
            },
            erro => 
            {
              peca.falhaUpload = true;
              peca.uploadCompleto = false;

              console.log(erro)
            });
  }

  private isTipoArquivoValido(inputFiles: any[])
  {
    for (let file of inputFiles)
    {
      if (!(file.type as string).includes('image'))
      {
        return false;
      }
    }
    return true;
  }

  selecionarPeca(peca: Imagem, cardElement: HTMLElement)
  {
    if (!peca.selecionada)
    {
      this.desselecionarPecas();
      
      peca.selecionada = true;
  
      this.selecionouPeca.emit(peca);
      
      if (cardElement)
      {
        this.focarPeca(cardElement);
      }
    }
  }

  private desselecionarPecas()
  {
    for (let peca of this.roupas)
    {
      peca.selecionada = false;
    }
  }

  private focarPeca(htmlElement: HTMLElement)
  {
    htmlElement.scrollIntoView({block: 'center', inline: 'center'})
  }
}