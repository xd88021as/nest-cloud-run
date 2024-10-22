import { UserService } from 'libs/core/user/services/user.service';
import {
  AuthSignInByPhoneBodyDto,
  AuthSignUpByPhoneBodyDto,
} from 'shared/data-access/auth/auth-body.dto';
import { AuthSignInResponseDto } from 'shared/data-access/auth/auth-response.dto';
import { Body, Controller, ForbiddenException, NotFoundException, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { IdentityService } from 'libs/core/identity/services/identity.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly identityService: IdentityService,
    private readonly userService: UserService,
  ) {}

  @Post('signIn/phone')
  async signInByPhone(@Body() body: AuthSignInByPhoneBodyDto): Promise<AuthSignInResponseDto> {
    const user = await this.userService.findUnique({
      where: { phone: body.phone },
    });
    if (!user) {
      throw new NotFoundException('signIn');
    }
    const useridentities = await this.identityService.findManyUserIdentity({
      where: { userId: user.id },
    });
    const identityUuids = useridentities.reduce((acc, userIdentity) => {
      const key = `${userIdentity.identity.name}Uuid`;
      acc[key] = userIdentity.uuid;
      return acc;
    }, {});
    const jwt = this.authService.generateJwt({ userUuid: user.uuid, ...identityUuids });
    return AuthSignInResponseDto.generate(jwt);
  }

  @Post('signUp/phone')
  async signUpByPhone(@Body() body: AuthSignUpByPhoneBodyDto): Promise<void> {
    const { phone, password } = body;
    const user = await this.userService.findUnique({ where: { phone } });
    if (user) {
      throw new ForbiddenException();
    }
    const newUser = await this.userService.create({ phone, password });
    const identity = await this.identityService.findUnique({ where: { name: 'customer' } });
    await this.identityService.createUserIdentity({ identityId: identity.id, userId: newUser.id });
  }
}
