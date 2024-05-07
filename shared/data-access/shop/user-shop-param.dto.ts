import { PartialType, PickType } from '@nestjs/mapped-types';
import { UserShopBaseDto } from '../shop.base.dto';

export class UserShopParamDto extends PartialType(
  PickType(UserShopBaseDto, ['userUuid'] as const)
) {}

export class UserShopUpdateParamDto extends PartialType(
  PickType(UserShopBaseDto, ['userUuid', 'shopUuid'] as const)
) {}
