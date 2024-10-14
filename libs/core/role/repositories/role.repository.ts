import { Injectable } from '@nestjs/common';
import { RoleData, RoleFindManyParams, RoleFindUniqueParams } from '../interfaces/role.interface';
import { PrismaService } from 'libs/common/prisma/services/prisma.service';

@Injectable()
export class RoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: RoleData) {
    const role = await this.prisma.role.create({
      data: {
        name: data.name,
        isPublic: data.isPublic,
      },
    });
    return role;
  }

  async findMany(params: RoleFindManyParams) {
    const role = await this.prisma.role.findMany({
      where: {
        isPublic: params.where.isPublic,
      },
    });
    return role;
  }

  async findUnique(params: RoleFindUniqueParams) {
    const role = await this.prisma.role.findUnique({
      where: {
        name: params.where.name,
      },
    });
    return role;
  }

  async update(id: number, data: Partial<RoleData>) {
    const role = await this.prisma.role.update({
      data: {
        name: data.name,
        isPublic: data.isPublic,
      },
      where: { id },
    });
    return role;
  }
}
