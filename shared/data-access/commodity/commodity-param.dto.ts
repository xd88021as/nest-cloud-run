import { PartialType, PickType } from '@nestjs/mapped-types';
import { CommodityBaseDto } from '../commodity.base.dto';

export class CommodityFindUniqueParamDto extends PartialType(PickType(CommodityBaseDto, ['uuid'] as const)) {}
