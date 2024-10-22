import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { IdentityFindManyQueryDto } from 'shared/data-access/identity/identity-query.dto';
import {
  IdentityFindManyResponseDto,
} from 'shared/data-access/identity/identity-response.dto';
import { IdentityService } from '../services/identity.service';

@UseGuards(AuthGuard('jwt'))
@Controller('identitys')
export class IdentityController {
  constructor(private readonly identityService: IdentityService) {}

  @Get()
  async findMany(@Query() query: IdentityFindManyQueryDto): Promise<IdentityFindManyResponseDto> {
    const identitys = await this.identityService.findMany({ where: { isPublic: query.isPublic } });
    return IdentityFindManyResponseDto.generate(identitys.map((identity) => identity));
  }
}
