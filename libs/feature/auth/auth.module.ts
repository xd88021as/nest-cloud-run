import { JwtConfig } from 'libs/common/config/interfaces/config.interface';
import { PrismaModule } from 'libs/common/prisma/prisma.module';
import { UserModule } from 'libs/core/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<JwtConfig>('jwt').secret,
        signOptions: {
          expiresIn: configService.get<JwtConfig>('jwt').expiresIn,
        },
      }),
    }),
    PrismaModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
