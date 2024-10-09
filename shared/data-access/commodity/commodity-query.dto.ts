import { IntersectionType, PartialType, PickType } from '@nestjs/mapped-types';
import { Expose } from 'class-transformer';
import { IsOptional, IsUUID } from 'class-validator';
import { CommodityBaseDto } from '../commodity.base.dto';
import { PageBaseDto } from '../page.base.dto';

export class CommodityFindManyQueryDto extends IntersectionType(
  PartialType(PickType(CommodityBaseDto, ['name'] as const)),
  PartialType(PageBaseDto)
) {
  @Expose()
  @IsUUID()
  @IsOptional()
  shopUuid: string;
}
