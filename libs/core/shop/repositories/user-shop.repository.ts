import { PrismaService } from 'libs/common/prisma/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { UserShopData } from '../interfaces/shop.interface';

@Injectable()
export class UserShopRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: UserShopData) {
    const userShop = await this.prisma.userShop.create({
      data: {
        shopId: data.shopId,
        userId: data.userId,
      },
    });
    return userShop;
  }
}
