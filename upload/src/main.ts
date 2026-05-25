import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express'; // Corrigido para @nestjs
import { AppModule } from './app.module'; // Adicionado o import que faltava
import { join } from 'path';

async function bootstrap() {
  // Criando a aplicação com o tipo correto para habilitar assets estáticos
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Habilita o CORS para o Angular conseguir se comunicar
  app.enableCors();
  
  // Servindo a pasta 'drive' de forma estática. 
  // Usar process.cwd() garante que ele pegue a pasta 'drive' na raiz do seu projeto.
  app.useStaticAssets(join(process.cwd(), 'drive'), {
    prefix: '/arquivo/', 
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();