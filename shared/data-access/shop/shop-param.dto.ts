import { PartialType, PickType } from '@nestjs/mapped-types';
import { ShopBaseDto } from '../shop.base.dto';

export class ShopFindUniqueParamDto extends PartialType(PickType(ShopBaseDto, ['uuid'] as const)) {}
