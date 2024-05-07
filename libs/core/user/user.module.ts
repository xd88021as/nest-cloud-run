import { CryptoModule } from 'libs/common/crypto/crypto.module';
import { PrismaModule } from 'libs/common/prisma/prisma.module';
import { ObjectModule } from 'libs/util/object/object.module';
import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';

@Module({
  imports: [CryptoModule, ObjectModule, PrismaModule],
  controllers: [UserController],
  providers: [UserRepository, UserService],
  exports: [UserService],
})
export class UserModule {}
