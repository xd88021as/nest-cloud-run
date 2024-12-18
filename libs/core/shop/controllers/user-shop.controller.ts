import { SetIdentityOwners } from 'libs/common/authorization/decorators/identity-owners.decorator';
import { IdentityOwnersGuard } from 'libs/common/authorization/guards/identity-owners.guard';
import { UserService } from 'libs/core/user/services/user.service';
import {
  UserShopCreateBodyDto,
  UserShopUpdateBodyDto,
} from 'shared/data-access/shop/user-shop-body.dto';
import {
  UserShopParamDto,
  UserShopUpdateParamDto,
} from 'shared/data-access/shop/user-shop-param.dto';
import {
  Body,
  Controller,
  ForbiddenException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { ShopService } from '../services/shop.service';

@UseGuards(AuthGuard('jwt'))
@Controller('users/:userUuid/shops')
export class UserShopController {
  constructor(
    private readonly shopService: ShopService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @SetIdentityOwners({ identity: 'user', reqField: 'param', uuidName: 'userUuid' })
  @UseGuards(IdentityOwnersGuard)
  async create(
    @Body() body: UserShopCreateBodyDto,
    @Param() param: UserShopParamDto,
  ): Promise<void> {
    const shop = await this.shopService.findUnique({ where: { name: body.name } });
    if (shop) {
      throw new ForbiddenException('Duplicate name');
    }
    const user = await this.userService.findUnique({ where: { uuid: param.userUuid } });
    const status = await this.shopService.findStatus('pending');
    const newShop = await this.shopService.create({
      name: body.name,
      statusId: status.id,
      localPhoneNumber: body.localPhoneNumber,
      mobilePhoneNumber: body.mobilePhoneNumber,
      introduce: body.introduce,
    });
    await this.shopService.createUserShop({ shopId: newShop.id, userId: user.id });
  }

  @Patch(':shopUuid')
  @SetIdentityOwners({ identity: 'user', reqField: 'param', uuidName: 'userUuid' })
  @UseGuards(IdentityOwnersGuard)
  async update(
    @Body() body: UserShopUpdateBodyDto,
    @Param() param: UserShopUpdateParamDto,
  ): Promise<void> {
    const shop = await this.shopService.findUnique({ where: { uuid: param.shopUuid } });
    if (!shop.users.find((userShop) => userShop.user.uuid === param.userUuid)) {
      throw new ForbiddenException();
    }
    if (await this.shopService.checkShopNameDuplicate(shop.uuid, body.name)) {
      throw new ForbiddenException('Duplicate name');
    }
    const status = body.statusName ? await this.shopService.findStatus(body.statusName) : undefined;
    await this.shopService.update(shop.id, {
      name: body.name,
      statusId: status?.id,
      localPhoneNumber: body.localPhoneNumber,
      mobilePhoneNumber: body.mobilePhoneNumber,
      introduce: body.introduce,
    });
  }
}
