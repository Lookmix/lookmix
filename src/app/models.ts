export interface Imagem
{
  id: any;
  inputFile?: string|ArrayBuffer;
  fileFormData: File;
  uploadCompleto: boolean;
  falhaUpload: boolean;
  selecionada?: boolean;
}

export interface PecaRoupa {
  id: any;
  ocasioes: string[];
  guardaRoupa: string;
  estacoesAno: string[]; 
  categoria: string;
  imagem: Imagem;
}

export interface Combinacao
{
  roupaCima: PecaRoupa;
  roupaBaixo: PecaRoupa;
  calcado: PecaRoupa;
  acessorio1: PecaRoupa;
  acessorio2: PecaRoupa;
}


