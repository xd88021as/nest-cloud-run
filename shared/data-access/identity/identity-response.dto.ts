import { Exclude, plainToInstance } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { PickType } from '@nestjs/mapped-types';
import { CommonResponseDto } from '../common.base.dto';
import { IdentityBaseDto } from '../identity.base.dto';

export class IdentityFindUniqueResponseDto extends PickType(CommonResponseDto, ['data']) {
  @ValidateNested()
  data: IdentityBaseDto;

  @Exclude()
  static generate(data: IdentityBaseDto): IdentityFindUniqueResponseDto {
    return plainToInstance(IdentityFindUniqueResponseDto, { data: IdentityBaseDto.generate(data) });
  }
}

export class IdentityFindManyResponseDto extends PickType(CommonResponseDto, ['data']) {
  @ValidateNested()
  data: IdentityBaseDto[];

  @Exclude()
  static generate(dataArray: IdentityBaseDto[]): IdentityFindManyResponseDto {
    return plainToInstance(IdentityFindManyResponseDto, {
      data: dataArray.map((data) => IdentityBaseDto.generate(data)),
    });
  }
}