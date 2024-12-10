import { Exclude, plainToInstance } from 'class-transformer';
import { IsString } from 'class-validator';
import { PickType } from '@nestjs/mapped-types';
import { CommonResponseDto } from '../common.base.dto';

export class IdentityListResponseDto extends PickType(CommonResponseDto, ['data']) {
  @IsString({ each: true })
  data: string[];

  @Exclude()
  static generate(dataArray: string[]): IdentityListResponseDto {
    return plainToInstance(IdentityListResponseDto, { data: dataArray });
  }
}
