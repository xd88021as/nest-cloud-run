import { PartialType, PickType } from '@nestjs/mapped-types';
import { IdentityBaseDto } from '../identity.base.dto';

export class IdentityFindUniqueParamDto extends PartialType(PickType(IdentityBaseDto, ['name'] as const)) {}
