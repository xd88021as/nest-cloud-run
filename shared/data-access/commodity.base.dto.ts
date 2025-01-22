import { Exclude, Expose, plainToInstance } from 'class-transformer';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CommodityBaseDto {
  @Expose()
  @IsUUID()
  uuid: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsNumber()
  unitCent: number;

  @Expose()
  @IsString()
  shopName: string;

  @Exclude()
  static generate(data: CommodityBaseDto): CommodityBaseDto {
    return plainToInstance(CommodityBaseDto, data, {
      exposeDefaultValues: true,
      excludeExtraneousValues: true,
    });
  }
}
