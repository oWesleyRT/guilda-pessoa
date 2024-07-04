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
  async getAll(): Promise<PessoaOutDTO[]> {
    return await this.service.getAll();
  }

  @Get('/:id')
  async get(@Param('id') id: string): Promise<PessoaOutDTO> {
    return await this.service.get(parseInt(id));
  }

  @Post()
  async post(@Body() dto: PessoaInDTO): Promise<PessoaOutDTO> {
    return await this.service.post(dto);
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() dto: PessoaInDTO,
  ): Promise<PessoaOutDTO> {
    return await this.service.update(parseInt(id), dto);
  }

  @Delete('/:id')
  delete(@Param('id') id: number): void {
    return this.service.delete(id);
  }
}
