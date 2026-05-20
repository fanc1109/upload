import { BadRequestException, Injectable, NotFoundException, PayloadTooLargeException } from '@nestjs/common';
import { CreateArquivoDto } from './dto/create-arquivo.dto';
import { UpdateArquivoDto } from './dto/update-arquivo.dto';
import * as fs from 'fs';

@Injectable()
export class ArquivoService {
  private readonly pastaUpload = './drive';

  constructor() {
    if (!fs.existsSync(this.pastaUpload)) {
      fs.mkdirSync(this.pastaUpload, { recursive: true });
    }
  }
  //retorna os dados do arquivo após o upload
  create(arquivo: Express.Multer.File) {

  // --- VALIDAÇÃO 1: RESTRIÇÃO DE TAMANHO (MÁX 5MB) ---
    const limiteMaximo = 5 * 1024 * 1024; // 5MB em Bytes
    if (arquivo.size > limiteMaximo) {
      // Bônus: Apaga o arquivo temporário salvo pelo Multer para não acumular lixo
      if (fs.existsSync(arquivo.path)) fs.unlinkSync(arquivo.path);
      
      // Bônus/Tratamento: Retorna explicitamente o Status HTTP 413 (Payload Too Large)
      throw new PayloadTooLargeException('O arquivo enviado excede o limite permitido de 5MB.');
    }

    // --- VALIDAÇÃO 2: FORMATO DO ARQUIVO (APENAS IMAGENS) ---
    const extensoesPermitidas = ['.jpg', '.jpeg', '.png', '.tiff'];
    // Extrai a extensão do nome original do arquivo e transforma em minúsculo
    const ext = arquivo.originalname.substring(arquivo.originalname.lastIndexOf('.')).toLowerCase();

    if (!extensoesPermitidas.includes(ext)) {
      // Bônus: Apaga o arquivo inválido do disco
      if (fs.existsSync(arquivo.path)) fs.unlinkSync(arquivo.path);
      
      // Bônus/Tratamento: Retorna o Status HTTP 400 (Bad Request)
      throw new BadRequestException('Formato inválido. Apenas imagens JPG, JPEG, PNG e TIFF são permitidas.');
    }

    // Se passar por todas as validações, retorna o sucesso original
    return {
      message: 'Arquivo enviado com sucesso!',
      __filename: arquivo.filename,
      originalname: arquivo.originalname,
      size: arquivo.size,
    };
  }


  findAll() {
    try {
      const files = fs.readdirSync(this.pastaUpload);
      const fileList = files.map(
        (__filename) => {
          const stats = fs.statSync(`${this.pastaUpload}/${__filename}`);
          return {
            __filename,
            size: stats.size,
            criado: stats.birthtime,
          };
        }
      );
      return {
        total: fileList.length,
        files: fileList,
      };
    } catch (error) {
      throw new BadRequestException('Não foi possivel listar os arquivos.')
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} arquivo`;
  }

  update(id: number, updateArquivoDto: UpdateArquivoDto) {
    return `This action updates a #${id} arquivo`;
  }

 remove(nome: string) {
    const caminhoArquivo = `${this.pastaUpload}/${nome}`;

    // Fluxo/Bônus: Verifica se o arquivo realmente existe na pasta './drive'
    if (!fs.existsSync(caminhoArquivo)) {
      // Tratamento: Retorna Status HTTP 404 Not Found caso o arquivo não exista
      throw new NotFoundException(`O arquivo com o nome "${nome}" não foi encontrado.`);
    }

    try {
      // Remove o arquivo fisicamente do armazenamento local
      fs.unlinkSync(caminhoArquivo);
      
      return {
        message: `Arquivo "${nome}" foi removido com sucesso do servidor.`
      };
    } catch (error) {
      throw new BadRequestException('Não foi possível remover o arquivo.');
    }
  }
}
