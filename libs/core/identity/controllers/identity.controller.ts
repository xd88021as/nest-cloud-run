import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { IdentityListResponseDto } from 'shared/data-access/identity/identity-response.dto';
import { IdentityService } from '../services/identity.service';

@UseGuards(AuthGuard('jwt'))
@Controller('identitys')
export class IdentityController {
  constructor(private readonly identityService: IdentityService) {}

  @Get()
  async list(): Promise<IdentityListResponseDto> {
    const identitys = await this.identityService.findMany();
    return IdentityListResponseDto.generate(identitys.map((identity) => identity.name));
  }
}
