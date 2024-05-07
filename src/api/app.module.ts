import { configuration } from 'libs/common/config/configuration';
import { CommodityModule } from 'libs/core/commodity/commodity.module';
import { ShopModule } from 'libs/core/shop/shop.module';
import { UserModule } from 'libs/core/user/user.module';
import { AuthModule } from 'libs/feature/auth/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';

@Module({
  imports: [
    AuthModule,
    CommodityModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    ShopModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
