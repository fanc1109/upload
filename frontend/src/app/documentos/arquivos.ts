import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Arquivo {
  __filename: string;
  size: number;
  criado?: string;
}

export interface ListResponse {
  total: number;
  files: Arquivo[];
}

export interface UploadResponse {
  message: string;
  __filename: string;
  originalname: string;
  size: number;
}

@Injectable({ providedIn: 'root' })
export class ArquivoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/arquivo';

  listarArquivos(): Observable<ListResponse> {
    return this.http.get<ListResponse>(this.apiUrl);
  }

  fazerUpload(file: File): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<UploadResponse>(`${this.apiUrl}/upload`, formData);
  }

  deletarArquivo(nome: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${nome}`);
  }
}