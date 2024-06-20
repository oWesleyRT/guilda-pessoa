import { Injectable } from '@nestjs/common';
import { PessoaDTO } from './dtos/pessoa.dto';
import { PessoaEntity } from './entity/pessoa.entity';

@Injectable()
export class PessoaService {
  getPessoa(): PessoaDTO {
    const mariaEntity: PessoaEntity = new PessoaEntity();
    mariaEntity.nome = 'Maria Vascaína';
    mariaEntity.nascimento = '1993';
    const mariaDTO: PessoaDTO = new PessoaDTO();
    mariaDTO.nome = mariaEntity.nome;
    if (mariaEntity.nascimento > '2000') {
      mariaDTO.faixaEtaria = 'Nova';
    } else {
      mariaDTO.faixaEtaria = 'Jovem disfarçado';
    }
    return mariaDTO;
  }
}
