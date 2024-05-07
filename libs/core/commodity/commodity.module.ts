import { PrismaModule } from 'libs/common/prisma/prisma.module';
import { ObjectModule } from 'libs/util/object/object.module';
import { Module } from '@nestjs/common';
import { ShopModule } from '../shop/shop.module';
import { CommodityController } from './controllers/commodity.controller';
import { CommodityRepository } from './repositories/commodity.repository';
import { CommodityService } from './services/commodity.service';

@Module({
  imports: [ObjectModule, PrismaModule, ShopModule],
  controllers: [CommodityController],
  providers: [CommodityRepository, CommodityService],
  exports: [CommodityService],
})
export class CommodityModule {}
