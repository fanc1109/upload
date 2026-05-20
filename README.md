# upload
# ☁️ API de Gerenciamento e Upload de Arquivos

Este projeto é uma API desenvolvida em **NestJS** que funciona como um gerenciador de arquivos locais (Drive). O sistema conta com regras de validação para upload de imagens (limite de tamanho e extensões permitidas), listagem e remoção física de arquivos do servidor.

---

## 🛠️ Pré-requisitos e Instalação

Antes de começar, você precisará ter o **Node.js** instalado em sua máquina.

### Histórico de Criação e Configuração (Comandos Globais):
Caso precise configurar o ambiente NestJS do zero ou entender as dependências instaladas:
# Instalação global do CLI do NestJS
```bash
npx npm i -g @nestjs/common
```
# Criar um novo projeto (caso fosse do zero)
```bash
npx nest new upload
```
# Entrar na pasta do projeto
```bash
cd .\upload\
```
# Instalação do Multer e seus tipos para TypeScript
```bash
npm install --save multer
```
```bash
npm install @types/multer
```
# Gerar o recurso de arquivo (Controller, Service, Module)
```bash
npx nest g resource arquivo
```
Como Rodar o Projeto Atual Localmente:
Instale as dependências locais listadas no projeto:

```bash
npm install
```
Inicie o servidor em modo de desenvolvimento:

```bash
npm run start:dev
```
---
A API estará ativa e escutando requisições em: http://localhost:3000

🚀 Guia Prático de Endpoints e Testes
Você pode testar as rotas utilizando clientes HTTP como Postman, Insomnia ou a extensão Thunder Client do VS Code.

1. Fazer Upload de Imagem (POST)
Envia uma imagem para a pasta ./drive no servidor. O sistema aplica validações de tamanho (máx. 5MB) e formato.

Método: POST

URL: http://localhost:3000/arquivo/upload

Tipo do Corpo (Body): Selecione a opção form-data.

Parâmetros no Body:

Chave (Key): file (lembre-se de mudar o tipo do campo de "Text" para "File" no seu cliente HTTP).

Valor (Value): Selecione o arquivo de imagem do seu computador.
---
🟢 Resposta de Sucesso (HTTP 201 Created):
Importante: Guarde o valor do campo __filename. Ele é o nome gerado pelo sistema que você usará para deletar o arquivo depois.

JSON
{
  "message": "Arquivo enviado com sucesso!",
  "__filename": "file-1716223456789-987654321.png",
  "originalname": "foto-perfil.png",
  "size": 1048576
}
---
🔴 Respostas de Erro:
Tamanho Excedido (HTTP 413 Payload Too Large):

JSON
{
  "statusCode": 413,
  "message": "O arquivo enviado excede o limite permitido de 5MB.",
  "error": "Payload Too Large"
}
---
Formato Não Permitido (HTTP 400 Bad Request):

JSON
{
  "statusCode": 400,
  "message": "Formato inválido. Apenas imagens JPG, JPEG, PNG e TIFF são permitidas.",
  "error": "Bad Request"
}
---
2. Listar Todos os Arquivos (GET)
Varre a pasta de armazenamento e lista todos os arquivos salvos que passaram pelas validações.

Método: GET

URL: http://localhost:3000/arquivo

Tipo do Corpo (Body): Nenhum (none).
---
🟢 Resposta de Sucesso (HTTP 200 OK):
JSON
{
  "total": 1,
  "files": [
    {
      "__filename": "file-1716223456789-987654321.png",
      "size": 1048576,
      "criado": "2026-05-20T14:00:00.000Z"
    }
  ]
}
---

3. Excluir Arquivo por Nome (DELETE)
Exclui o arquivo fisicamente do disco rígido do servidor usando o nome do parâmetro.

Método: DELETE

URL: http://localhost:3000/arquivo/:nome

Exemplo real de uso: http://localhost:3000/arquivo/file-1716223456789-987654321.png

Tipo do Corpo (Body): Nenhum (none).
---
🟢 Resposta de Sucesso (HTTP 200 OK):
JSON
{
  "message": "Arquivo \"file-1716223456789-987654321.png\" foi removido com sucesso do servidor."
}
---
🔴 Resposta de Erro (HTTP 404 Not Found):
Caso o nome do arquivo não exista no servidor:

JSON
{
  "statusCode": 404,
  "message": "O arquivo com o nome \"arquivo-inexistente.png\" não foi encontrado.",
  "error": "Not Found"
}
 