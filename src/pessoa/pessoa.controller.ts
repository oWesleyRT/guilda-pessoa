import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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
  async post(@Body() dto: PessoaInDTO): Promise<PessoaOutDTO> {
    return await this.service.post(dto);
  }

  @Put('/:id')
  update(@Param('id') id: number, @Body() dto: PessoaInDTO): PessoaOutDTO {
    return this.service.update(id, dto);
  }

  @Delete('/:id')
  delete(@Param('id') id: number): void {
    return this.service.delete(id);
  }
}
