import { Exclude, Expose, Transform, plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsPhoneNumber, IsString, IsUUID } from 'class-validator';
import {
  convertLocalPhoneNumberToInternationalNumber,
  removeLeadingZeroFromPhoneNumber,
} from '../util/transform.util';

export class ShopBaseDto {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'Name cannot be an empty string' })
  name: string;

  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'Status name cannot be an empty string' })
  statusName: string;

  @Expose()
  @IsPhoneNumber()
  @Transform(convertLocalPhoneNumberToInternationalNumber)
  localPhoneNumber: string;

  @Expose()
  @IsPhoneNumber()
  @Transform(removeLeadingZeroFromPhoneNumber)
  @IsNotEmpty({ message: 'Mobile phone number cannot be an empty string' })
  mobilePhoneNumber: string;

  @Expose()
  @IsString()
  introduce: string;

  @Exclude()
  static generate(data: ShopBaseDto): ShopBaseDto {
    return plainToInstance(ShopBaseDto, data, {
      exposeDefaultValues: true,
      excludeExtraneousValues: true,
    });
  }
}

export class UserShopBaseDto {
  @Expose()
  @IsUUID()
  userUuid: string;

  @Expose()
  @IsUUID()
  shopUuid: string;
}