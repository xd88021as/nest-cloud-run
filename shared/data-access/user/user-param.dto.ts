import { PickType } from '@nestjs/mapped-types';
import { UserBaseDto } from '../user.base.dto';

export class UserFindUniqueParamDto extends PickType(UserBaseDto, ['uuid'] as const) {}
