import { Injectable } from '@nestjs/common';
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

  create(dto: PessoaInDTO): PessoaOutDTO {
    const entity: PessoaEntity = new PessoaEntity();
    entity.id = this.pessoaBD.length + 1;
    entity.nome = dto.nome;
    entity.nascimento = dto.nascimento;
    this.pessoaBD.push(entity);

    const dtoOut: PessoaOutDTO = new PessoaOutDTO();
    dtoOut.id = entity.id;
    dtoOut.nome = entity.nome;
    dtoOut.faixaEtaria = this.verificaFaixaEtaria(entity.nascimento);
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

  verificaFaixaEtaria(nascimento: string): string {
    if (nascimento > '2000') {
      return 'Nova';
    } else {
      return 'Jovem disfarçado';
    }
  }
}
