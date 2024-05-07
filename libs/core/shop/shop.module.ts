import { PrismaModule } from 'libs/common/prisma/prisma.module';
import { ObjectModule } from 'libs/util/object/object.module';
import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { ShopController } from './controllers/shop.controller';
import { UserShopController } from './controllers/user-shop.controller';
import { ShopRepository } from './repositories/shop.repository';
import { UserShopRepository } from './repositories/user-shop.repository';
import { ShopService } from './services/shop.service';

@Module({
  imports: [ObjectModule, PrismaModule, UserModule],
  controllers: [ShopController, UserShopController],
  providers: [ShopRepository, ShopService, UserShopRepository],
  exports: [ShopService],
})
export class ShopModule {}
