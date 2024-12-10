import { Injectable } from '@nestjs/common';
import { IdentityData, IdentityFindUniqueParams } from '../interfaces/identity.interface';
import { PrismaService } from 'libs/common/prisma/services/prisma.service';

@Injectable()
export class IdentityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: IdentityData) {
    const identity = await this.prisma.identity.create({
      data: {
        name: data.name,
      },
    });
    return identity;
  }

  async findMany() {
    const identity = await this.prisma.identity.findMany();
    return identity;
  }

  async findUnique(params: IdentityFindUniqueParams) {
    const identity = await this.prisma.identity.findUnique({
      where: {
        id: params.where.id,
        name: params.where.name,
      },
    });
    return identity;
  }
}
