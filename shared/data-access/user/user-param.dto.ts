import { PartialType, PickType } from '@nestjs/mapped-types';
import { UserBaseDto } from '../user.base.dto';

export class UserFindUniqueParamDto extends PartialType(PickType(UserBaseDto, ['uuid'] as const)) {}
