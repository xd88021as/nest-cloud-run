import { UserService } from 'libs/core/user/services/user.service';
import {
    AuthSignInByPhoneBodyDto, AuthSignUpByPhoneBodyDto
} from 'shared/data-access/auth/auth-body.dto';
import { AuthSignInResponseDto } from 'shared/data-access/auth/auth-response.dto';
import { Body, Controller, ForbiddenException, NotFoundException, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signIn/phone')
  async signInByPhone(
    @Body() body: AuthSignInByPhoneBodyDto,
  ): Promise<AuthSignInResponseDto> {
    const user = await this.userService.findUnique({
      where: { phone: body.phone },
    });
    if (!user) {
      throw new NotFoundException('signIn');
    }
    const jwt = this.authService.generateJwt({ userUuid: user.uuid });
    return AuthSignInResponseDto.generate(jwt);
  }

  @Post('signUp/phone')
  async signUpByPhone(@Body() body: AuthSignUpByPhoneBodyDto): Promise<void> {
    const { phone, password } = body;
    const user = await this.userService.findUnique({ where: { phone } });
    if (user) {
      throw new ForbiddenException();
    }
    await this.userService.create({ phone, password });
  }
}
