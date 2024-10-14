import { Exclude, plainToInstance } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { PickType } from '@nestjs/mapped-types';
import { CommonResponseDto } from '../common.base.dto';
import { RoleBaseDto } from '../role.base.dto';

export class RoleFindUniqueResponseDto extends PickType(CommonResponseDto, ['data']) {
  @ValidateNested()
  data: RoleBaseDto;

  @Exclude()
  static generate(data: RoleBaseDto): RoleFindUniqueResponseDto {
    return plainToInstance(RoleFindUniqueResponseDto, { data: RoleBaseDto.generate(data) });
  }
}

export class RoleFindManyResponseDto extends PickType(CommonResponseDto, ['data']) {
  @ValidateNested()
  data: RoleBaseDto[];

  @Exclude()
  static generate(dataArray: RoleBaseDto[]): RoleFindManyResponseDto {
    return plainToInstance(RoleFindManyResponseDto, {
      data: dataArray.map((data) => RoleBaseDto.generate(data)),
    });
  }
}