import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PessoaInDTO } from './dtos/pessoa-in.dto';
import { PessoaOutDTO } from './dtos/pessoa-out.dto';
import { PessoaEntity } from './entity/pessoa.entity';

@Injectable()
export class PessoaService {
  private pessoaBD: PessoaEntity[] = [];

  get(): PessoaOutDTO[] {
    const listPessoaDTO: PessoaOutDTO[] = [];
    this.pessoaBD.forEach((pessoa) => {
      const newPessoaDTO: PessoaOutDTO = new PessoaOutDTO();
      newPessoaDTO.id = pessoa.id;
      newPessoaDTO.nome = pessoa.nome;
      newPessoaDTO.faixaEtaria = this.verificaFaixaEtaria(pessoa.nascimento);
      listPessoaDTO.push(newPessoaDTO);
    });

    return listPessoaDTO;
  }

  async post(dto: PessoaInDTO): Promise<PessoaOutDTO> {
    const entity: PessoaEntity = new PessoaEntity();
    entity.nome = dto.nome;
    entity.nascimento = dto.nascimento;
    const prisma = new PrismaClient({ log: ['query'] });
    const newEntity: PessoaEntity = await prisma.pessoaEntity.create({
      data: entity,
    });

    const dtoOut: PessoaOutDTO = new PessoaOutDTO();
    dtoOut.id = newEntity.id;
    dtoOut.nome = newEntity.nome;
    dtoOut.faixaEtaria = this.verificaFaixaEtaria(newEntity.nascimento);
    return dtoOut;
  }

  update(id: number, dto: PessoaInDTO): PessoaOutDTO {
    const entity: PessoaEntity = this.pessoaBD.find(
      (pessoa) => pessoa.id == id,
    );

    entity.nome = dto.nome;
    entity.nascimento = dto.nascimento;

    const dtoOut: PessoaOutDTO = new PessoaOutDTO();
    dtoOut.id = entity.id;
    dtoOut.nome = entity.nome;
    dtoOut.faixaEtaria = this.verificaFaixaEtaria(entity.nascimento);

    return dtoOut;
  }

  delete(id: number): void {
    this.pessoaBD.splice(id - 1, 1);
  }

  verificaFaixaEtaria(nascimento: string): string {
    if (nascimento > '2000') {
      return 'Nova';
    } else {
      return 'Jovem disfarçado';
    }
  }
}
