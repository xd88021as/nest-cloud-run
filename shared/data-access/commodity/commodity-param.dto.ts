import { PickType } from '@nestjs/mapped-types';
import { CommodityBaseDto } from '../commodity.base.dto';

export class CommodityFindUniqueParamDto extends PickType(CommodityBaseDto, ['uuid'] as const) {}
