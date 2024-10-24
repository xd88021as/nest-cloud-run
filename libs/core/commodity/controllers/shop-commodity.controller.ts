import { ShopService } from 'libs/core/shop/services/shop.service';
import {
  ShopCommodityCreateBodyDto,
  ShopCommodityUpdateBodyDto,
} from 'shared/data-access/commodity/shop-commodity-body.dto';
import {
  ShopCommodityParamDto,
  ShopCommodityUpdateParamDto,
} from 'shared/data-access/commodity/shop-commodity-param.dto';
import {
  Body,
  Controller,
  ForbiddenException,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { CommodityService } from '../services/commodity.service';

@UseGuards(AuthGuard('jwt'))
@Controller('shops/:shopUuid/commoditys')
export class ShopCommodityController {
  constructor(
    private readonly shopService: ShopService,
    private readonly commodityService: CommodityService,
  ) {}

  @Post()
  async createCommodity(
    @Request() req,
    @Body() body: ShopCommodityCreateBodyDto,
    @Param() param: ShopCommodityParamDto,
  ): Promise<void> {
    const shop = await this.shopService.findUnique({ where: { uuid: param.shopUuid } });
    if (!shop.users.find((userShop) => userShop.user.uuid === req.user.userUuid)) {
      throw new ForbiddenException();
    }
    await this.commodityService.create({
      name: body.name,
      shopId: shop.id,
      unitCent: body.unitCent,
    });
  }

  @Patch(':commodityUuid')
  async update(
    @Request() req,
    @Body() body: ShopCommodityUpdateBodyDto,
    @Param() param: ShopCommodityUpdateParamDto,
  ): Promise<void> {
    const shop = await this.shopService.findUnique({ where: { uuid: param.shopUuid } });
    if (!shop.users.find((userShop) => userShop.user.uuid === req.user.userUuid)) {
      throw new ForbiddenException();
    }
    const commodity = await this.commodityService.findUnique({
      where: { uuid: param.commodityUuid },
    });
    await this.commodityService.update(commodity.id, {
      name: body.name,
      unitCent: body.unitCent,
    });
  }
}
