import { IntersectionType, PartialType, PickType } from '@nestjs/mapped-types';
import { UserShopBaseDto } from '../shop.base.dto';
import { PageBaseDto } from '../page.base.dto';

export class ShopFindManyQueryDto extends IntersectionType(
  PartialType(PickType(UserShopBaseDto, ['userUuid'] as const)),
  PartialType(PageBaseDto)
) {}
