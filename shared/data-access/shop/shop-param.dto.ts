import { PickType } from '@nestjs/mapped-types';
import { ShopBaseDto } from '../shop.base.dto';

export class ShopFindUniqueParamDto extends PickType(ShopBaseDto, ['uuid'] as const) {}
