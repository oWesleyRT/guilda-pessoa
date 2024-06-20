import { Controller, Get } from '@nestjs/common';
import { PessoaDTO } from './dtos/pessoa.dto';
import { PessoaService } from './pessoa.service';

@Controller('/pessoa')
export class PessoaController {
  constructor(private service: PessoaService) {}

  @Get()
  getPessoa(): PessoaDTO {
    return this.service.getPessoa();
  }
}
