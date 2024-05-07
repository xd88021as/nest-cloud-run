import { Exclude, plainToInstance } from 'class-transformer';
import { IsJWT } from 'class-validator';
import { PickType } from '@nestjs/mapped-types';
import { CommonResponseDto } from '../common.base.dto';

export class AuthSignInResponseDto extends PickType(CommonResponseDto, ['data']) {
  @IsJWT()
  data: string;

  @Exclude()
  static generate(data: string): AuthSignInResponseDto {
    return plainToInstance(AuthSignInResponseDto, { data });
  }
}
