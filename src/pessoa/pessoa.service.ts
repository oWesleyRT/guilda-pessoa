import { Injectable } from '@nestjs/common';
import { PessoaInDTO } from './dtos/pessoa-in.dto';
import { PessoaOutDTO } from './dtos/pessoa-out.dto';
import { PessoaEntity } from './entity/pessoa.entity';
import { PessoaRepository } from './repository/pessoa.repository';

@Injectable()
export class PessoaService {
  private pessoaBD: PessoaEntity[] = [];

  constructor(private repository: PessoaRepository) {}

  async getAll(): Promise<PessoaOutDTO[]> {
    const pessoasEntity: PessoaEntity[] = await this.repository.getAll();
    const dtoOut: PessoaOutDTO[] = [];
    pessoasEntity.forEach((entity) => {
      const dto: PessoaOutDTO = PessoaEntity.toOutDTO(entity);
      dto.faixaEtaria = this.verificaFaixaEtaria(entity.nascimento);
      dtoOut.push(dto);
    });

    return dtoOut;
  }

  async get(id: number): Promise<PessoaOutDTO> {
    const entity: PessoaEntity = await this.repository.get(id);
    const dtoOut: PessoaOutDTO = PessoaEntity.toOutDTO(entity);
    dtoOut.faixaEtaria = this.verificaFaixaEtaria(entity.nascimento);
    return dtoOut;
  }

  async post(dto: PessoaInDTO): Promise<PessoaOutDTO> {
    const entity: PessoaEntity = new PessoaEntity();
    entity.nome = dto.nome;
    entity.nascimento = dto.nascimento;
    const newEntity: PessoaEntity = await this.repository.post(entity);

    const dtoOut: PessoaOutDTO = new PessoaOutDTO();
    dtoOut.id = newEntity.id;
    dtoOut.nome = newEntity.nome;
    dtoOut.faixaEtaria = this.verificaFaixaEtaria(newEntity.nascimento);
    return dtoOut;
  }

  async update(id: number, dto: PessoaInDTO): Promise<PessoaOutDTO> {
    const entity: PessoaEntity = PessoaEntity.toEntity(dto);
    entity.id = id;
    await this.repository.update(entity);

    const dtoOut: PessoaOutDTO = PessoaEntity.toOutDTO(entity);
    dtoOut.faixaEtaria = this.verificaFaixaEtaria(entity.nascimento);

    return dtoOut;
  }

  private verificaFaixaEtaria(nascimento: string): string {
    if (nascimento > '2000') {
      return 'Nova';
    } else {
      return 'Jovem disfarçado';
    }
  }

  delete(id: number): void {
    this.pessoaBD.splice(id - 1, 1);
  }
}
