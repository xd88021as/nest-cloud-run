import { Exclude, Expose, plainToInstance } from 'class-transformer';
import { IsString } from 'class-validator';

export class IdentityBaseDto {
  @Expose()
  @IsString()
  name: string;

  @Exclude()
  static generate(data: IdentityBaseDto): IdentityBaseDto {
    return plainToInstance(IdentityBaseDto, data, {
      exposeDefaultValues: true,
      excludeExtraneousValues: true
    });
  }
}
