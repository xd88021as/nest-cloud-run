import { UserService } from 'libs/core/user/services/user.service';
import { ShopFindUniqueParamDto } from 'shared/data-access/shop/shop-param.dto';
import { ShopFindManyQueryDto } from 'shared/data-access/shop/shop-query.dto';
import {
  ShopFindManyResponseDto,
  ShopFindUniqueResponseDto,
} from 'shared/data-access/shop/shop-response.dto';
import { Controller, Get, NotFoundException, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { ShopService } from '../services/shop.service';

@UseGuards(AuthGuard('jwt'))
@Controller('shops')
export class ShopController {
  constructor(
    private readonly shopService: ShopService,
    private readonly userService: UserService,
  ) {}

  @Get()
  async findMany(@Query() query: ShopFindManyQueryDto): Promise<ShopFindManyResponseDto> {
    const user = await this.userService.findUnique({ where: { uuid: query.userUuid } });
    const skip = (query.page - 1) * query.limit;
    const shops = await this.shopService.findMany({
      where: { userId: user?.id, skip, take: query.limit },
    });
    return ShopFindManyResponseDto.generate(shops);
  }

  @Get(':uuid')
  async findUnique(@Param() param: ShopFindUniqueParamDto): Promise<ShopFindUniqueResponseDto> {
    const shop = await this.shopService.findUnique({ where: { uuid: param.uuid } });
    if (!shop) {
      throw new NotFoundException();
    }
    return ShopFindUniqueResponseDto.generate(shop);
  }
}
