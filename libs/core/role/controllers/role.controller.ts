import { Controller, Get, NotFoundException, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { RoleFindUniqueParamDto } from 'shared/data-access/role/role-param.dto';
import { RoleFindManyQueryDto } from 'shared/data-access/role/role-query.dto';
import {
    RoleFindManyResponseDto, RoleFindUniqueResponseDto
} from 'shared/data-access/role/role-response.dto';
import { RoleService } from '../services/role.service';

@UseGuards(AuthGuard('jwt'))
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async findMany(@Query() query: RoleFindManyQueryDto): Promise<RoleFindManyResponseDto> {
    const roles = await this.roleService.findMany({
      where: { isPublic: query.isPublic },
    });
    return RoleFindManyResponseDto.generate(
      roles.map((role) => (role))
    );
  }

  async findUnique(@Param() param: RoleFindUniqueParamDto): Promise<RoleFindUniqueResponseDto> {
    const role = await this.roleService.findUnique({ where: { name: param.name } });
    if (!role) {
      throw new NotFoundException();
    }
    return RoleFindUniqueResponseDto.generate(role);
  }
}
