import { PrismaModule } from 'libs/common/prisma/prisma.module';
import { ObjectModule } from 'libs/util/object/object.module';
import { Module } from '@nestjs/common';
import { IdentityController } from './controllers/identity.controller';
import { IdentityRepository } from './repositories/identity.repository';
import { IdentityService } from './services/identity.service';

@Module({
  imports: [ObjectModule, PrismaModule],
  controllers: [IdentityController],
  providers: [IdentityRepository, IdentityService],
  exports: [IdentityService],
})
export class IdentityModule {}
