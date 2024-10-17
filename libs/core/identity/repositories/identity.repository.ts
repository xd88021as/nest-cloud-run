import { Injectable } from '@nestjs/common';
import { IdentityData, IdentityFindManyParams, IdentityFindUniqueParams } from '../interfaces/identity.interface';
import { PrismaService } from 'libs/common/prisma/services/prisma.service';

@Injectable()
export class IdentityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: IdentityData) {
    const identity = await this.prisma.identity.create({
      data: {
        name: data.name,
        isPublic: data.isPublic,
      },
    });
    return identity;
  }

  async findMany(params: IdentityFindManyParams) {
    const identity = await this.prisma.identity.findMany({
      where: {
        isPublic: params.where.isPublic,
      },
    });
    return identity;
  }

  async findUnique(params: IdentityFindUniqueParams) {
    const identity = await this.prisma.identity.findUnique({
      where: {
        name: params.where.name,
      },
    });
    return identity;
  }

  async update(id: number, data: Partial<IdentityData>) {
    const identity = await this.prisma.identity.update({
      data: {
        name: data.name,
        isPublic: data.isPublic,
      },
      where: { id },
    });
    return identity;
  }
}
