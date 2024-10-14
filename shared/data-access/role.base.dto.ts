import { Exclude, Expose, plainToInstance } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';

export class RoleBaseDto {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsBoolean()
  isPublic: boolean;

  @Exclude()
  static generate(data: RoleBaseDto): RoleBaseDto {
    return plainToInstance(RoleBaseDto, data, {
      exposeDefaultValues: true,
      excludeExtraneousValues: true
    });
  }
}
