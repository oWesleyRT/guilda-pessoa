import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PessoaInDTO } from './dtos/pessoa-in.dto';
import { PessoaOutDTO } from './dtos/pessoa-out.dto';
import { PessoaService } from './pessoa.service';

@Controller('/pessoa')
export class PessoaController {
  constructor(private service: PessoaService) {}

  @Get()
  get(): PessoaOutDTO[] {
    return this.service.get();
  }

  @Post()
  create(@Body() dto: PessoaInDTO): PessoaOutDTO {
    return this.service.create(dto);
  }

  @Put('/:id')
  update(@Param('id') id: number, @Body() dto: PessoaInDTO): PessoaOutDTO {
    return this.service.update(id, dto);
  }
}
