import { PrismaModule } from 'libs/common/prisma/prisma.module';
import { ObjectModule } from 'libs/util/object/object.module';
import { Module } from '@nestjs/common';
import { RoleController } from './controllers/role.controller';
import { RoleRepository } from './repositories/role.repository';
import { RoleService } from './services/role.service';

@Module({
  imports: [ObjectModule, PrismaModule],
  controllers: [RoleController],
  providers: [RoleRepository, RoleService],
  exports: [RoleService],
})
export class RoleModule {}
