import { PessoaInDTO } from '../dtos/pessoa-in.dto';
import { PessoaOutDTO } from '../dtos/pessoa-out.dto';

export class PessoaEntity {
  id: number;
  nome: string;
  nascimento: string;

  public static toOutDTO(entity: PessoaEntity) {
    const dto: PessoaOutDTO = new PessoaOutDTO();
    dto.id = entity.id;
    dto.nome = entity.nome;

    return dto;
  }

  public static toEntity(dto: PessoaInDTO): PessoaEntity {
    const entity: PessoaEntity = new PessoaEntity();
    entity.nome = dto.nome;
    entity.nascimento = dto.nascimento;

    return entity;
  }
}
