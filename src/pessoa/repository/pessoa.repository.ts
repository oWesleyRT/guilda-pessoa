import { Injectable } from '@nestjs/common';
import { PessoaEntity, PrismaClient } from '@prisma/client';

@Injectable()
export class PessoaRepository {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient({ log: ['query'] });
  }

  public async post(entity: PessoaEntity): Promise<PessoaEntity> {
    return await this.client.pessoaEntity.create({
      data: entity,
    });
  }

  public async getAll(): Promise<PessoaEntity[]> {
    return await this.client.pessoaEntity.findMany();
  }

  public async get(id: number): Promise<PessoaEntity> {
    return await this.client.pessoaEntity.findUnique({
      where: { id: id },
    });
  }

  public async update(entity: PessoaEntity): Promise<PessoaEntity> {
    return await this.client.pessoaEntity.update({
      where: { id: entity.id },
      data: { nome: entity.nome, nascimento: entity.nascimento },
    });
  }
}
