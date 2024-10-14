import { Injectable } from '@nestjs/common';
import { RoleData, RoleFindManyParams, RoleFindUniqueParams } from '../interfaces/role.interface';
import { RoleRepository } from '../repositories/role.repository';
import { ObjectService } from 'libs/util/object/services/object.service';

@Injectable()
export class RoleService {
  constructor(
    private readonly objectService: ObjectService,
    private readonly roleRepository: RoleRepository
  ) {}

  async create(data: RoleData) {
    const role = await this.roleRepository.create(data);
    return role;
  }

  async findMany(params: RoleFindManyParams) {
    const roles = await this.roleRepository.findMany(params);
    return roles;
  }

  async findUnique(params: RoleFindUniqueParams) {
    if (this.objectService.isAllNullOrUndefined(params)) {
      return null;
    }
    const role = await this.roleRepository.findUnique(params);
    return role;
  }

  async update(id: number, data: Partial<RoleData>) {
    const role = await this.roleRepository.update(id, data);
    return role;
  }
}
