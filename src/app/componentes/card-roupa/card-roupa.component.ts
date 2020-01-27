import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { UploadService } from 'src/app/services/upload.service';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerComponent } from '../spinner/spinner.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-card-roupa',
  templateUrl: './card-roupa.component.html',
  styleUrls: ['./card-roupa.component.scss']
})
export class CardRoupaComponent implements OnInit 
{
  roupas: Imagem[] = [];
  filesFormData: Set<File>;
  @Output() atualizouGuardaRoupa: EventEmitter<Imagem[]> = new EventEmitter();

  constructor(private uploadService: UploadService, 
      private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() 
  { }

  readFile(event) 
  {
    const inputFiles = event.target.files;

    if (event.target.files && inputFiles) 
    {
      if (this.isTipoArquivoValido(inputFiles))
      {
        const dialogRef = this.dialog.open(SpinnerComponent, {
          disableClose: true,
          data: {
            titulo: "Fazendo upload..."
          }
        });
        this.prepararImagensRequest(inputFiles);
  
        this.uploadFiles(dialogRef);
      }
      else
      {
        this.snackBar.open('Escolha apenas imagens, o arquivo escolhido não é uma imagem.', '', {duration: 4000, panelClass: 'snack-bar-error'})
      }
    }
  }

  excluirImagem(indice)
  {
    this.roupas.splice(indice, 1);

    this.atualizouGuardaRoupa.emit(this.roupas);
  }

  url(file)
  {
    return 'url('+file+') bottom center / cover no-repeat rgb(60, 60, 60)';
  }

  private uploadFiles(dialogRef)
  {
    this.uploadService.uploadFile(this.filesFormData).subscribe(
      dados => 
      {
        if (dados) 
        {
          dialogRef.close();
        }
        console.log(dados);
      },
      erro => 
      {
        console.log(erro)
        dialogRef.close();
      });
  }

  private prepararImagensRequest(inputFiles: any[])
  {
    this.filesFormData = new Set<File>();

    for (let inputFile of inputFiles)
    {
      const id = uuid();

      const file = new File([inputFile.slice(0, inputFile.size, inputFile.type)], id, {type: inputFile.type});

      const reader = new FileReader();
      
      const imagem: Imagem = {id: id};

      reader.onload = (e => 
      {
        imagem.file = reader.result;

        this.roupas.push(imagem);

        this.atualizouGuardaRoupa.emit(this.roupas);
      });
      reader.readAsDataURL(file);
      this.filesFormData.add(inputFile);
    }
  }

  private isTipoArquivoValido(inputFiles: any[])
  {
    for (let file of inputFiles)
    {//console.log(file.type)
      if (!(file.type as string).includes('image'))
      {//console.log('INVÁLIDO')
        return false;
      }
    }//console.log('VÁLIDO')
    return true;
  }
}

export interface Imagem
{
  id: any;
  file?: string|ArrayBuffer;
}