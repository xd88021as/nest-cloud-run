import { PartialType, PickType } from '@nestjs/mapped-types';
import { RoleBaseDto } from '../role.base.dto';

export class RoleFindManyQueryDto extends PartialType(PickType(RoleBaseDto, ['isPublic'] as const)) {}
