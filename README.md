# upload
18-05-2026/ gerenciador de arquivos

 npx npm i -g @nestjs/cli      

  npx nest new upload

  cd .\upload\

  npm run start 

  http://localhost:3000/

 npm install --save multer

 npx nest g resource arquivo

  npm install @types/multer


 # ☁️ API de Armazenamento e Validação de Arquivos

Esta é uma API desenvolvida em **NestJS** que simula um serviço de armazenamento em nuvem (Drive). Ela permite o upload de imagens, listagem dos arquivos salvos e a remoção física dos arquivos do servidor através do nome, contando com regras rigorosas de validação de tamanho e formato.

---

## 🛠️ Pré-requisitos e Instalação

Antes de iniciar, garanta que você possui o **Node.js** (v18 ou superior) instalado em sua máquina.

### Passo a Passo para Rodar Localmente:

1. **Abra o terminal** na pasta raiz do seu projeto (onde fica o arquivo `package.json`).
2. **Instale as dependências** do projeto executando:
   ```bash
   npm install
3.Inicie o servidor em modo de desenvolvimento com o comando:
 