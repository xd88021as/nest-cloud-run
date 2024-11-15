import { PrismaService } from 'libs/common/prisma/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { ShopStatusFindUniqueParams } from '../interfaces/shop-status.interface';

@Injectable()
export class ShopStatusRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany() {
    const statuses = await this.prisma.shopStatus.findMany();
    return statuses;
  }

  async findUnique(params: ShopStatusFindUniqueParams) {
    const status = await this.prisma.shopStatus.findUnique({
      where: {
        id: params.where.id,
        name: params.where.name,
      },
    });
    return status;
  }
}
