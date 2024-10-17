import { Exclude, Expose, plainToInstance } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';

export class IdentityBaseDto {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsBoolean()
  isPublic: boolean;

  @Exclude()
  static generate(data: IdentityBaseDto): IdentityBaseDto {
    return plainToInstance(IdentityBaseDto, data, {
      exposeDefaultValues: true,
      excludeExtraneousValues: true
    });
  }
}
