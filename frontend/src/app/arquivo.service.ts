import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Foto {
  __filename: string;
  size: number;
  criado: string;
}

@Injectable({ providedIn: 'root' })
export class ArquivoService {
  private readonly API = 'http://localhost:3000/arquivo';
  
  fotos = signal<Foto[]>([]);
  loading = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  listar() {
    this.loading.set(true);
    this.http.get<{total: number, files: Foto[]}>(this.API).subscribe({
      next: (res) => this.fotos.set(res.files),
      error: (err) => console.error(err),
      complete: () => this.loading.set(false)
    });
  }

 upload(file: File) {
  const formData = new FormData();
  // Alterado de 'arquivo' para 'file' para bater com o backend!
  formData.append('file', file); 
  return this.http.post<any>(`${this.API}/upload`, formData);
}
  remover(nome: string) {
    return this.http.delete(`${this.API}/${nome}`);
  }
}