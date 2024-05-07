import { SetIdentityOwners } from 'libs/common/authorization/decorators/identity-owners.decorator';
import { IdentityOwnersGuard } from 'libs/common/authorization/guards/identity-owners.guard';
import { UserService } from 'libs/core/user/services/user.service';
import {
    UserShopCreateBodyDto, UserShopUpdateBodyDto
} from 'shared/data-access/shop/user-shop-body.dto';
import {
    UserShopParamDto, UserShopUpdateParamDto
} from 'shared/data-access/shop/user-shop-param.dto';
import {
    Body, Controller, ForbiddenException, Param, Patch, Post, UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { ShopService } from '../services/shop.service';

@UseGuards(AuthGuard('jwt'))
@Controller('users/:userUuid/shops')
export class UserShopController {
  constructor(
    private readonly shopService: ShopService,
    private readonly userService: UserService
  ) {}

  @Post()
  @SetIdentityOwners({ identity: 'user', reqField: 'param', uuidName: 'userUuid' })
  @UseGuards(IdentityOwnersGuard)
  async create(
    @Body() body: UserShopCreateBodyDto,
    @Param() param: UserShopParamDto
  ): Promise<void> {
    const user = await this.userService.findUnique({ where: { uuid: param.userUuid } });
    const shop = await this.shopService.create({
      name: body.name,
      localPhoneNumber: body.localPhoneNumber,
      mobilePhoneNumber: body.mobilePhoneNumber,
      introduce: body.introduce,
    });
    await this.shopService.createUserShop({ shopId: shop.id, userId: user.id });
  }

  @Patch(':shopUuid')
  @SetIdentityOwners({ identity: 'user', reqField: 'param', uuidName: 'userUuid' })
  @UseGuards(IdentityOwnersGuard)
  async update(
    @Body() body: UserShopUpdateBodyDto,
    @Param() param: UserShopUpdateParamDto
  ): Promise<void> {
    const shop = await this.shopService.findUnique({ where: { uuid: param.shopUuid } });
    if (!shop.users.find((userShop) => userShop.user.uuid === param.userUuid)) {
      throw new ForbiddenException();
    }
    await this.shopService.update(shop.id, {
      name: body.name,
      localPhoneNumber: body.localPhoneNumber,
      mobilePhoneNumber: body.mobilePhoneNumber,
      introduce: body.introduce,
    });
  }
}
