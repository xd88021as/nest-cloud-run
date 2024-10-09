import { Expose } from 'class-transformer';
import { IsDateString, IsOptional } from 'class-validator';
import { IntersectionType, PartialType, PickType } from '@nestjs/mapped-types';
import { UserBaseDto } from '../user.base.dto';
import { PageBaseDto } from '../page.base.dto';

export class UserFindManyQueryDto extends IntersectionType(
  PartialType(PickType(UserBaseDto, ['genderName'] as const)),
  PartialType(PageBaseDto)
) {
  @Expose()
  @IsDateString()
  @IsOptional()
  createdFrom: Date;

  @Expose()
  @IsDateString()
  @IsOptional()
  createdTo: Date;
}
