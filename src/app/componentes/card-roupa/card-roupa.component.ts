import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { UploadService } from 'src/app/services/upload.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
  dialogRef: MatDialogRef<SpinnerComponent>;
  // filesFormData: Set<File>;
  @Output() atualizouGuardaRoupa: EventEmitter<Imagem[]> = new EventEmitter();

  constructor(private uploadService: UploadService, 
      private snackBar: MatSnackBar, private dialog: MatDialog,) { }

  ngOnInit() 
  { }

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
        }
        this.prepararImagens(inputFiles);
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

  private prepararImagens(inputFiles: File[])
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

        this.uploadFile(fileFormData);

        this.atualizouGuardaRoupa.emit(this.roupas);

        if (this.dialogRef)
        {
          this.dialogRef.close();
        }
      });
      reader.readAsDataURL(file);
    }
  }

  public uploadFile(fileFormData, refresh?: boolean)
  {
    const roupa = this.roupas.filter(roupa => roupa.id === fileFormData.id)[0];
    
    let fileToUpload;

    if (refresh)
    {
      fileToUpload = fileFormData.fileFormData;
      roupa.falhaUpload = false;
      roupa.uploadCompleto = false;
    }
    else
    {
      fileToUpload = fileFormData.inputFile;
    }
    this.uploadService.uploadFile(fileToUpload).subscribe(
      dados => 
      {
        roupa.uploadCompleto = true;
        roupa.falhaUpload = false;
      },
      erro => 
      {
        roupa.falhaUpload = true;
        roupa.uploadCompleto = false;

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
}

export interface Imagem
{
  id: any;
  inputFile?: string|ArrayBuffer;
  fileFormData: File;
  uploadCompleto: boolean;
  falhaUpload: boolean;
}