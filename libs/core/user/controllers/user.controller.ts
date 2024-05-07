import { Controller, Get, NotFoundException, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { IdentityOwnersGuard } from 'libs/common/authorization/guards/identity-owners.guard';
import { SetIdentityOwners } from 'libs/common/authorization/decorators/identity-owners.decorator';
import { UserFindUniqueParamDto } from 'shared/data-access/user/user-param.dto';
import { UserFindManyQueryDto } from 'shared/data-access/user/user-query.dto';
import {
    UserFindManyResponseDto, UserFindUniqueResponseDto
} from 'shared/data-access/user/user-response.dto';
import { UserService } from '../services/user.service';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findMany(@Query() query: UserFindManyQueryDto): Promise<UserFindManyResponseDto> {
    const createdFrom = await this.userService.toISO(query.createdFrom);
    const createdTo = await this.userService.toISO(query.createdTo);
    const skip = (query.page - 1) * query.limit;
    const users = await this.userService.findMany({
      where: { genderName: query.genderName, createdFrom, createdTo, skip, take: query.limit },
    });
    return UserFindManyResponseDto.generate(
      users.map((user) => ({
        ...user,
        genderName: user.gender?.name,
      }))
    );
  }

  @Get(':uuid')
  @SetIdentityOwners({ identity: 'user', reqField: 'param', uuidName: 'uuid' })
  @UseGuards(IdentityOwnersGuard)
  async findUnique(@Param() param: UserFindUniqueParamDto): Promise<UserFindUniqueResponseDto> {
    const user = await this.userService.findUnique({ where: { uuid: param.uuid } });
    if (!user) {
      throw new NotFoundException();
    }
    return UserFindUniqueResponseDto.generate({ ...user, genderName: user.gender?.name });
  }
}
