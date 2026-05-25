import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
// Ajustado para o nome do arquivo que está no seu menu lateral (arquivos.ts)
import { ArquivoService, Arquivo } from './arquivos'; 

@Component({
  selector: 'app-documentos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: '../app.html', // Ajustado para a raiz onde está seu app.html
  styleUrl: '../app.css'      // Ajustado para a raiz onde está seu app.css
})
export class DocumentosComponent implements OnInit {
  // 1. Injeção do serviço que você criou em arquivos.ts
  private arquivoService = inject(ArquivoService);

  // 2. Declaração dos Signals (as variáveis que o TS estava cobrando)
  fotos = signal<Arquivo[]>([]);
  isLoading = signal<boolean>(true);
  isUploading = signal<boolean>(false);
  erroUpload = signal<string | null>(null);

  ngOnInit(): void {
    this.carregarFotos();
  }

  carregarFotos(): void {
    this.isLoading.set(true);
    this.arquivoService.listarArquivos().subscribe({
      next: (resposta) => {
        this.fotos.set(resposta.files);
        this.isLoading.set(false);
      },
      error: (erro) => {
        console.error('Erro ao buscar arquivos:', erro);
        this.isLoading.set(false);
      }
    });
  }

 onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      // Adicionado o aqui para pegar o primeiro arquivo da lista:
      this.enviarArquivo(input.files); 
      input.value = ''; 
    }
  }

  enviarArquivo(file: File): void {
    this.isUploading.set(true);
    this.erroUpload.set(null);

    this.arquivoService.fazerUpload(file).subscribe({
      next: (resposta) => {
        const novaFoto: Arquivo = {
          __filename: resposta.__filename,
          size: resposta.size,
          criado: new Date().toISOString()
        };
        this.fotos.update((fotosAtuais) => [novaFoto, ...fotosAtuais]);
        this.isUploading.set(false);
      },
      error: (erro) => {
        this.erroUpload.set(erro.error?.message || 'Erro ao fazer upload.');
        this.isUploading.set(false);
      }
    });
  }

  excluirFoto(nome: string): void {
    this.arquivoService.deletarArquivo(nome).subscribe({
      next: () => {
        this.fotos.update(fotos => fotos.filter(f => f.__filename !== nome));
      },
      error: (err) => console.error('Erro ao deletar', err)
    });
  }
}