import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArquivoService } from '../arquivo.service';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './galeria.html',
  styleUrl: './galeria.css'
})
export class GaleriaComponent implements OnInit {
  // Injeta o serviço direto na variável
  private arquivoService = inject(ArquivoService);

  // Agora você pode puxar os Signals sem dar erro!
  fotos = this.arquivoService.fotos;
  loading = this.arquivoService.loading;

  ngOnInit() {
    this.arquivoService.listar();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files;
    if (file) {
      this.arquivoService.upload(file).subscribe({
        next: () => this.arquivoService.listar(),
        error: (err) => console.error('Erro no upload:', err)
      });
    }
  }

 deletar(foto: any) {
    // Tenta pegar o __filename, se não existir pega o filename puro
    const nomeOriginal = foto.__filename || foto.filename;
    
    if (!nomeOriginal) {
      console.error('Não foi possível encontrar o nome deste arquivo:', foto);
      return;
    }

    if (confirm(`Tem certeza que deseja deletar a foto ${nomeOriginal}?`)) {
      // ATENÇÃO: Garanta que aqui esteja usando 'this.arquivoService' (se usou a Opção A do inject)
      this.arquivoService.deletar(nomeOriginal).subscribe({
        next: () => {
          console.log('Deletado com sucesso!');
          this.arquivoService.listar(); // Recarrega a lista reativa na tela
        },
        error: (err) => console.error('Erro ao deletar:', err)
      });
    }
  }