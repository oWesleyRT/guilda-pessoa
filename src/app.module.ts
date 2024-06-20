import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PessoaController } from './pessoa/pessoa.controller';
import { PessoaService } from './pessoa/pessoa.service';

@Module({
  imports: [],
  controllers: [AppController, PessoaController],
  providers: [AppService, PessoaService],
})
export class AppModule {}
