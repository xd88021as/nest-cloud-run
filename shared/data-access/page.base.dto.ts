import { Expose, Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

const reformatPage = ({ value }: { value: number }): number => {
  if (!value) {
    return 1;
  }
  return +value;
};

const reformatLimit = ({ value }: { value: number }): number => {
  if (!value) {
    return 10;
  }
  return +value;
};

export class PageBaseDto {
  @Expose()
  @Transform(reformatPage)
  @IsInt()
  page?: number;

  @Expose()
  @Transform(reformatLimit)
  @IsInt()
  limit?: number;
}
