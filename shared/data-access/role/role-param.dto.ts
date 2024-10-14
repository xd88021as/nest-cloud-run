import { PartialType, PickType } from '@nestjs/mapped-types';
import { RoleBaseDto } from '../role.base.dto';

export class RoleFindUniqueParamDto extends PartialType(PickType(RoleBaseDto, ['name'] as const)) {}
