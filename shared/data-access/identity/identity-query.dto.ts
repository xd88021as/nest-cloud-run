import { PartialType, PickType } from '@nestjs/mapped-types';
import { IdentityBaseDto } from '../identity.base.dto';

export class IdentityFindManyQueryDto extends PartialType(PickType(IdentityBaseDto, ['isPublic'] as const)) {}
