import { Injectable } from '@nestjs/common';
import {
  IdentityData,
  IdentityFindManyParams,
  IdentityFindUniqueParams,
  UserIdentityData,
  UserIdentityFindManyParams,
  UserIdentityFindUniqueParams,
} from '../interfaces/identity.interface';
import { IdentityRepository } from '../repositories/identity.repository';
import { ObjectService } from 'libs/util/object/services/object.service';
import { UserIdentityRepository } from '../repositories/user-identity.repository';

@Injectable()
export class IdentityService {
  constructor(
    private readonly objectService: ObjectService,
    private readonly identityRepository: IdentityRepository,
    private readonly userIdentityRepository: UserIdentityRepository,
  ) {}

  async create(data: IdentityData) {
    const identity = await this.identityRepository.create(data);
    return identity;
  }

  async findMany(params: IdentityFindManyParams) {
    const identitys = await this.identityRepository.findMany(params);
    return identitys;
  }

  async findUnique(params: IdentityFindUniqueParams) {
    if (this.objectService.isAllNullOrUndefined(params)) {
      return null;
    }
    const identity = await this.identityRepository.findUnique(params);
    return identity;
  }

  async update(id: number, data: Partial<IdentityData>) {
    const identity = await this.identityRepository.update(id, data);
    return identity;
  }

  // user-identity

  async createUserIdentity(data: UserIdentityData) {
    const userIdentity = await this.userIdentityRepository.create(data);
    return userIdentity;
  }

  async findManyUserIdentity(data: UserIdentityFindManyParams) {
    const userIdentity = await this.userIdentityRepository.findMany(data);
    return userIdentity;
  }

  async findUniqueUserIdentity(data: UserIdentityFindUniqueParams) {
    const userIdentity = await this.userIdentityRepository.findUnique(data);
    return userIdentity;
  }
}
