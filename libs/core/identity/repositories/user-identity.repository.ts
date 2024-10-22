import { PrismaService } from 'libs/common/prisma/services/prisma.service';
import { Injectable } from '@nestjs/common';
import {
  UserIdentityData,
  UserIdentityFindManyParams,
  UserIdentityFindUniqueParams,
} from '../interfaces/identity.interface';

@Injectable()
export class UserIdentityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: UserIdentityData) {
    const userIdentity = await this.prisma.userIdentity.create({
      data: {
        userId: data.userId,
        identityId: data.identityId,
      },
    });
    return userIdentity;
  }

  async findMany(params: UserIdentityFindManyParams) {
    const userIdentity = await this.prisma.userIdentity.findMany({
      select: {
        uuid: true,
        identity: { select: { name: true } },
        user: { select: { uuid: true } },
      },
      where: {
        identityId: params.where.identityId,
        userId: params.where.userId,
      },
    });
    return userIdentity;
  }

  async findUnique(params: UserIdentityFindUniqueParams) {
    const userIdentity = await this.prisma.userIdentity.findUnique({
      select: {
        uuid: true,
        identity: { select: { name: true } },
        user: { select: { uuid: true } },
      },
      where: {
        uuid: params.where.uuid,
      },
    });
    return userIdentity;
  }

  async update(uuid: string, data: Partial<UserIdentityData>) {
    const userIdentity = await this.prisma.userIdentity.update({
      data: {
        userId: data.userId,
        identityId: data.identityId,
      },
      where: { uuid },
    });
    return userIdentity;
  }
}
