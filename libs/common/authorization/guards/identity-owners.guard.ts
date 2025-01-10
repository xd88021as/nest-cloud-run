import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IdentityOwner } from '../interfaces/identity-owners.interface';

@Injectable()
export class IdentityOwnersGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const identityOwners = this.reflector.get<IdentityOwner[]>(
      'identityOwners',
      context.getHandler(),
    );
    if (!identityOwners) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    if (request.user.staffUuid) {
      return true;
    }
    return identityOwners.some(({ identity, reqField, uuidName }) => {
      const source = reqField === 'body' ? request.body : request.params;
      if (identity === 'shop') {
        return request.user['shopUuids']?.includes(source[uuidName]);
      }
      return request.user[`${identity}Uuid`] === source[uuidName];
    });
  }
}
