import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { UploadService } from 'src/app/services/upload.service';

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

  constructor(private uploadService: UploadService) { }

  ngOnInit() 
  { }

  readURL(event) 
  {
    const inputFiles = event.target.files;

    if (event.target.files && inputFiles) 
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
      this.uploadService.uploadFile(this.filesFormData).subscribe(response => {
        console.log(response);
      })
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
}

export interface Imagem
{
  id: any;
  file?: string|ArrayBuffer;
}