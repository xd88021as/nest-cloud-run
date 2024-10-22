import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { IdentityService } from '../services/identity.service';

@UseGuards(AuthGuard('jwt'))
@Controller('users/:userUuid/identitys')
export class UserIdentityController {
  constructor(private readonly identityService: IdentityService) {}
}
